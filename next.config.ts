import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dreamhomes-aws-s3-bucket.s3.amazonaws.com"
      }
    ],
  },
};

export default nextConfig;
