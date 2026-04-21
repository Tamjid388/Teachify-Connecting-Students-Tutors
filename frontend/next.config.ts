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
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
