import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/constants/site'

/**
 * Статический экспорт (GitHub Pages) требует явно объявить роут статическим — иначе Next
 * считает его динамическим и валит сборку на этапе сбора данных страниц.
 */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${SITE_URL}/`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		}
	]
}
