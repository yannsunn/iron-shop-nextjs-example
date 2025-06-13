/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

module.exports = nextConfig;