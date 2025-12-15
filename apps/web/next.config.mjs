// apps/web/next.config.mjs
import path from "path";
import { fileURLToPath } from "url";

// __dirname isn't defined in ESM, so reconstruct it:
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy frontend calls like /api/atoms -> backend http://localhost:3000/api/atoms
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },

  // If you need this for a monorepo, point to your repo root or keep as __dirname
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
