import type { Aggregator } from '@/types'

/**
 * Площадки, на которых измеряется результат кампании. Лента бесконечная, поэтому порядок
 * задаёт только ритм: широкие знаки чередуются с узкими.
 */
export const AGGREGATORS: Aggregator[] = [
	{ id: 'vk-music', name: 'ВК Музыка', height: 1.5 },
	{ id: 'yandex-music', name: 'Яндекс Музыка', height: 1.6 },
	{ id: 'spotify', name: 'Spotify', height: 1.55 },
	{ id: 'apple-music', name: 'Apple Music', height: 1.5 },
	{ id: 'zvonko', name: 'Звонко', height: 1.15 },
	{ id: 'tiktok', name: 'TikTok', height: 1.45 }
]
