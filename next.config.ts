import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 100], // add every quality value used anywhere in the app
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // required for Sanity-hosted images via urlFor()
      },
    ],
  },
};

export default nextConfig;