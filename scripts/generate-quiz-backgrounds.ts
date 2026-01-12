import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const quizBackgroundPrompts = [
  {
    id: 'quiz-bg-1',
    filename: 'quiz-bg-1.jpg',
    prompt: `A stunning professional photograph of a FIT and ATTRACTIVE couple over 55 years old (late 50s to early 60s) doing gentle Tai Chi exercises together in a serene park setting at sunrise. The couple has EXCELLENT PHYSIQUES and GREAT BODIES - toned, lean, and fit, showing the results of an active healthy lifestyle. The gentleman has distinguished silver-gray hair, athletic build with visible muscle tone, and confident posture. The lady has styled silver or light blonde hair, a graceful toned figure, and radiant beauty. Both are wearing comfortable athletic attire in earth tones (beige, soft orange, warm tan colors). They are performing graceful Tai Chi movements with flowing motion, smiling at each other, showing genuine joy and connection. The background shows a beautiful park with soft morning light, trees, and peaceful atmosphere. Professional lifestyle photography, shallow depth of field, warm soft lighting, natural colors, realistic photo showing vibrant healthy active aging over 55 with great fitness and attractiveness. Beautiful, inspiring, aspirational yet achievable feeling. Soft focus background suitable for text overlay.`,
  },
  {
    id: 'quiz-bg-2',
    filename: 'quiz-bg-2.jpg',
    prompt: `A stunning professional photograph of a FIT and ATTRACTIVE couple over 55 years old (late 50s to early 60s) stretching together outdoors in a beautiful garden setting. The couple has EXCELLENT PHYSIQUES and GREAT BODIES - toned, lean, and fit, showing the results of an active healthy lifestyle. The gentleman has distinguished silver-gray hair, athletic build with visible muscle tone, and confident posture. The lady has styled silver or light blonde hair, a graceful toned figure, and radiant beauty. Both are wearing casual athletic wear in earth tones (beige, soft white, warm sand colors). They are in a gentle stretching pose, demonstrating flexibility and balance, smiling warmly. The background shows a lush garden with soft natural lighting, flowers, and greenery creating a peaceful atmosphere. Professional lifestyle photography, shallow depth of field, warm natural lighting, realistic photo showing vibrant healthy active aging over 55 with great fitness and attractiveness. Beautiful, inspiring, aspirational yet achievable feeling. Soft focus background suitable for text overlay.`,
  },
  {
    id: 'quiz-bg-3',
    filename: 'quiz-bg-3.jpg',
    prompt: `A stunning professional photograph of a FIT and ATTRACTIVE couple over 55 years old (late 50s to early 60s) walking together hand in hand on a peaceful nature path. The couple has EXCELLENT PHYSIQUES and GREAT BODIES - toned, lean, and fit, showing the results of an active healthy lifestyle. The gentleman has distinguished silver-gray hair, athletic build with visible muscle tone, and confident posture. The lady has styled silver or light blonde hair, a graceful toned figure, and radiant beauty. Both are wearing comfortable casual fitness attire in earth tones (beige, soft orange, warm tan colors). They are walking together with confident athletic strides, looking at each other and laughing, showing genuine happiness and vitality. The background shows a beautiful tree-lined path with dappled sunlight, creating a serene atmosphere. Professional lifestyle photography, shallow depth of field, golden hour lighting, natural colors, realistic photo showing vibrant healthy active aging over 55 with great fitness and attractiveness. Beautiful, inspiring, aspirational yet achievable feeling. Soft focus background suitable for text overlay.`,
  },
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
        writeStream.on('error', reject);
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function generateQuizBackgrounds(): Promise<void> {
  const publicDir = path.join(process.cwd(), 'public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Generating quiz background images with DALL-E 3...\n');

  for (const imagePrompt of quizBackgroundPrompts) {
    try {
      console.log(`Generating: ${imagePrompt.filename}...`);
      console.log(`Prompt: ${imagePrompt.prompt.substring(0, 100)}...\n`);

      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: imagePrompt.prompt,
        n: 1,
        size: '1792x1024', // Wide landscape format
        quality: 'hd',
        style: 'natural',
      });

      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error('No image URL returned from OpenAI');
      }

      const filepath = path.join(publicDir, imagePrompt.filename);
      await downloadImage(imageUrl, filepath);

      console.log(`✓ Saved: ${imagePrompt.filename}\n`);
    } catch (error) {
      console.error(`✗ Failed to generate ${imagePrompt.filename}:`, error);
      console.error('');
    }
  }

  console.log('Quiz background generation complete!');
  console.log('\nNote: Images are saved to the public/ directory and will be');
  console.log('displayed at 10% opacity behind quiz questions for subtle atmosphere.');
}

// Run the script
generateQuizBackgrounds().catch(console.error);
