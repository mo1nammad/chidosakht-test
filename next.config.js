// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.c2.liara.space",
      },
    ],
  },
};

module.exports = nextConfig;
