import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Multiplication',  // Ensure this matches your repository name
  assetPrefix: '/Multiplication/',
  typescript: {
    ignoreBuildErrors: false,  // Ensures TypeScript checks are not ignored
  },
  trailingSlash: true,  // Important for GitHub Pages to correctly resolve paths
};

export default nextConfig;