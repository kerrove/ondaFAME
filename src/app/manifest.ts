import type { MetadataRoute } from 'next'

import { BRAND } from '@/constants/site'
import { asset } from '@/utils/asset'

/**
 * Статический экспорт (GitHub Pages) требует явно объявить роут статическим — иначе Next
 * считает его динамическим и валит сборку на этапе сбора данных страниц.
 */
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${BRAND.fullName} — ${BRAND.tagline}`,
		short_name: BRAND.fullName,
		description: BRAND.description,
		lang: 'ru',
		// Пути внутри манифеста Next не трогает — в отличие от <link rel="manifest">, которому
		// basePath проставляется автоматически. Без asset() иконки уедут в корень домена.
		start_url: asset('/'),
		display: 'standalone',
		background_color: '#000000',
		theme_color: '#000000',
		icons: [
			{ src: asset('/icon.svg'), type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
			{
				src: asset('/apple-icon.svg'),
				type: 'image/svg+xml',
				sizes: '180x180',
				purpose: 'maskable'
			}
		]
	}
}
