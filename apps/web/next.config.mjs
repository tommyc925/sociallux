/** @type {import('next').NextConfig} */

import { dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:3000/:path*" }, // your Express port
    ];
  },
  outputFileTracingRoot: currentDir,
  // ...other config
};
