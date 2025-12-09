import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly configure what to watch
  // onDemandEntries: {
  //   maxInactiveAge: 25 * 1000,
  //   pagesBufferLength: 2,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: '9j56yz4me3.ufs.sh',
      }
    ]
  },
  // Add webpack config to handle socket.io
  // webpack: (config) => {
  //   config.externals.push({
  //     "utf-8-validate": "commonjs utf-8-validate",
  //     "bufferutil": "commonjs bufferutil",
  //   });
  //   return config;
  // },
};

export default nextConfig;
