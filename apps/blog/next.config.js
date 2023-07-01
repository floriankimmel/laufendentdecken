/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'laufendentdecken-podcast.at',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
}

module.exports = nextConfig
