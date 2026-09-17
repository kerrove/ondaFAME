import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/constants/site'

/**
 * Статический экспорт (GitHub Pages) требует явно объявить роут статическим — иначе Next
 * считает его динамическим и валит сборку на этапе сбора данных страниц.
 */
export const dynamic = 'force-static'

/**
 * Дата последней правки контента, а не сборки. `new Date()` здесь выдавал бы новое значение
 * после каждого деплоя — поисковик видел бы «страница обновляется постоянно», перепроверял её
 * впустую и переставал доверять сигналу. Менять руками вместе с текстом страницы.
 */
const CONTENT_UPDATED_AT = new Date('2026-09-18')

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${SITE_URL}/`,
			lastModified: CONTENT_UPDATED_AT,
			changeFrequency: 'monthly',
			priority: 1
		}
	]
}
