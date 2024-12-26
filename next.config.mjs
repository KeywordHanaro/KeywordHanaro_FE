/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/be/:path*',
        destination: 'http://keyword.hanaro.topician.com/be/:path*',
      },
    ];
  },
};
export default nextConfig;