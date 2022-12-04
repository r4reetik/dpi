/** @type {import('next').NextConfig} */

const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "./",
  swcMinify: true,
  webpack(config, { buildId }) {
    config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });
    return config;
  },
  images: {
    unoptimized: true,
    domains: [
      "static.debank.com",
      "logos.covalenthq.com",
      "icons.iconarchive.com",
      "tokens.1inch.io",
    ],
  },
};

module.exports = nextConfig;
