import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// MongoDB Connection (graceful degradation)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Mock Cases Data
const cases = [
  { id: 'CS-2025-05124', date: '24 May 2025', status: 'Completed', complaint: 'Acidity & discomfort', severity: 'Moderate', type: 'AYUSH Consultation' }
];

app.get("/api/cases", (req, res) => {
  res.json(cases);
});

// Chat Endpoint using Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!ai) {
      // Fallback for hackathon demo if API key is missing
      return res.json({ 
        reply: "I understand. Could you tell me a bit more about when these symptoms started and if anything makes them better or worse? (Note: AI API Key is missing, this is a fallback response)" 
      });
    }

    const systemInstruction = `You are a medical case-taking AI assistant for MediKiosk in an Indian hospital setting. 
    Your goal is to elicit a structured clinical history. 
    Use the SOCRATES framework for pain, and ask relevant follow-up questions.
    If the user mentions AYUSH or Ayurvedic terms, seamlessly ask about Dashavidha Pariksha elements (Prakriti, Vikriti, Agni, etc.) if applicable.
    Keep your responses concise, empathetic, and professional. Ask ONLY ONE question at a time. Do not attempt to diagnose.`;

    const contents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({ reply: response.text });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

async function startServer() {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
