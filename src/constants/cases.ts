import { ImagesConfig } from '@/configs/images.config'
import type { CaseStudy, SiteContent } from '@/types'

/** Обложка релиза подклеивается к кейсу по id: путь к файлу — не текст. */
const COVERS: Record<string, string | undefined> = {
	'smazzi-noter-dame-de-paris': ImagesConfig.NOTER_DAME,
	'horoshiyagni-plohoy': ImagesConfig.SONG
}

/**
 * Кейс smazzi — «noter dame de paris», первый и главный проект агентства, поэтому идёт первым.
 *
 * Подтверждено владельцем: пять звуков (обычная версия, slowed и другие), под каждым от 30 000
 * до 80 000 клипов. Помесячный рост клипов на графике — иллюстрация по просьбе владельца, не
 * выгрузка из отчёта; данных по слушателям нет, поэтому серии listeners у кейса нет.
 *
 * Кейс HOROSHIYAGNI — «Плохой».
 *
 * Подтверждённые владельцем точки: старт в декабре — 50 000 слушателей, финал в апреле —
 * 1 500 000 слушателей и более 100 000 клипов; контрольная точка марта — 900 000 слушателей и
 * 55 000 клипов. Значения января и февраля интерполированы по кривой между подтверждёнными
 * точками и подлежат замене на выгрузку из отчёта — цифры лежат в content.json.
 *
 * Кейс TAGADEMAR — шесть роликов в TikTok Ads, без конкретного трека. Итоги из отчёта
 * владельца: 807 298 просмотров, из них 592 638 рекламных. Разбивки по роликам пока нет,
 * поэтому графика у кейса нет; обложки нет — рисуются инициалы.
 */
export function getCases(content: SiteContent): CaseStudy[] {
	return content.cases.items.map(item => ({
		...item,
		cover: COVERS[item.id] ?? null
	}))
}
