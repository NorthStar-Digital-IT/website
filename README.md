# NorthStar Digital — Web Design & Local Authority Engine

Welcome to the repository for the **NorthStar Digital** agency landing page. This platform showcases our premium digital consulting services and hosts our real-time, interactive tools engineered to help local brick-and-mortar businesses in Flower Mound, Highland Village, and the wider North Texas area establish digital authority.

---

## 🌟 Core Features

1. **Precision Service Bento**: A beautifully designed services grid showcasing our core competencies in web development, organic local SEO, client AI solutions, and system optimization.
2. **Interactive SEO & Web Audit Analyzer**: A real-time, AI-driven assessment tool powered by Gemini 3.5 Flash that evaluates any business website URL and generates scoreboards, high-impact critiques, and resolution steps.
3. **Bespoke Strategy Proposal Builder**: A local strategy form generating a tailored roadmap in seconds using generative AI.
4. **Rebuilding Simulator**: An interactive animation showcasing legacy slow websites vs. the NorthStar optimization engine (scoring a perfect 100/100 on Core Web Vitals).

---

## ⚙️ Architecture & Tech Stack

This project is built as a hybrid Single Page Application (SPA) with a lightweight Express backend, fully optimized for both local development and Vercel serverless hosting:

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS 4](https://tailwindcss.com/) + [Motion](https://motion.dev/) (Framer Motion).
- **Backend**: [Express](https://expressjs.com/) serving API endpoints at `/api/audit` and `/api/strategy`.
- **AI Engine**: Powered by Google's latest `gemini-3.5-flash` model via the `@google/genai` SDK.
- **Serverless Integration**: Out-of-the-box support for Vercel using `vercel.json` rewrites and `api/index.ts` serverless function mapping.

---

## 🛠️ Local Setup & Running

Follow these steps to run the application locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation
Clone the repository and install all npm dependencies:
```bash
git clone https://github.com/NorthStar-Digital-IT/website.git
cd website
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Run Development Server
Start the local development server (running Vite middleware inside Express):
```bash
npm run dev
```
Once started, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Building & Deployment to Vercel

The repository is pre-configured for instant zero-config deployments on **Vercel**:

### Automatic GitHub Deployments (Recommended)
1. Go to your **Vercel Dashboard** and click **Add New > Project**.
2. Import the `NorthStar-Digital-IT/website` repository from GitHub.
3. Vercel automatically detects the Vite build configuration.
4. **Crucial**: Expand the **Environment Variables** section and add:
   - Key: `GEMINI_API_KEY`
   - Value: *Your Google Gemini API Key*
5. Click **Deploy**. Vercel will build the frontend assets and serve all `/api/*` endpoints as serverless functions.

### Manual Production Builds
If you want to compile and bundle the project manually:
- To build: `npm run build`
- To run production locally: `npm run start` (serves the static assets out of `/dist` and runs Express on port 3000).