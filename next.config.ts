import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
	poweredByHeader: false,
	reactCompiler: true,
	experimental: {
		optimizePackageImports: ['lucide-react']
	},
	logging: {
		fetches: {
			hmrRefreshes: true
		}
	},
};

export default nextConfig;
