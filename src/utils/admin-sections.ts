import { ADMIN_KEY_LABELS, ADMIN_SECTIONS } from '@/constants/admin'
import {
	type ContentOverrides,
	type Json,
	type TextField,
	collectTextFields,
	isRecord
} from '@/utils/content-overrides'

export interface AdminField {
	key: string
	label: string
	/** Текст на сайте сейчас — с правками */
	value: string
	/** Текст из content.json разработчика — для кнопки «Вернуть исходный» */
	original: string
	multiline: boolean
}

interface AdminGroup {
	id: string
	/** Пусто у полей, которые не принадлежат элементу списка */
	title: string
	fields: AdminField[]
}

export interface AdminSection {
	id: string
	title: string
	hint?: string
	groups: AdminGroup[]
	/** Сколько полей раздела уже отличается от исходного текста */
	changed: number
}

/** Длиннее этого — многострочное поле: описание не должно ютиться в одной строке */
const MULTILINE_FROM = 60

/** Как назвать элемент списка: по его заголовку, имени или вопросу — по тому, что есть */
function itemTitle(item: Record<string, Json>) {
	const { artist, track } = item

	if (typeof artist === 'string' && typeof track === 'string') return `${artist} — ${track}`

	for (const key of ['title', 'name', 'question', 'label']) {
		const value = item[key]

		if (typeof value === 'string') return value
	}

	return typeof item.id === 'string' ? item.id : ''
}

/**
 * Подпись поля по пути от его группы: «График · Линия клипов · Подпись». Элемент вложенного
 * списка называется своим заголовком («Цифры · «Прослушивания» · Число»), строка списка
 * строк — номером («Ключевое слово 3»).
 */
function fieldLabel(start: Json, relative: string[]) {
	const parts: string[] = []
	let node: Json = start

	for (const part of relative) {
		if (Array.isArray(node)) {
			const index = node.findIndex(
				(child, position) =>
					(isRecord(child) ? child.id : undefined) === part || String(position) === part
			)
			const child: Json = node[index]

			if (isRecord(child)) parts.push(`«${itemTitle(child)}»`)
			else parts[parts.length - 1] = `${parts.at(-1) ?? ''} ${index + 1}`.trim()

			node = child
			continue
		}

		parts.push(ADMIN_KEY_LABELS[part] ?? part)
		node = isRecord(node) ? node[part] : null
	}

	return parts.join(' · ')
}

function toAdminField(base: Record<string, Json>, field: TextField, current: string): AdminField {
	const start = field.owner ? field.owner.item : base[field.path[0]]
	const relative = field.path.slice(field.owner ? field.owner.depth : 1)

	return {
		key: field.key,
		label: fieldLabel(start, relative) || ADMIN_KEY_LABELS[field.path[0]] || field.path[0],
		value: current,
		original: field.value,
		multiline: current.length > MULTILINE_FROM || current.includes('\n')
	}
}

/** Форма админки: разделы в порядке страницы, внутри — группы по элементам списков */
export function buildAdminSections(base: unknown, overrides: ContentOverrides): AdminSection[] {
	const root = base as Record<string, Json>
	const fields = collectTextFields(base)
	// Раздел, который разработчик добавит в content.json позже, не пропадёт из админки
	const known = new Set(ADMIN_SECTIONS.map(section => section.id))
	const extra = [...new Set(fields.map(field => field.path[0]))]
		.filter(id => !known.has(id))
		.map(id => ({ id, title: id, hint: undefined }))

	return [...ADMIN_SECTIONS, ...extra]
		.map(({ id, title, hint }) => {
			const groups = new Map<string, AdminGroup>()
			let changed = 0

			for (const field of fields.filter(item => item.path[0] === id)) {
				const current = overrides[field.key] ?? field.value
				const groupId = field.owner ? field.path.slice(0, field.owner.depth).join('.') : id
				const group = groups.get(groupId) ?? {
					id: groupId,
					title: field.owner ? itemTitle(field.owner.item) : '',
					fields: []
				}

				group.fields.push(toAdminField(root, field, current))
				groups.set(groupId, group)

				if (current !== field.value) changed += 1
			}

			return { id, title, hint, groups: [...groups.values()], changed }
		})
		.filter(section => section.groups.length > 0)
}
