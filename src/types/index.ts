export type ServiceIcon =
	| 'producing'
	| 'bloggers'
	| 'smm'
	| 'target'
	| 'tiktok-ads'
	| 'seo'
	| 'charts'
	| 'turnkey'
	| 'seeding'
	| 'massposting'

export type HeroBadgeId = 'mbw' | 'guarantee' | 'reporting'

export interface Service {
	/** Он же ключ иконки: список услуг и набор иконок совпадают один в один */
	id: ServiceIcon
	title: string
	description: string
}

interface HeroBadge {
	id: HeroBadgeId
	label: string
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
	/** Заголовок столбца оси X в таблице. Без него — общий «Месяц» из cases.chartMonthColumn. */
	column?: string
	/** Хвост подписи таблицы. Без него — общий «рост по месяцам» из cases.chartCaption. */
	caption?: string
	/** Подписи оси X — месяцы кампании или звуки трека */
	labels: string[]
	/** Может отсутствовать: у части кейсов владелец передал только клипы */
	listeners?: CaseSeries
	clips: CaseSeries
}

/** Текстовая часть кейса — ровно то, что лежит в content.json */
interface CaseContent {
	id: string
	artist: string
	track: string
	tag: string
	/** Главный кейс агентства: карточка получает акцентную рамку и плашку featuredLabel */
	featured?: boolean
	/** Ссылка на звук трека в TikTok */
	tiktok?: string
	description: string
	metrics: CaseMetric[]
	/** Может отсутствовать: владелец передал только итоговые цифры, без разбивки для графика */
	chart?: CaseChart
}

export interface CaseStudy extends CaseContent {
	/** Обложка релиза в /public. null — артворк ещё не передан, рисуем инициалы. */
	cover: string | null
}

/** Текстовая часть карточки сотрудника — ровно то, что лежит в content.json */
interface TeamMemberContent {
	id: string
	name: string
	role: string
}

export interface TeamMember extends TeamMemberContent {
	/** Путь к фото в /public. null — фото ещё не передано, рисуем инициалы. */
	photo: string | null
}

export interface FaqItem {
	id: string
	question: string
	answer: string
}

interface NavLink {
	href: string
	label: string
}

export type AggregatorId =
	'vk-music' | 'yandex-music' | 'spotify' | 'apple-music' | 'zvonko' | 'tiktok'

export interface Aggregator {
	id: AggregatorId
	name: string
	/** Оптическая высота знака в rem: у знаков разная плотность, одинаковая высота их ломает */
	height: number
}

export interface CtaBandContent {
	id: string
	/** Первая половина заголовка — белая: обстоятельство */
	lead: string
	/** Вторая половина — акцентная: обещание */
	accent: string
	text: string
}

/**
 * Форма content.json — единственного файла, в котором живут все видимые тексты сайта.
 *
 * В нём нет ни путей к картинкам, ни имён иконок, ни таймингов: всё это остаётся в TS и
 * приклеивается к текстам по id в src/constants. Правка текста не должна требовать знания о том,
 * какая иконка или какой файл стоит рядом.
 */
export interface SiteContent {
	brand: {
		/** Логотип разрезан по начертанию: «onda» белым, «FAME» фиолетовым */
		wordmarkLight: string
		wordmarkAccent: string
		fullName: string
		legalName: string
		tagline: string
		description: string
		slogan: string
	}
	contacts: {
		address: string
		phone: string
		phoneHref: string
		email: string
		/** Куда ведут все кнопки «Связаться с нами». Исходное значение — из NEXT_PUBLIC_TELEGRAM_URL. */
		telegramUrl: string
	}
	cta: {
		label: string
		note: string
	}
	nav: NavLink[]
	a11y: {
		skipLink: string
		logoHome: string
		headerNav: string
		footerNav: string
		aggregators: string
		carouselPrev: string
		carouselNext: string
	}
	metadata: {
		keywords: string[]
	}
	hero: {
		title: string
		lead: string
		scrollCue: string
		badges: HeroBadge[]
		listeners: {
			/** Ступени счётчика: путь артиста от первых слушателей до миллионов */
			steps: number[]
			label: string
			/** Подпись для скринридера. {from}, {to} и {label} подставляются из соседних полей. */
			ariaLabel: string
		}
	}
	aggregators: { id: AggregatorId; name: string }[]
	services: {
		/** Имя списка для микроразметки ItemList */
		schemaName: string
		title: string
		label: string
		items: Service[]
	}
	cases: {
		schemaName: string
		title: string
		description: string
		label: string
		/** «Кейс» перед именем артиста в заголовке карточки */
		cardPrefix: string
		/** Хвост подписи к таблице под графиком */
		chartCaption: string
		chartMonthColumn: string
		/** Плашка над главным кейсом */
		featuredLabel: string
		/** Подпись ссылки на звук в TikTok */
		tiktokLabel: string
		items: CaseContent[]
	}
	quote: {
		lead: string
		accent: string
		author: string
		/** Где это было сказано. Для цитаты своего артиста не нужен: рядом его фото и имя. */
		source?: string
	}
	ctaBands: {
		pricing: CtaBandContent
		final: CtaBandContent
	}
	team: {
		schemaName: string
		title: string
		description: string
		label: string
		members: TeamMemberContent[]
	}
	faq: {
		title: string
		description: string
		items: FaqItem[]
	}
	footer: {
		telegram: string
	}
	notFound: {
		metaTitle: string
		code: string
		title: string
		text: string
		homeAction: string
	}
}
