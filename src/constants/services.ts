import type { Service, SiteContent } from '@/types'

/**
 * {year} в описании подставляется текущим годом, чтобы текст не устаревал каждый январь.
 * Страница статическая, поэтому год берётся в момент рендера — на сборке или после сохранения
 * в админке.
 */
function withYear(text: string) {
	return text.replaceAll('{year}', String(new Date().getFullYear()))
}

/** Порядок услуг задан владельцем и совпадает с порядком в content.json. */
export function getServices(content: SiteContent): Service[] {
	return content.services.items.map(service => ({
		...service,
		description: withYear(service.description)
	}))
}
