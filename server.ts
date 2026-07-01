import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Needed for processing large images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Route for Image Generation
  app.post('/api/generate-image', async (req, res) => {
    try {
      const { prompt, referenceImage, imageSize = "1K" } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      // We'll use gemini-3.1-flash-image
      let input: any = prompt;
      
      if (referenceImage) {
        input = [
          {
            type: "image",
            data: referenceImage.data, // base64 without prefix
            mime_type: referenceImage.mimeType,
          },
          {
            type: "text",
            text: prompt,
          },
        ];
      }

      const interaction = await ai.interactions.create({
        model: 'gemini-3.1-flash-image',
        input: input,
        response_modalities: ['image', 'text'],
        generation_config: {
          image_config: {
            aspect_ratio: "1:1",
            image_size: imageSize
          }
        }
      });

      let generatedImage = null;

      for (const step of interaction.steps) {
        if (step.type === 'model_output') {
          const imageContent = step.content?.find(c => c.type === 'image');
          if (imageContent && imageContent.data) {
            const base64EncodeString = imageContent.data;
            const mimeType = imageContent.mime_type || 'image/png';
            generatedImage = `data:${mimeType};base64,${base64EncodeString}`;
          }
        }
      }

      if (generatedImage) {
        res.json({ imageUrl: generatedImage });
      } else {
        res.status(500).json({ error: 'Failed to generate image' });
      }

    } catch (error: any) {
      console.error('Image Generation Error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
