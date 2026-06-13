import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel AI SDK requires experimental config for streaming */
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
