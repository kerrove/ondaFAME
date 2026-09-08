export type ServiceIcon = 'producing' | 'bloggers' | 'smm'

export type BadgeIcon = 'award' | 'shield' | 'report'

export interface Service {
	id: string
	title: string
	description: string
	icon: ServiceIcon
}

export interface HeroBadge {
	id: string
	label: string
	icon: BadgeIcon
}

interface CaseMetric {
	id: string
	value: string
	label: string
}

interface CaseSeries {
	/** Подпись серии в легенде и тултипе */
	label: string
	/** Значения по точкам оси X, в том же порядке, что и labels */
	data: number[]
	/** К какой оси привязана серия: слушатели слева, клипы справа */
	axis: 'left' | 'right'
}

export interface CaseChart {
	/** Подписи оси X — месяцы кампании */
	labels: string[]
	listeners: CaseSeries
	clips: CaseSeries
}

export interface CaseStudy {
	id: string
	artist: string
	track: string
	tag: string
	description: string
	/** Обложка релиза в /public. null — артворк ещё не передан, рисуем инициалы. */
	cover: string | null
	metrics: CaseMetric[]
	chart: CaseChart
}

export interface TeamMember {
	id: string
	name: string
	role: string
	/** Путь к фото в /public. null — фото ещё не передано, рисуем инициалы. */
	photo: string | null
}

export interface FaqItem {
	id: string
	question: string
	answer: string
}

export interface NavLink {
	href: string
	label: string
}
