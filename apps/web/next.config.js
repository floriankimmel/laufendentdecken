module.exports = {
    reactStrictMode: true,
    transpilePackages: ["timenow"],
    async rewrites() {
        return [{
            source: "/itra/:path*",
            destination: "https://itra.run/:path*",
        }]
    },
};
