# Exercise Image Generation

This directory contains scripts for generating realistic exercise images using OpenAI's DALL-E API.

## Overview

The `generate-exercise-images.ts` script automatically generates professional, realistic images for all exercises across all subscription tiers (Free, Beginner, Intermediate, Expert).

## Prerequisites

1. **OpenAI API Key**: You need an OpenAI API key with access to DALL-E 3
2. **Node.js**: Version 18 or higher
3. **Dependencies**: The OpenAI npm package

## Setup

### 1. Install Dependencies

```bash
npm install openai
npm install -D tsx  # For running TypeScript files
```

### 2. Set Your API Key

```bash
export OPENAI_API_KEY="your-openai-api-key-here"
```

Or add it to your `.env` file:

```
OPENAI_API_KEY=your-openai-api-key-here
```

## Usage

### Generate All Images

```bash
npx tsx scripts/generate-exercise-images.ts
```

This will:
- Generate 22+ high-quality images (1024x1024px)
- Save them to `public/thumbnails/`
- Include a 10-second delay between requests to respect rate limits

### Image Specifications

**Generated Images Include:**
- **Free Tier** (3 images): Intro, Mindful Steps, Balance Basics
- **Beginner Tier** (9 images): 8-week progressive program
- **Intermediate Tier** (5 images): Advanced techniques
- **Expert Tier** (5 images): Mastery-level content

**Image Characteristics:**
- Size: 1024x1024 pixels
- Style: Natural, realistic photography
- Quality: Professional wellness/fitness photography
- Color palette: Warm earth tones (matching app design)
- Subjects: Diverse seniors (60s-70s) in authentic Tai Chi practice
- Settings: Natural outdoor environments (parks, gardens, mountains)

## Cost Estimate

DALL-E 3 pricing (as of 2026):
- Standard quality 1024x1024: ~$0.040 per image
- Total cost for 22 images: ~$0.88

**Note:** Prices may vary. Check OpenAI's current pricing before running.

## Image Prompts

Each exercise has a carefully crafted prompt designed to generate:
- Realistic senior practitioners (appropriate age representation)
- Proper Tai Chi form and postures
- Natural, inviting outdoor settings
- Warm, earthy color palette matching the app design
- Professional wellness photography aesthetic
- Inclusive diversity in age, gender, and ethnicity

## Customization

### Modify Prompts

Edit prompts in `generate-exercise-images.ts`:

```typescript
const exerciseImagePrompts = [
  {
    id: 'free-intro',
    filename: 'free-intro.jpg',
    prompt: 'Your custom prompt here...',
  },
  // ... more exercises
];
```

### Adjust Image Quality

Change the `quality` parameter in the script:

```typescript
const response = await openai.images.generate({
  model: 'dall-e-3',
  quality: 'hd',  // 'standard' or 'hd'
  // ...
});
```

**Note:** HD quality costs approximately 2x standard quality.

### Rate Limiting

The script includes a 10-second delay between requests. Adjust if needed:

```typescript
// Wait between requests (in milliseconds)
await new Promise(resolve => setTimeout(resolve, 10000));  // 10 seconds
```

## Troubleshooting

### Rate Limit Errors

If you hit rate limits:
1. Increase the delay between requests
2. Run the script in smaller batches
3. Check your OpenAI account tier and limits

### API Key Issues

```bash
# Verify your API key is set
echo $OPENAI_API_KEY

# Or check in the script output
# Error: OPENAI_API_KEY environment variable is not set
```

### Image Quality

If images don't match expectations:
1. Review and refine prompts
2. Consider using `quality: 'hd'`
3. Regenerate specific images by modifying the loop

## Manual Image Generation

To generate a single image manually:

```typescript
const response = await openai.images.generate({
  model: 'dall-e-3',
  prompt: 'Your detailed prompt here',
  n: 1,
  size: '1024x1024',
  quality: 'standard',
  style: 'natural',
});

console.log(response.data[0].url);
```

## Best Practices

1. **Test First**: Generate 1-2 images to verify quality before running full batch
2. **Backup**: Keep generated images in version control or cloud storage
3. **Consistency**: Maintain consistent style across all images
4. **Licensing**: OpenAI images can be used commercially per their terms
5. **Attribution**: Review OpenAI's usage policy for any attribution requirements

## Alternative Approaches

If not using the generation script:

### Option 1: Use Placeholder Services
```
https://placehold.co/1024x1024/ff9b40/white?text=Exercise+Name
```

### Option 2: Stock Photography
- Unsplash, Pexels (free)
- Adobe Stock, Shutterstock (paid)

### Option 3: Custom Photography
- Hire a photographer
- Organize Tai Chi photo shoots
- Ensure proper model releases

## Output

Images are saved to:
```
public/thumbnails/
├── free-intro.jpg
├── free-mindful-steps.jpg
├── free-balance.jpg
├── week1-day1.jpg
├── week1-day2.jpg
├── ...
└── teaching-tai-chi.jpg
```

These paths match the `thumbnailUrl` values in `src/data/exercises.ts`.

## Support

For issues with:
- **OpenAI API**: https://platform.openai.com/docs
- **This script**: Check console output for detailed error messages
- **Image integration**: Verify paths in `src/data/exercises.ts`
