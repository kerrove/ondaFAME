import type { Aggregator, AggregatorId, SiteContent } from '@/types'

/**
 * Оптическая высота знака в rem. Это не текст, а подгонка под конкретный контур: у знаков разная
 * плотность, одинаковая высота их ломает. Поэтому живёт рядом с кодом, а не в content.json.
 */
const HEIGHTS: Record<AggregatorId, number> = {
	'vk-music': 1.5,
	'yandex-music': 1.6,
	spotify: 1.55,
	'apple-music': 1.5,
	zvonko: 1.15,
	tiktok: 1.45
}

/**
 * Площадки, на которых измеряется результат кампании. Лента бесконечная, поэтому порядок
 * задаёт только ритм: широкие знаки чередуются с узкими.
 */
export function getAggregators(content: SiteContent): Aggregator[] {
	return content.aggregators.map(item => ({
		...item,
		height: HEIGHTS[item.id]
	}))
}
