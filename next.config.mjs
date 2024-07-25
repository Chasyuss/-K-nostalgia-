/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kejbzqdwablccrontqrb.supabase.co'
      }
    ]
  }
};

export default nextConfig;
