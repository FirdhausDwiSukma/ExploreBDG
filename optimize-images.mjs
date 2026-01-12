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

// Ensure wisata optimized directory exists
const wisataOutputDir = join(outputDir, 'wisata');
if (!fs.existsSync(wisataOutputDir)) {
  fs.mkdirSync(wisataOutputDir, { recursive: true });
}

const inputDirWisata = join(__dirname, 'src', 'assets', 'images', 'wisata');

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  // Hero images
  const heroImages = ['bdg1.jpg', 'bdg2.jpg', 'bdg3.jpg'];
  
  // Wisata images (get from directory)
  let wisataImages = [];
  try {
     wisataImages = fs.readdirSync(inputDirWisata).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  } catch (e) {
     console.log("No wisata images found or directory missing");
  }

  const allImages = [
      ...heroImages.map(Name => ({ Name, type: 'hero', inputDir, outputDir })),
      ...wisataImages.map(Name => ({ Name, type: 'wisata', inputDir: inputDirWisata, outputDir: wisataOutputDir }))
  ];

  for (const { Name, type, inputDir, outputDir } of allImages) {
    const inputPath = join(inputDir, Name);
    // Change extension to .jpg for consistency if source is png
    const outputName = Name.replace(/\.png$/i, '.jpg');
    const outputPath = join(outputDir, outputName);

    try {
      const inputStats = fs.statSync(inputPath);
      const inputSizeKB = (inputStats.size / 1024).toFixed(2);

      await sharp(inputPath)
        .resize(800, 600, { // Smaller size for cards
          fit: 'cover', 
          position: 'center' 
        })
        .jpeg({ 
          quality: 80, 
          mozjpeg: true
        })
        .toFile(outputPath);

      // Generate WebP version
      const outputNameWebp = Name.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPathWebp = join(outputDir, outputNameWebp);

      await sharp(inputPath)
        .resize(800, 600, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: 80
        })
        .toFile(outputPathWebp);

      const outputStats = fs.statSync(outputPath);
      const outputSizeKB = (outputStats.size / 1024).toFixed(2);
      const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`✅ [${type}] ${Name} -> ${outputName}`);
      console.log(`   Before: ${inputSizeKB} KB`);
      console.log(`   After:  ${outputSizeKB} KB`);
      console.log(`   Saved:  ${reduction}%\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${Name}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
  console.log('\n📝 Next step: Update hero.jsx to use optimized images from:');
  console.log('   import img1 from \'../assets/images/optimized/bdg1.jpg\'');
}

optimizeImages();
