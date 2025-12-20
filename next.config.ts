import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
        port: '',
        pathname: '/**',
      },
      // You can add more domains as needed
      {
        protocol: 'https',
        hostname: '**.bstatic.com', // Use this if you need multiple subdomains
      },

    ]
  }
};

export default nextConfig;
