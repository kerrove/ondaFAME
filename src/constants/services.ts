import type { HeroBadge, Service } from '@/types'

export const HERO_BADGES: HeroBadge[] = [
	{ id: 'mbw', label: 'Лучшее агентство 2025 года по рейтингу MBW', icon: 'award' },
	{ id: 'guarantee', label: 'Гарантия результата', icon: 'shield' },
	{ id: 'reporting', label: 'Официальная отчётность', icon: 'report' }
]

/**
 * Подтверждены три услуги. Карусель рассчитана на произвольное количество — новые услуги
 * добавляются сюда, вёрстку менять не нужно.
 */
export const SERVICES: Service[] = [
	{
		id: 'producing',
		title: 'Продюсирование',
		description:
			'Стратегия для артиста: образ, контент, релизы, промо, площадки и команда. Полный go-to-market цикл.',
		icon: 'producing'
	},
	{
		id: 'bloggers',
		title: 'Продвижение у блогеров',
		description:
			'Подбираем блогеров и лидеров мнений так, чтобы продвижение было органичным, нацеленным на вашу ЦА и приносило реальный результат.',
		icon: 'bloggers'
	},
	{
		id: 'smm',
		title: 'SMM и контент-продакшн',
		description:
			'Создаём контент и ведём соцсети не просто «красиво», а так, чтобы это было эффективно и приносило реальную пользу.',
		icon: 'smm'
	}
]
