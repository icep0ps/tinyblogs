/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  headers() {
    return [
      {
        source: '/api/trpc/[trpc]',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
    ],
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
