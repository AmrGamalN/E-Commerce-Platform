/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: { cache: boolean }) => {
    config.cache = false; // Disable Webpack caching // reconsider for prod later
    return config;
  },
  reactStrictMode: process.env.NODE_ENV === "production" ? false : true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  turbopack: {
    rules: {
      "*.mdx": ["mdx-loader"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "halladealsimages.s3.me-south-1.amazonaws.com",
        pathname: "/**", // Allow all paths from the bucket
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
