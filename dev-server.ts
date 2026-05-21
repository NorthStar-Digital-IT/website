import app from "./server";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startDevServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Dev Server] Running locally on http://localhost:${PORT}`);
  });
}

startDevServer();
