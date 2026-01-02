/**
 * Script to generate exercise images using OpenAI's DALL-E API
 *
 * Setup:
 * 1. Install dependencies: npm install openai
 * 2. Set your OpenAI API key: export OPENAI_API_KEY="your-key-here"
 * 3. Run: npx tsx scripts/generate-exercise-images.ts
 *
 * This will generate realistic images for all exercises and save them to public/thumbnails/
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Exercise data with image prompts
const exerciseImagePrompts = [
  // FREE TIER
  {
    id: 'free-intro',
    filename: 'free-intro.jpg',
    prompt: 'A peaceful senior woman in her 60s with silver hair, standing in a serene park setting at sunrise, wearing comfortable athletic clothes in earth tones (beige, soft orange). She is in a gentle Tai Chi stance with arms gracefully extended, surrounded by soft morning light filtering through trees. Professional photography, warm and inviting atmosphere, shallow depth of field, high quality, realistic photo.',
  },
  {
    id: 'free-mindful-steps',
    filename: 'free-mindful-steps.jpg',
    prompt: 'A fit senior man in his late 60s walking slowly and mindfully on a wooden pathway through a Japanese garden, wearing comfortable tai chi clothing in warm earth tones. His posture is upright and graceful, with one foot raised in a controlled step. Cherry blossoms in soft focus background, golden hour lighting, professional lifestyle photography, peaceful and meditative mood, high quality realistic photo.',
  },
  {
    id: 'free-balance',
    filename: 'free-balance.jpg',
    prompt: 'A confident senior woman in her 70s practicing balance exercises outdoors on a smooth stone platform, wearing flowing tai chi pants in warm tan color and a soft orange top. She stands on one leg with perfect poise, arms extended for balance, surrounded by zen garden elements. Warm afternoon sunlight, professional fitness photography, inspiring and empowering mood, high quality realistic photo.',
  },

  // BEGINNER TIER
  {
    id: 'week1-day1',
    filename: 'week1-day1.jpg',
    prompt: 'A senior person in comfortable earth-toned athletic wear practicing rooting stance in a peaceful bamboo grove, feet firmly planted, knees slightly bent. Morning mist in background, soft natural lighting, professional wellness photography, grounded and stable feeling, high quality realistic photo.',
  },
  {
    id: 'week1-day2',
    filename: 'week1-day2.jpg',
    prompt: 'A graceful senior practicing weight shifting movements in a beautiful outdoor setting with natural stone and water features. Wearing warm beige and soft orange tai chi clothing, captured mid-movement with weight transferring from one leg to another. Soft golden hour lighting, professional movement photography, fluid and balanced composition, high quality realistic photo.',
  },
  {
    id: 'week1-day3',
    filename: 'week1-day3.jpg',
    prompt: 'A serene senior woman performing flowing arm movements in a tranquil garden setting at dawn, wearing earth-toned tai chi attire. Arms moving in graceful circular patterns like embracing clouds, soft warm lighting, professional wellness photography, harmonious and peaceful mood, high quality realistic photo.',
  },
  {
    id: 'week1-day4',
    filename: 'week1-day4.jpg',
    prompt: 'A senior practitioner taking slow, deliberate walking steps along a peaceful riverside path, wearing comfortable warm-toned clothing. Captured in profile showing perfect tai chi walking form, one foot raised with control and grace. Soft natural lighting, professional fitness photography, mindful and focused atmosphere, high quality realistic photo.',
  },
  {
    id: 'week1-day5',
    filename: 'week1-day5.jpg',
    prompt: 'A peaceful senior in meditation pose on a cushion in a minimalist zen space with soft natural light from large windows. Wearing comfortable earth-toned clothing, eyes gently closed, hands resting in lap. Warm ambient lighting, professional wellness photography, deeply relaxed and reflective mood, high quality realistic photo.',
  },
  {
    id: 'week2-day1',
    filename: 'week2-day1.jpg',
    prompt: 'A senior practicing deep breathing exercises while walking through a misty forest path at sunrise, wearing warm orange and beige tai chi clothing. Chest expanded, arms moving in coordination with breath, surrounded by dappled morning light through trees. Professional wellness photography, energizing and refreshing atmosphere, high quality realistic photo.',
  },
  {
    id: 'week2-day2',
    filename: 'week2-day2.jpg',
    prompt: 'A flexible senior performing hip opening stretches in a beautiful outdoor yoga deck surrounded by nature, wearing earth-toned athletic wear. Gentle stretching pose showing healthy mobility, warm afternoon sunlight, professional fitness photography, comfortable and safe feeling, high quality realistic photo.',
  },
  {
    id: 'week2-day3',
    filename: 'week2-day3.jpg',
    prompt: 'A confident senior balancing on one leg on a smooth wooden platform in a zen garden, other leg raised with knee bent, arms extended gracefully. Wearing warm-toned tai chi clothing, cherry blossoms in soft background, golden hour lighting, professional wellness photography, stable and empowered mood, high quality realistic photo.',
  },
  {
    id: 'week3-integration',
    filename: 'week3-integration.jpg',
    prompt: 'A group of diverse seniors practicing flowing tai chi movements together in a beautiful park at sunrise, all wearing earth-toned athletic clothing. Multiple people in synchronized graceful poses showing community and harmony, warm golden light filtering through trees, professional lifestyle photography, joyful and connected atmosphere, high quality realistic photo.',
  },

  // INTERMEDIATE TIER
  {
    id: 'advanced-walk',
    filename: 'advanced-walk.jpg',
    prompt: 'An athletic senior demonstrating advanced tai chi walking form on a mountain trail with scenic vista, wearing professional earth-toned tai chi attire. Perfect posture and form, one leg extended in controlled step, arms in precise position. Dramatic natural lighting with mountain background, professional sports photography, powerful and masterful mood, high quality realistic photo.',
  },
  {
    id: 'hip-mobility',
    filename: 'hip-mobility.jpg',
    prompt: 'A senior in advanced hip mobility sequence on an outdoor platform overlooking water, wearing warm-toned athletic wear. Deep hip opening pose demonstrating excellent flexibility, surrounded by natural beauty, soft warm lighting, professional wellness photography, feeling of freedom and mobility, high quality realistic photo.',
  },
  {
    id: 'knee-strength',
    filename: 'knee-strength.jpg',
    prompt: 'A strong senior performing tai chi knee strengthening exercises in a serene garden setting, wearing earth-toned clothing. Low stance with bent knees showing controlled strength, surrounded by zen garden elements, warm natural lighting, professional fitness photography, powerful and stable feeling, high quality realistic photo.',
  },
  {
    id: 'balance-challenge',
    filename: 'balance-challenge.jpg',
    prompt: 'An accomplished senior holding an advanced one-legged balance pose on a natural stone in a tranquil water garden, wearing flowing warm-toned tai chi clothing. Perfect balance and poise, leg raised high, arms in elegant position, soft morning light reflecting on water, professional wellness photography, masterful and serene mood, high quality realistic photo.',
  },
  {
    id: 'stress-reduction',
    filename: 'stress-reduction.jpg',
    prompt: 'A peaceful senior in flowing tai chi movements at sunset by a calm lake, wearing earth-toned clothing. Arms moving in wide, graceful arcs, expression deeply relaxed and content, golden hour lighting reflecting on water, professional wellness photography, deeply calming and meditative atmosphere, high quality realistic photo.',
  },

  // EXPERT TIER
  {
    id: 'mastery-flow',
    filename: 'mastery-flow.jpg',
    prompt: 'A master-level senior performing an advanced tai chi form sequence in a stunning mountain temple courtyard at sunrise, wearing traditional-style earth-toned tai chi silk attire. Dynamic flowing movement captured mid-form showing years of practice and mastery, dramatic lighting with temple architecture, professional martial arts photography, inspiring and powerful mood, high quality realistic photo.',
  },
  {
    id: 'creative-expression',
    filename: 'creative-expression.jpg',
    prompt: 'An expressive senior creating their own unique tai chi movement in a beautiful natural amphitheater, wearing artistic earth-toned flowing garments. Arms extended in personal creative expression, surrounded by nature, magical golden light, professional artistic photography, joyful and liberated feeling, high quality realistic photo.',
  },
  {
    id: 'deep-meditation',
    filename: 'deep-meditation.jpg',
    prompt: 'A deeply meditative senior in seated meditation at a mountain overlook at dawn, wearing simple earth-toned robes. Perfectly still posture, surrounded by morning mist and soft light, prayer beads in hands, professional spiritual photography, profound peace and stillness, high quality realistic photo.',
  },
  {
    id: 'power-walk',
    filename: 'power-walk.jpg',
    prompt: 'A vigorous senior performing powerful tai chi walking movements on a beach at sunrise, wearing earth-toned athletic clothing. Strong, dynamic strides with perfect form, waves in background, dramatic morning light, professional fitness photography, energetic and vital mood, high quality realistic photo.',
  },
  {
    id: 'teaching-tai-chi',
    filename: 'teaching-tai-chi.jpg',
    prompt: 'A warm, experienced senior teacher demonstrating tai chi to a small group of students in a beautiful park pavilion, wearing elegant earth-toned tai chi clothing. Teacher in center showing movement while students mirror, warm afternoon light, professional lifestyle photography, wisdom and community feeling, high quality realistic photo.',
  },
];

async function generateImage(prompt: string, filename: string): Promise<void> {
  try {
    console.log(`Generating image for: ${filename}`);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'natural',
    });

    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI');
    }

    // Download the image
    const publicDir = path.join(process.cwd(), 'public', 'thumbnails');
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
  console.log('Starting image generation...');
  console.log(`Total images to generate: ${exerciseImagePrompts.length}\n`);

  // Generate images with delay to respect rate limits
  for (let i = 0; i < exerciseImagePrompts.length; i++) {
    const { prompt, filename } = exerciseImagePrompts[i];

    await generateImage(prompt, filename);

    // Wait between requests to avoid rate limiting (adjust as needed)
    if (i < exerciseImagePrompts.length - 1) {
      console.log('Waiting 10 seconds before next request...\n');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log('\n✓ All images generated successfully!');
  console.log('Images saved to: public/thumbnails/');
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
