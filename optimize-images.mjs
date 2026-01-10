import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, 'src', 'assets', 'images');
const outputDir = join(__dirname, 'src', 'assets', 'images', 'optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = ['bdg1.jpg', 'bdg2.jpg', 'bdg3.jpg'];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  for (const image of images) {
    const inputPath = join(inputDir, image);
    const outputPath = join(outputDir, image);

    try {
      const inputStats = fs.statSync(inputPath);
      const inputSizeKB = (inputStats.size / 1024).toFixed(2);

      await sharp(inputPath)
        .resize(1920, 1080, { 
          fit: 'cover', 
          position: 'center' 
        })
        .jpeg({ 
          quality: 80, 
          progressive: true 
        })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSizeKB = (outputStats.size / 1024).toFixed(2);
      const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`✅ ${image}`);
      console.log(`   Before: ${inputSizeKB} KB`);
      console.log(`   After:  ${outputSizeKB} KB`);
      console.log(`   Saved:  ${reduction}%\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${image}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
  console.log('\n📝 Next step: Update hero.jsx to use optimized images from:');
  console.log('   import img1 from \'../assets/images/optimized/bdg1.jpg\'');
}

optimizeImages();
