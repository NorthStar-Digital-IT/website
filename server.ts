import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your secrets in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API Endpoints

// Endpoint to generate an interactive SEO & Web Presence Audit
app.post("/api/audit", async (req, res) => {
  try {
    const { url, businessName, businessType } = req.body;
    if (!url || !businessName) {
      return res.status(400).json({ error: "Missing website URL or business name." });
    }

    const ai = getGemini();

    const prompt = `You are a Senior SEO Specialist and Conversion Rate Optimization Lead at NorthStar Digital, located in Flower Mound, North Texas.
Provide a comprehensive, professional, and actionable digital presence audit for the following local business:
- Business Name: ${businessName}
- Business Type: ${businessType || 'Local Business'}
- Website URL: ${url}

Your audit MUST contain the following high-level sections (formatted nicely in clean JSON matching the requested schema):
1. SEO Score (out of 100)
2. Performance Score (out of 100)
3. Design Score (out of 100)
4. Overall Executive Summary (1-2 paragraphs highlighting local competitor advantages in the North Texas market)
5. Critical Issues (array of objects with 'title', 'severity' [High, Medium, Info], 'description', and 'howToFix')
6. Key Recommendations (array of strings, action-oriented)
7. Local SEO analysis specific to Highland Village, Flower Mound, or Denton County area.

Respond ONLY with a valid JSON object matching the schema below. No markdown wrappers like \`\`\`json, just pure raw JSON string.

Schema:
{
  "seoScore": number,
  "performanceScore": number,
  "designScore": number,
  "summary": string,
  "criticalIssues": [{"title": "string", "severity": "High" | "Medium" | "Info", "description": "string", "howToFix": "string"}],
  "recommendations": ["string"],
  "localSeoBrief": string
}`;

    const r = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const textOutput = r.text || "{}";
    const data = JSON.parse(textOutput.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Audit error:", error);
    res.status(500).json({ error: error.message || "Failed to generate digital presence audit." });
  }
});

// Endpoint to submit strategy request and get instant strategic recommendations
app.post("/api/strategy", async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    if (!name || !email || !service) {
      return res.status(400).json({ error: "Name, email, and selected service are required." });
    }

    const ai = getGemini();

    const prompt = `You are the lead local strategist at NorthStar Digital web agency in Flower Mound, TX.
We received a new strategy request form:
- Prospect Full Name: ${name}
- Business Email: ${email}
- Interested Service: ${service}
- Project description or query: ${message || 'No details provided'}

Generate an immediate, premium strategic plan outline (in Markdown) that we can show directly to this prospective local business.
Structure the strategy plan outline beautifully:
1. **Executive Welcome**: A personalized, warm greeting welcoming them to NorthStar Digital, acknowledging their location in Flower Mound/Highland Village area or North Texas if mentioned.
2. **Current Challenge & Opportunity**: Break down why their requested service (${service}) is essential in today's digital climate, referencing the text they sent: "${message || 'growing digital presence'}".
3. **Draft Action Roadmap**: A beautiful bulleted roadmap (3-4 phases) showing how NorthStar Digital would partner with them to redesign or optimize their assets.
4. **Local Performance Projections**: Highlight how improving Web Vitals or local Google Maps visibility will lead to clear local foot-traffic or inbound lead metrics.

Tone should be visionary, high-authority, encouraging, and local community-minded. Keep it under 400 words.`;

    const r = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ strategyMarkdown: r.text || "Strategy report could not be generated." });
  } catch (error: any) {
    console.error("Strategy error:", error);
    res.status(500).json({ error: error.message || "Failed to generate strategic recommendations." });
  }
});

// Serve Vite Static & Root Middleware when running in standard production mode (non-Vercel)
if (process.env.VERCEL !== "1" && process.env.NODE_ENV === "production") {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  // Serve index.html for all SPA routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT} in env: production`);
  });
}

export default app;
