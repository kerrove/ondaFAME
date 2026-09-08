import type { NavLink } from '@/types'

/**
 * Домен ещё не закреплён за проектом. Пока он не куплен, canonical, sitemap и robots читают
 * NEXT_PUBLIC_SITE_URL; после покупки достаточно поменять значение в .env.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onda-fame.ru').replace(
	/\/$/,
	''
)

/**
 * Только схема и хост, без базового пути. Next сам подставляет basePath к картинкам файловой
 * конвенции (opengraph-image), поэтому metadataBase обязан быть origin — иначе на GitHub Pages
 * путь удвоится: /ondaFAME/ondaFAME/opengraph-image.png.
 */
export const SITE_ORIGIN = new URL(SITE_URL).origin

/** Адрес Telegram владелец ещё не передал — заменить на реальный перед публикацией. */
export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/ondafame'

export const BRAND = {
	/** Логотип разрезан по начертанию: «onda» белым, «FAME» фиолетовым */
	wordmarkLight: 'onda',
	wordmarkAccent: 'FAME',
	fullName: 'ONDA FAME',
	legalName: 'ONDA FAME',
	tagline: 'Маркетинговое агентство полного цикла для музыкантов',
	description:
		'Первое маркетинговое агентство полного цикла с гарантией результата. Продюсирование, продвижение у блогеров, SMM и контент-продакшн для артистов.'
} as const

export const CTA_LABEL = 'Связаться с нами'
export const CTA_NOTE = 'Ответим в течение рабочего дня.'

export const NAV_LINKS: NavLink[] = [
	{ href: '#services', label: 'Услуги' },
	{ href: '#cases', label: 'Кейсы' },
	{ href: '#team', label: 'Команда' },
	{ href: '#faq', label: 'Вопросы' }
]
