import type { NextConfig } from "next";
import './envConfig.ts'
const nextConfig: NextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://nestbackendviolin-306962033564.us-central1.run.app",
        NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
