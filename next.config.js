/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com'],
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
