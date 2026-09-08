import type { NextConfig } from 'next'

/**
 * Статический экспорт включается только для GitHub Pages. Держать его постоянно нельзя:
 * при output: 'export' перестают работать next dev и next start.
 *
 * basePath приходит из workflow. На Pages сайт живёт в подкаталоге /<repo>, и без него
 * все ссылки и ассеты уедут в корень домена.
 *
 * Переменная намеренно с префиксом NEXT_PUBLIC_: тем же значением пользуется код приложения
 * (см. src/utils/asset.ts), потому что в src у next/image и в путях внутри manifest.ts basePath
 * не подставляется автоматически. Две разные переменные на одно значение рано или поздно разъедутся.
 */
const isPages = process.env.GITHUB_PAGES === 'true'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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
	...(isPages
		? {
				output: 'export',
				basePath,
				// На Pages нет сервера, оптимизировать картинки на лету некому
				images: { unoptimized: true }
			}
		: {})
}

export default nextConfig
