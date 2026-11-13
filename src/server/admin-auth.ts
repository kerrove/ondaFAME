import { createHash, timingSafeEqual } from 'node:crypto'

/**
 * Вход в админку — Basic-авторизация браузера: окно логина рисует сам браузер, своих форм,
 * сессий и кук нет. Пароль задаётся переменной ADMIN_PASSWORD в .env.production на сервере;
 * без неё админка закрыта целиком.
 */
export const ADMIN_REALM = 'ONDA FAME admin'

/** Сравнение без утечки по времени: хэши выравнивают длину строк */
function safeEqual(left: string, right: string) {
	const hash = (value: string) => createHash('sha256').update(value).digest()

	return timingSafeEqual(hash(left), hash(right))
}

export function isAdminConfigured() {
	return Boolean(process.env.ADMIN_PASSWORD)
}

export function isAuthorized(header: string | null) {
	const password = process.env.ADMIN_PASSWORD
	const user = process.env.ADMIN_USER || 'admin'

	if (!password || !header?.startsWith('Basic ')) return false

	const decoded = Buffer.from(header.slice('Basic '.length), 'base64').toString('utf8')
	const separator = decoded.indexOf(':')

	if (separator < 0) return false

	// Оба сравнения выполняются всегда: по времени ответа не понять, что именно не совпало
	const userOk = safeEqual(decoded.slice(0, separator), user)
	const passwordOk = safeEqual(decoded.slice(separator + 1), password)

	return userOk && passwordOk
}
