/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // loader: "custom",
    domains: ["commons.wikimedia.org"],
  },
};

module.exports = nextConfig;
