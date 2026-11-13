'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

import { isAuthorized } from '@/server/admin-auth'
import { BASE_CONTENT, readOverrides, restorePrevious, saveOverrides } from '@/server/content'
import { type ContentOverrides, collectTextFields } from '@/utils/content-overrides'

export interface AdminActionState {
	status: 'idle' | 'success' | 'error'
	message: string
}

/** Больше — почти наверняка вставили в поле не то */
const MAX_LENGTH = 5000

/**
 * Server Function вызывается POST-запросом с любого адреса, а не только из /admin, поэтому
 * proxy её не закрывает: пароль проверяется здесь ещё раз.
 */
async function assertAdmin() {
	if (!isAuthorized((await headers()).get('authorization'))) {
		throw new Error('Нет доступа')
	}
}

/** Все страницы сайта собираются заново при следующем заходе — уже с новыми текстами */
function refreshSite() {
	revalidatePath('/', 'layout')
}

/** Windows присылает переводы строк как \r\n — в текстах сайта они не нужны */
function normalize(value: string) {
	return value.replace(/\r\n?/g, '\n').trim()
}

const TELEGRAM_KEY = 'contacts.telegramUrl'

/**
 * Ссылка для связи вписывается руками: «@ondafame» и «t.me/ondafame» приводим к полному адресу.
 * null — в поле не ссылка, сохранять нельзя: все кнопки «Связаться» вели бы в никуда.
 */
function normalizeTelegram(value: string) {
	const handle = value.match(/^@([\w]{3,})$/)

	if (handle) return `https://t.me/${handle[1]}`

	const url = /^https?:\/\//i.test(value) ? value : `https://${value}`

	try {
		const parsed = new URL(url)

		return parsed.hostname.includes('.') && !/\s/.test(value) ? parsed.href : null
	} catch {
		return null
	}
}

function sameOverrides(left: ContentOverrides, right: ContentOverrides) {
	const keys = Object.keys(left)

	return keys.length === Object.keys(right).length && keys.every(key => left[key] === right[key])
}

export async function saveContent(
	_previous: AdminActionState,
	formData: FormData
): Promise<AdminActionState> {
	try {
		await assertAdmin()
	} catch {
		return { status: 'error', message: 'Нет доступа. Обновите страницу и войдите заново.' }
	}

	const current = await readOverrides()
	const next: ContentOverrides = {}
	let empty = 0
	let tooLong = 0

	for (const field of collectTextFields(BASE_CONTENT)) {
		const raw = formData.get(field.key)
		// Поля нет в форме (страницу открыли до обновления сайта) — оставляем как было
		let value = typeof raw === 'string' ? normalize(raw) : (current[field.key] ?? field.value)

		if (field.key === TELEGRAM_KEY && value) {
			const telegram = normalizeTelegram(value)

			if (!telegram) {
				return {
					status: 'error',
					message: 'Telegram для связи: впишите ссылку вида https://t.me/имя или @имя.'
				}
			}

			value = telegram
		}

		if (!value) empty += 1
		else if (value.length > MAX_LENGTH) tooLong += 1
		// Сравнение с тоже нормализованным исходником: хвостовой пробел в content.json — не правка
		else if (value !== normalize(field.value)) next[field.key] = value
	}

	if (empty > 0) {
		return {
			status: 'error',
			message: `Пустых полей: ${empty}. Впишите текст или нажмите «Вернуть исходный».`
		}
	}

	if (tooLong > 0) {
		return {
			status: 'error',
			message: `Слишком длинных полей: ${tooLong}. В одном поле — не больше ${MAX_LENGTH} знаков.`
		}
	}

	if (sameOverrides(next, current)) return { status: 'success', message: 'Изменений нет.' }

	await saveOverrides(next, new Date().toISOString().replace(/[:.]/g, '-'))
	refreshSite()

	return { status: 'success', message: 'Сохранено. Изменения уже на сайте.' }
}

export async function undoLastSave(): Promise<AdminActionState> {
	try {
		await assertAdmin()
	} catch {
		return { status: 'error', message: 'Нет доступа. Обновите страницу и войдите заново.' }
	}

	if (!(await restorePrevious())) {
		return { status: 'error', message: 'Отменять нечего: более ранних версий нет.' }
	}

	refreshSite()

	return { status: 'success', message: 'Вернули версию до последнего сохранения.' }
}
