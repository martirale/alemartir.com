/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.LOCALHOST_HOST_BACKEND,
        port: process.env.LOCALHOST_PORT_BACKEND,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi.alemartir.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
