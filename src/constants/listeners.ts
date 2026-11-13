import type { SiteContent } from '@/types'

/** Пауза между ступенями. Меньше двух секунд — цифру не успеваешь прочитать. */
export const LISTENER_STEP_MS = 2600

/** Тонкая шпация: разряды разделены, но число не распадается на три отдельных */
const THIN_SPACE = ' '

/** 2300000 → «2 300 000»: разряды по три знака справа налево */
export function formatListeners(value: number) {
	return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, THIN_SPACE)
}

/**
 * Табло первого экрана: ступени счётчика — путь артиста от первых слушателей до миллионов,
 * цикл замкнут. Подпись для скринридера — шаблон из content.json, границы — из тех же ступеней.
 */
export function getListeners(content: SiteContent) {
	const { steps, label, ariaLabel } = content.hero.listeners

	return {
		steps,
		label,
		ariaLabel: ariaLabel
			.replace('{from}', formatListeners(steps[0]))
			.replace('{to}', formatListeners(steps[steps.length - 1]))
			.replace('{label}', label)
	}
}
