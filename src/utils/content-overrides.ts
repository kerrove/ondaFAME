/**
 * Правки текстов из админки хранятся не целым content.json, а плоским словарём «путь → текст».
 * Базой остаётся content.json из репозитория: разработчик может добавить кейс или поле, и правки
 * заказчика не затрут его работу, а его работа — правки заказчика.
 *
 * Путь собирается из ключей объектов; элемент массива с полем id адресуется по id, остальные —
 * по номеру. Так правка описания услуги «target» переживает перестановку услуг местами.
 */

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

export type ContentOverrides = Record<string, string>

/** Самый внешний элемент списка, внутри которого лежит поле: метрика кейса — под кейсом */
interface FieldOwner {
	item: Record<string, Json>
	/** Сколько сегментов пути ведёт к самому элементу, включая его id */
	depth: number
}

export interface TextField {
	/** Путь поля: services.items.target.description */
	key: string
	/** Сегменты пути отдельно — по ним админка строит подписи */
	path: string[]
	owner: FieldOwner | null
	value: string
}

/** Служебные строки: по ним код склеивает данные, заказчику менять их нечего */
const LOCKED_KEYS = new Set(['id', 'href', 'axis'])

export function isRecord(value: Json): value is Record<string, Json> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function segment(item: Json, index: number) {
	return isRecord(item) && typeof item.id === 'string' ? item.id : String(index)
}

/** Обходит все редактируемые строки документа в порядке их появления */
function walk(
	node: Json,
	path: string[],
	owner: FieldOwner | null,
	visit: (field: TextField) => Json
): Json {
	if (typeof node === 'string') return visit({ key: path.join('.'), path, owner, value: node })

	if (Array.isArray(node)) {
		return node.map((item, index) => {
			const itemPath = [...path, segment(item, index)]
			const itemOwner = owner ?? (isRecord(item) ? { item, depth: itemPath.length } : null)

			return walk(item, itemPath, itemOwner, visit)
		})
	}

	if (isRecord(node)) {
		return Object.fromEntries(
			Object.entries(node).map(([key, value]) => [
				key,
				LOCKED_KEYS.has(key) ? value : walk(value, [...path, key], owner, visit)
			])
		)
	}

	return node
}

/** База с наложенными правками. Правка, чей путь из базы исчез, молча отбрасывается. */
export function applyOverrides<T>(base: T, overrides: ContentOverrides): T {
	return walk(base as Json, [], null, field => overrides[field.key] ?? field.value) as T
}

/** Все редактируемые строки базы — из них админка строит форму */
export function collectTextFields(base: unknown): TextField[] {
	const fields: TextField[] = []

	walk(base as Json, [], null, field => {
		fields.push(field)
		return field.value
	})

	return fields
}
