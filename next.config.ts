import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // watchOptions: {
  //   pollIntervalMs: 1000,
  // }
};

export default nextConfig;
