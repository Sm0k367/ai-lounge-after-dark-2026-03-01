import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { AudioData } from '@/types';

interface UseAudioOptions {
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export const useAudio = (url: string | null, options: UseAudioOptions = {}) => {
  const howlRef = useRef<Howl | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState<AudioData>({
    frequency: new Uint8Array(0),
    waveform: new Uint8Array(0),
    currentTime: 0,
    duration: 0,
    isPlaying: false,
  });

  // Initialize Howl instance
  useEffect(() => {
    if (!url) return;

    try {
      howlRef.current = new Howl({
        src: [url],
        html5: true,
        autoplay: false,
        loop: false,
        volume: 0.7,
        onplay: () => {
          setIsPlaying(true);
          options.onPlay?.();
        },
        onpause: () => {
          setIsPlaying(false);
          options.onPause?.();
        },
        onstop: () => {
          setIsPlaying(false);
          setCurrentTime(0);
        },
        onend: () => {
          setIsPlaying(false);
          options.onEnd?.();
        },
        onload: () => {
          setDuration(howlRef.current?.duration() || 0);
        },
        onerror: (id, error) => {
          options.onError?.(new Error(`Audio error: ${error}`));
        },
      });

      return () => {
        howlRef.current?.unload();
      };
    } catch (error) {
      options.onError?.(error as Error);
    }
  }, [url, options]);

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (howlRef.current && isPlaying) {
        setCurrentTime(howlRef.current.seek() as number);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Setup audio analyser for visualization
  useEffect(() => {
    if (!howlRef.current || !isPlaying) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      // Connect Howler to analyser
      const source = audioContext.createMediaElementAudioSourceElement(
        howlRef.current._sounds[0]._node as HTMLMediaElement
      );
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      const waveformData = new Uint8Array(analyser.frequencyBinCount);

      const updateAudioData = () => {
        analyser.getByteFrequencyData(frequencyData);
        analyser.getByteTimeDomainData(waveformData);

        setAudioData({
          frequency: frequencyData,
          waveform: waveformData,
          currentTime: howlRef.current?.seek() as number,
          duration: howlRef.current?.duration() as number,
          isPlaying,
        });

        if (isPlaying) {
          requestAnimationFrame(updateAudioData);
        }
      };

      updateAudioData();
    } catch (error) {
      console.error('Audio analyser setup error:', error);
    }
  }, [isPlaying]);

  const play = () => {
    howlRef.current?.play();
  };

  const pause = () => {
    howlRef.current?.pause();
  };

  const stop = () => {
    howlRef.current?.stop();
  };

  const seek = (time: number) => {
    howlRef.current?.seek(time);
    setCurrentTime(time);
  };

  const setVolume = (volume: number) => {
    howlRef.current?.volume(Math.max(0, Math.min(1, volume)));
  };

  return {
    isPlaying,
    currentTime,
    duration,
    audioData,
    play,
    pause,
    stop,
    seek,
    setVolume,
    howl: howlRef.current,
  };
};
