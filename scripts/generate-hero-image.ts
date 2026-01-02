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
  id: 'hero-couple-tai-chi',
  filename: 'hero-couple-tai-chi.jpg',
  prompt: `A heartwarming professional photograph of a happy older couple in their late 60s practicing Tai Chi Walking together in a beautiful sunlit park. They are walking side-by-side in synchronized slow, graceful tai chi movements, both wearing comfortable earth-toned athletic clothing (soft beige and warm orange hues). The man has silver-gray hair and the woman has white hair in a short elegant style. They are smiling at each other, showing genuine connection and joy. The background shows a peaceful park with soft-focus trees and morning golden hour sunlight filtering through leaves. Professional lifestyle photography, shallow depth of field, warm and inviting atmosphere, natural colors, realistic photo showing healthy active aging, inspiring and achievable feeling.`,
};

async function generateHeroImage(): Promise<void> {
  try {
    console.log('Generating hero image: Older couple doing Tai Chi Walking...\n');

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
