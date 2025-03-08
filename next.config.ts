import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Multiplication',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Multiplication/' : '',
  typescript: {
    ignoreBuildErrors: false,
  },
  trailingSlash: true,
};

export default nextConfig;