/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 'standalone' output is needed for Render deployment
  // Vercel ignores it and uses its own system
  output: 'standalone',
  images: {
    qualities: [75, 100],
  },
}

module.exports = nextConfig
