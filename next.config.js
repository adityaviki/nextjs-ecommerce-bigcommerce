/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn11.bigcommerce.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
