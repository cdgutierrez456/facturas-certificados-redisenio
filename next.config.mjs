import { dirname, join } from 'path';
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  sassOptions: {
    includePaths: [join(dirname('./'), 'sass')],
    prependData: `@import "main.sass"`,
  }
};
export default nextConfig;