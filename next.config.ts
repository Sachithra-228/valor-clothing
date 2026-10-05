import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product images uploaded through the admin dashboard.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;
