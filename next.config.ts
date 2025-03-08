import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Multiplication',  // Your GitHub repository name
  assetPrefix: '/Multiplication/',
  typescript: {
    ignoreBuildErrors: false,  // Ensures TypeScript checks are not ignored
  },
};

export default nextConfig;