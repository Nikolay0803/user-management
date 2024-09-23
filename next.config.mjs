/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://13.60.194.15:80/:path*",
      },
      { source: "/(.*)", destination: "/" },
    ];
  },
};

export default nextConfig;
