import type { NextConfig } from "next";
import "@/env";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    // External domains allow kora
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
      {
        protocol: "http",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;