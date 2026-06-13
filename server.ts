import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Chat Assistant
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not defined. Please add it to your secrets.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // We inject our catalog in the assistant's instruction
      const systemInstruction = `You are "Aura Luxe", a premium personal shopper and style stylist for Aura—the world-class multi-vendor luxury platform. 
Your goal is to guide clients with expert advice on fashion, gadgets, home aesthetics, and sports.
Always represent yourself gracefully, as an editor of Vogue or high-end lifestyle magazines, using helpful, concise, well-formatted descriptions.

Here is the entire current product catalog available at Aura. Recommend products from this list ONLY. Under no circumstances should you invent products not listed below.
Provide direct matching recommendations with prices and specific styling advice.
Use Markdown to structure your replies. Write in 2-3 short, highly impactful paragraphs.

When recommending a product, write EXACTLY [Product: ID] (e.g. [Product: prod-1] or [Product: prod-3]) on its own line or embedded in text so our custom UI can parse it and render standard high-fidelity mini add-to-cart cards directly inside the conversation feed! This makes your recommendations fully interactive.

Current Products in Inventory:
- [Product: prod-1] Aether SoundScan Max ANC Headphones - $349 (Premium wireless audio with 60h duration, elite hybrid ANC)
- [Product: prod-2] Aether ChronoSlate Active Smartwatch - $249 (AMOLED Retina smart timepiece, athletic diagnostics, dual-GPS)
- [Product: prod-3] Elemental Woolen Trench Coat - $189 (Naturally temperature-regulated Italian merino virgin wool)
- [Product: prod-4] AeroSprint Suede White Sneakers - $119 (Handmade full-grain Italian calf suede urban walking performance shoes)
- [Product: prod-5] Lumina ErgoPro Mesh Task Chair - $499 (Workspace health engineering, adaptive spinal support, mirror alloy base)
- [Product: prod-6] Artisan Ceramic Coffee Set - $79 (Stoneware volcanic clay carafe with basalt glaze for heat insulation, with 2 mugs)
- [Product: prod-7] Velvet Botanical Gold Restorative Serum - $85 (Collagen revival with active wild orchid squalane & 24K real gold particles)
- [Product: prod-8] Apex AeroFrame 24-Speed Gravel Bike - $1299 (Carbon composite frame, Shimano groupset, high-impact gravel tubeless tires)
- [Product: prod-9] Aether ProMechanical RGB Keyboard - $159 (Linear warm switch feel, CNC aluminum frame, acoustic double-layer isolation)

Be helpful, concise, friendly, and guide the user elegantly. Always output [Product: prod-X] when discussing models so the interactive cards render correctly!`;

      // Structure conversation history for @google/genai chats
      const formattedHistory = (history || []).map((h: any) => ({
        role: h.role,
        parts: h.parts || [{ text: h.text }],
      }));

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: formattedHistory,
      });

      const result = await chat.sendMessage({
        message,
      });

      res.json({
        text: result.text,
      });
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with Gemini." });
    }
  });

  // Serve static assets in production, otherwise Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
