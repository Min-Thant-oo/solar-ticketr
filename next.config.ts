import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "valiant-loris-158.convex.cloud", protocol: "https" },
      { hostname: "hardy-aardvark-309.convex.cloud", protocol: "https" },
    ],
  },
};

export default nextConfig;
