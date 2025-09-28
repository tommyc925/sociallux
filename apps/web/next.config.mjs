/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:3000/:path*" }, // your Express port
    ];
  },
};

module.exports = {
  outputFileTracingRoot: __dirname,
  // ...o
};

export default nextConfig;
