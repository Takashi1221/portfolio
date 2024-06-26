/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 他の設定があればここに追加
  images: {
    unoptimized: true,
  },
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export default nextConfig;
