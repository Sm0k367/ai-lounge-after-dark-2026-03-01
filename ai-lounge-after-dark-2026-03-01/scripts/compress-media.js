#!/usr/bin/env node

/**
 * Media Compression Script
 * Optimizes videos, audio, and images for web delivery
 * 
 * Usage: npm run compress:media
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MEDIA_DIR = path.join(__dirname, '../public/media');
const AUDIO_DIR = path.join(__dirname, '../public/audio');
const OUTPUT_DIR = path.join(__dirname, '../public/compressed');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🎬 Starting media compression...\n');

// Video compression settings
const VIDEO_PRESETS = {
  low: {
    bitrate: '500k',
    resolution: '640x360',
    preset: 'ultrafast',
  },
  medium: {
    bitrate: '2500k',
    resolution: '1280x720',
    preset: 'fast',
  },
  high: {
    bitrate: '5000k',
    resolution: '1920x1080',
    preset: 'medium',
  },
};

// Compress video files
function compressVideos() {
  console.log('📹 Compressing videos...');
  
  const videoDir = path.join(MEDIA_DIR, 'clips');
  if (!fs.existsSync(videoDir)) {
    console.log('  ⚠️  No video directory found');
    return;
  }

  const files = fs.readdirSync(videoDir).filter(f => 
    /\.(mp4|webm|mov)$/i.test(f)
  );

  files.forEach(file => {
    const inputPath = path.join(videoDir, file);
    const outputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.mp4`);

    try {
      console.log(`  ⏳ Compressing: ${file}`);
      
      // Use ffmpeg for compression
      execSync(
        `ffmpeg -i "${inputPath}" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k "${outputPath}" -y`,
        { stdio: 'pipe' }
      );

      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(`  ✅ ${file} → ${reduction}% reduction`);
    } catch (error) {
      console.error(`  ❌ Error compressing ${file}:`, error.message);
    }
  });
}

// Compress audio files
function compressAudio() {
  console.log('\n🎵 Compressing audio...');
  
  if (!fs.existsSync(AUDIO_DIR)) {
    console.log('  ⚠️  No audio directory found');
    return;
  }

  const files = fs.readdirSync(AUDIO_DIR).filter(f => 
    /\.(mp3|wav|flac|ogg)$/i.test(f)
  );

  files.forEach(file => {
    const inputPath = path.join(AUDIO_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.mp3`);

    try {
      console.log(`  ⏳ Compressing: ${file}`);
      
      // Use ffmpeg for audio compression
      execSync(
        `ffmpeg -i "${inputPath}" -b:a 128k -q:a 4 "${outputPath}" -y`,
        { stdio: 'pipe' }
      );

      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(`  ✅ ${file} → ${reduction}% reduction`);
    } catch (error) {
      console.error(`  ❌ Error compressing ${file}:`, error.message);
    }
  });
}

// Optimize images
function optimizeImages() {
  console.log('\n🖼️  Optimizing images...');
  
  const imageDir = path.join(MEDIA_DIR, 'posters');
  if (!fs.existsSync(imageDir)) {
    console.log('  ⚠️  No image directory found');
    return;
  }

  const files = fs.readdirSync(imageDir).filter(f => 
    /\.(jpg|jpeg|png|gif)$/i.test(f)
  );

  files.forEach(file => {
    const inputPath = path.join(imageDir, file);
    const outputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.webp`);

    try {
      console.log(`  ⏳ Optimizing: ${file}`);
      
      // Use imagemagick or similar
      execSync(
        `convert "${inputPath}" -quality 80 -strip "${outputPath}"`,
        { stdio: 'pipe' }
      );

      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(`  ✅ ${file} → ${reduction}% reduction`);
    } catch (error) {
      console.error(`  ❌ Error optimizing ${file}:`, error.message);
    }
  });
}

// Generate report
function generateReport() {
  console.log('\n📊 Compression Report\n');
  
  const getSize = (dir) => {
    if (!fs.existsSync(dir)) return 0;
    return fs.readdirSync(dir).reduce((total, file) => {
      const filePath = path.join(dir, file);
      return total + fs.statSync(filePath).size;
    }, 0);
  };

  const formatSize = (bytes) => {
    const mb = (bytes / 1024 / 1024).toFixed(2);
    return `${mb} MB`;
  };

  const originalSize = getSize(MEDIA_DIR) + getSize(AUDIO_DIR);
  const compressedSize = getSize(OUTPUT_DIR);
  const totalReduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

  console.log(`Original size:   ${formatSize(originalSize)}`);
  console.log(`Compressed size: ${formatSize(compressedSize)}`);
  console.log(`Total reduction: ${totalReduction}%\n`);

  console.log('✅ Compression complete!');
  console.log('📁 Compressed files saved to: public/compressed/\n');
}

// Main execution
try {
  compressVideos();
  compressAudio();
  optimizeImages();
  generateReport();
} catch (error) {
  console.error('❌ Compression failed:', error.message);
  process.exit(1);
}
