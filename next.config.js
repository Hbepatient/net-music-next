/** @type {import('next').NextConfig} */
const withImages = require('next-images')

const withTM = require('next-transpile-modules')([
  'react-vant',
]);

const nextConfig = withTM(withImages({
  // Next.js 配置
    reactStrictMode: true,
    swcMinify: true,
}))

module.exports = nextConfig
