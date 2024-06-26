/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // 他の設定があればここに追加
    images: {
        unoptimized: true,
      },
};

export default nextConfig;
