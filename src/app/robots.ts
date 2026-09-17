import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/constants/site'

/**
 * Статический экспорт (GitHub Pages) требует явно объявить роут статическим — иначе Next
 * считает его динамическим и валит сборку на этапе сбора данных страниц.
 */
export const dynamic = 'force-static'

/*
 * Директивы host здесь нет намеренно. Google её не читает никогда, Яндекс отказался от неё
 * в 2018-м, а на GitHub Pages SITE_URL содержит подкаталог (/<repo>) — host с путём невалиден
 * по самой её спецификации. Строка, которую никто не исполняет, только вводит в заблуждение.
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: '*', allow: '/' },
		sitemap: `${SITE_URL}/sitemap.xml`
	}
}
