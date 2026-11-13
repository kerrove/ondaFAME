import { mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

import base from '../../content.json'

import { TELEGRAM_URL } from '@/constants/site'
import type { SiteContent } from '@/types'
import { type ContentOverrides, applyOverrides } from '@/utils/content-overrides'

/**
 * Правки заказчика лежат рядом с приложением, в data/. В контейнере это том с сервера: он
 * переживает пересборку, а сборка видит его в контексте и сразу печёт страницу с правками.
 */
const DATA_DIR = process.env.CONTENT_DATA_DIR ?? path.join(process.cwd(), 'data')
const OVERRIDES_FILE = path.join(DATA_DIR, 'overrides.json')
const HISTORY_DIR = path.join(DATA_DIR, 'history')

/** Столько прошлых версий хранится для кнопки «Отменить» */
const HISTORY_LIMIT = 30

/**
 * База — content.json из репозитория. JSON выводится широкими типами ('left' как string),
 * поэтому приведение; форму всё равно сверяет TypeScript через SiteContent.
 * Telegram для связи исходно берётся из env, а админка может его переопределить.
 */
export const BASE_CONTENT = {
	...base,
	contacts: { ...base.contacts, telegramUrl: TELEGRAM_URL }
} as SiteContent

export async function readOverrides(): Promise<ContentOverrides> {
	try {
		const parsed: unknown = JSON.parse(await readFile(OVERRIDES_FILE, 'utf8'))

		if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {}

		return Object.fromEntries(
			Object.entries(parsed).filter(
				(entry): entry is [string, string] => typeof entry[1] === 'string'
			)
		)
	} catch (error) {
		// Файла нет — правок ещё не было. Битый файл не должен ронять сайт: показываем базу.
		if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
			console.error('[content] overrides.json не прочитан, показываю исходные тексты', error)
		}

		return {}
	}
}

/**
 * Тексты сайта с правками заказчика. cache() — один раз на запрос: секции берут тексты
 * независимо друг от друга, а файл читается единожды. Страница при этом остаётся статической:
 * рендер идёт на сборке и после сохранения в админке, а не на каждый визит.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
	return applyOverrides(BASE_CONTENT, await readOverrides())
})

/** Запись через временный файл: сбой посреди записи не оставит полупустой JSON */
async function writeJson(file: string, value: unknown) {
	const temp = `${file}.tmp`

	await writeFile(temp, `${JSON.stringify(value, null, '\t')}\n`, 'utf8')
	await rename(temp, file)
}

async function listHistory() {
	try {
		// Имена — ISO-время без двоеточий, поэтому сортировка по имени = по времени
		return (await readdir(HISTORY_DIR)).filter(name => name.endsWith('.json')).sort()
	} catch {
		return []
	}
}

export async function countHistory() {
	return (await listHistory()).length
}

/** Сохраняет новые правки, а прежние кладёт в историю */
export async function saveOverrides(next: ContentOverrides, stamp: string) {
	await mkdir(HISTORY_DIR, { recursive: true })

	await writeJson(path.join(HISTORY_DIR, `${stamp}.json`), await readOverrides())
	await writeJson(OVERRIDES_FILE, next)

	const history = await listHistory()
	const excess = history.slice(0, Math.max(0, history.length - HISTORY_LIMIT))

	await Promise.all(excess.map(name => rm(path.join(HISTORY_DIR, name))))
}

/** Возвращает версию до последнего сохранения. false — откатывать нечего. */
export async function restorePrevious() {
	const latest = (await listHistory()).at(-1)

	if (!latest) return false

	const file = path.join(HISTORY_DIR, latest)

	await mkdir(DATA_DIR, { recursive: true })
	await rename(file, OVERRIDES_FILE)

	return true
}
