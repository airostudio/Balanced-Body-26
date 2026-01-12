/**
 * Script to generate hero image of older couple doing Tai Chi Walking
 *
 * Setup:
 * 1. Install dependencies: npm install openai
 * 2. Set your OpenAI API key: export OPENAI_API_KEY="your-key-here"
 * 3. Run: npx tsx scripts/generate-hero-image.ts
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const heroImagePrompt = {
  id: 'hero-couple-beach-walking',
  filename: 'hero-couple-beach-walking.jpg',
  prompt: `A stunning professional photograph of a FIT and ATTRACTIVE couple over 55 years old (late 50s to early 60s) walking together along a beautiful beach at golden hour. The couple has EXCELLENT PHYSIQUES and GREAT BODIES - toned, lean, and fit, showing the results of an active healthy lifestyle. They are walking barefoot along the shoreline where the waves meet the sand, relaxed and joyful. The gentleman has distinguished silver-gray hair, athletic build with visible muscle tone, and confident posture. The lady has styled silver or light blonde hair, a graceful toned figure, and radiant beauty. Both are wearing casual beach attire in earth tones (beige, soft white, warm sand colors) that shows their fit physiques - perhaps linen or comfortable beach clothing. They are smiling at each other or laughing together, holding hands or walking close side-by-side, showing genuine connection, romance, and joy. The ocean waves gently lap at their feet. The background shows a pristine beach with soft-focus ocean, gentle waves, and stunning golden hour sunset lighting casting warm glowing light across the scene. Professional lifestyle photography, shallow depth of field, warm romantic atmosphere, natural colors, realistic photo showing vibrant healthy active aging over 55 with great fitness and attractiveness. Emphasize their FIT, HEALTHY, GOOD-LOOKING physiques as examples of successful healthy living and fitness. Beautiful, inspiring, aspirational yet achievable feeling.`,
};

async function generateHeroImage(): Promise<void> {
  try {
    console.log('Generating hero image: Fit attractive couple over 55 walking along beach...\n');

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: heroImagePrompt.prompt,
      n: 1,
      size: '1792x1024', // Wide landscape format for hero section
      quality: 'hd', // Higher quality for hero image
      style: 'natural',
    });

    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI');
    }

    console.log('✓ Image generated successfully!');
    console.log('Downloading...\n');

    // Download the image
    const publicDir = path.join(process.cwd(), 'public', 'hero');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, heroImagePrompt.filename);

    await downloadImage(imageUrl, filePath);
    console.log(`✓ Saved to: public/hero/${heroImagePrompt.filename}\n`);
    console.log('Update src/pages/Home.tsx with:');
    console.log(`src="/hero/${heroImagePrompt.filename}"`);
    console.log('\nEstimated cost: ~$0.08 (HD quality 1792x1024)');

  } catch (error) {
    console.error('✗ Error generating hero image:', error);
  }
}

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Run the script
if (require.main === module) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set');
    console.error('Please set it with: export OPENAI_API_KEY="your-key-here"');
    process.exit(1);
  }

  generateHeroImage().catch(console.error);
}
