/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 'standalone' output is needed for Render deployment
  // Vercel ignores it and uses its own system
  output: 'standalone',
}

module.exports = nextConfig
