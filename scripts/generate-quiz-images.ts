/**
 * Script to generate quiz/questionnaire images using OpenAI's DALL-E API
 *
 * Setup:
 * 1. Install dependencies: npm install openai
 * 2. Set your OpenAI API key: export OPENAI_API_KEY="your-key-here"
 * 3. Run: npx tsx scripts/generate-quiz-images.ts
 *
 * This will generate realistic images for quiz info screens and backgrounds
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Quiz image prompts
const quizImagePrompts = [
  {
    id: 'quiz-hero',
    filename: 'quiz-hero.jpg',
    prompt: 'A welcoming, peaceful scene of a diverse group of happy seniors (ages 60-75) in comfortable earth-toned athletic wear, standing together in a bright, modern wellness studio with large windows showing nature outside. Warm natural lighting, professional lifestyle photography, inclusive and empowering atmosphere, realistic photo.',
  },
  {
    id: 'balance-intro',
    filename: 'balance-intro.jpg',
    prompt: 'A confident senior woman in her 60s demonstrating perfect balance while standing on one leg in a serene garden setting, wearing comfortable earth-toned tai chi clothing. Morning sunlight filtering through trees, peaceful expression, professional wellness photography, inspiring and safe feeling, realistic photo.',
  },
  {
    id: 'weight-loss-intro',
    filename: 'weight-loss-intro.jpg',
    prompt: 'A healthy, active senior couple in their late 60s walking together on a scenic nature trail, both wearing comfortable athletic clothing in warm earth tones. They look happy and energetic, surrounded by beautiful natural scenery, golden hour lighting, professional lifestyle photography, motivating and achievable, realistic photo.',
  },
  {
    id: 'stress-relief-intro',
    filename: 'stress-relief-intro.jpg',
    prompt: 'A peaceful senior in their 70s meditating outdoors in a beautiful zen garden, eyes gently closed, sitting in a comfortable position wearing soft earth-toned clothing. Dappled sunlight, tranquil water features in background, deeply relaxed expression, professional meditation photography, serene and calming atmosphere, realistic photo.',
  },
  {
    id: 'flexibility-intro',
    filename: 'flexibility-intro.jpg',
    prompt: 'An athletic senior demonstrating impressive flexibility in a gentle tai chi stretch outdoors, wearing flowing earth-toned clothing. Natural outdoor setting with soft morning light, expression of ease and comfort, professional wellness photography, achievable and safe-looking movement, realistic photo.',
  },
  {
    id: 'community-intro',
    filename: 'community-intro.jpg',
    prompt: 'A diverse group of seniors practicing tai chi together in a beautiful park at sunrise, all wearing comfortable earth-toned athletic wear. Everyone is smiling and in synchronized gentle movements, warm golden light, professional group fitness photography, sense of community and support, realistic photo.',
  },
  {
    id: 'strength-building',
    filename: 'strength-building.jpg',
    prompt: 'A strong, capable senior in their 70s performing a tai chi stance that shows controlled strength, wearing earth-toned clothing in an outdoor setting with natural stone. Confident posture, stable and grounded, professional fitness photography, empowering yet gentle, realistic photo.',
  },
  {
    id: 'mindfulness-practice',
    filename: 'mindfulness-practice.jpg',
    prompt: 'A serene senior practicing mindful breathing while walking slowly through a peaceful bamboo grove, wearing soft beige and orange tai chi attire. Expression of deep focus and calm, soft natural lighting filtering through bamboo, professional mindfulness photography, tranquil atmosphere, realistic photo.',
  },
  {
    id: 'success-story',
    filename: 'success-story.jpg',
    prompt: 'A vibrant, healthy-looking senior in their late 60s standing proudly in a home setting, wearing comfortable activewear in warm tones, with a genuine smile showing confidence and achievement. Natural window light, professional portrait photography, inspiring transformation feel, realistic photo.',
  },
  {
    id: 'home-practice',
    filename: 'home-practice.jpg',
    prompt: 'A senior practicing tai chi in a bright, comfortable living room with minimalist decor and large windows, wearing earth-toned clothing. Spacious room with yoga mat, plants in background, morning sunlight streaming in, professional home fitness photography, accessible and inviting, realistic photo.',
  },
];

async function generateImage(prompt: string, filename: string): Promise<void> {
  try {
    console.log(`Generating image for: ${filename}`);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024', // Wide format for quiz backgrounds
      quality: 'standard',
      style: 'natural',
    });

    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI');
    }

    // Download the image
    const publicDir = path.join(process.cwd(), 'public', 'quiz');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, filename);

    await downloadImage(imageUrl, filePath);
    console.log(`✓ Saved: ${filename}`);

  } catch (error) {
    console.error(`✗ Error generating ${filename}:`, error);
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

async function generateAllImages() {
  console.log('Starting quiz image generation...');
  console.log(`Total images to generate: ${quizImagePrompts.length}\n`);

  // Generate images with delay to respect rate limits
  for (let i = 0; i < quizImagePrompts.length; i++) {
    const { prompt, filename } = quizImagePrompts[i];

    await generateImage(prompt, filename);

    // Wait between requests to avoid rate limiting
    if (i < quizImagePrompts.length - 1) {
      console.log('Waiting 10 seconds before next request...\n');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log('\n✓ All quiz images generated successfully!');
  console.log('Images saved to: public/quiz/');
  console.log('\nEstimated cost: ~$0.40 (10 images at ~$0.04 each)');
}

// Run the script
if (require.main === module) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set');
    console.error('Please set it with: export OPENAI_API_KEY="your-key-here"');
    process.exit(1);
  }

  generateAllImages().catch(console.error);
}
