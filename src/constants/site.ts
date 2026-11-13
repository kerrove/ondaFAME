/**
 * Незаданный секрет в GitHub Actions разворачивается в пустую строку, а не в undefined, поэтому
 * `??` его не ловит и в сборку уходит пустой адрес. Проверяем значение, а не факт объявления.
 */
function fromEnv(name: string, value: string | undefined, fallback: string) {
	const trimmed = value?.trim()

	if (trimmed) return trimmed

	/*
	 * Молчаливая подстановка — худший вид ошибки: сайт собирается, выглядит целым и ведёт
	 * не туда. Предупреждение печатается один раз при сборке, на клиент не попадает.
	 */
	if (typeof window === 'undefined') {
		console.warn(`[onda-fame] ${name} не задан — подставлено запасное значение ${fallback}`)
	}

	return fallback
}

/**
 * Домен ещё не закреплён за проектом. Пока он не куплен, canonical, sitemap и robots читают
 * NEXT_PUBLIC_SITE_URL: локально из .env, на GitHub Pages — из секрета SITE_URL (см. workflow).
 */
export const SITE_URL = fromEnv(
	'NEXT_PUBLIC_SITE_URL',
	process.env.NEXT_PUBLIC_SITE_URL,
	'https://onda-fame.ru'
).replace(/\/$/, '')

/**
 * Только схема и хост, без базового пути. Next сам подставляет basePath к картинкам файловой
 * конвенции (opengraph-image), поэтому metadataBase обязан быть origin — иначе на GitHub Pages
 * путь удвоится: /ondaFAME/ondaFAME/opengraph-image.png.
 */
export const SITE_ORIGIN = new URL(SITE_URL).origin

/**
 * Адрес Telegram владелец ещё не передал — заменить на реальный перед публикацией.
 * Локально берётся из .env, на GitHub Pages — из секрета TG_URL (см. workflow).
 */
export const TELEGRAM_URL = fromEnv(
	'NEXT_PUBLIC_TELEGRAM_URL',
	process.env.NEXT_PUBLIC_TELEGRAM_URL,
	'https://t.me/ondafame'
)
