/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    'rc-picker',
    'rc-util',
    '@ant-design/icons',
    'rc-pagination',
    'rc-notification',],
};

module.exports = nextConfig;
