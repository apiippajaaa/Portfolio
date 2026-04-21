import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false ,
  allowedDevOrigins: ["192.168.1.5"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname:
          "github-production-user-asset-6210df.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;