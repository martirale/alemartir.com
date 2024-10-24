/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.LOCALHOST_HOSTNAME,
        port: process.env.LOCALHOST_PORT,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi.alemartir.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
