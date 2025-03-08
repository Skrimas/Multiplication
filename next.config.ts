import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Multiplication',
  assetPrefix: '/Multiplication',
  typescript: {
    ignoreBuildErrors: false,
  },
  trailingSlash: true,
};

export default nextConfig;