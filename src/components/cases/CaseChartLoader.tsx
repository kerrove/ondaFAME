'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

import styles from './Cases.module.scss'
import { useNearViewport } from '@/hooks/useNearViewport'
import type { CaseChart as CaseChartData } from '@/types'

/**
 * chart.js весит больше всей остальной страницы и всегда лежит ниже первого экрана, поэтому
 * грузится отдельным чанком, только в браузере и только когда секция подходит к экрану.
 * Без последнего условия компонент монтируется сразу после гидратации и тянет чанк даже
 * у тех, кто до кейса не доскроллил.
 */
const CaseChart = dynamic(() => import('./CaseChart').then(mod => mod.CaseChart), {
	ssr: false,
	loading: () => <ChartSkeleton />
})

/**
 * Пустая сетка на месте графика. Скринридеру объявлять нечего: те же цифры лежат рядом
 * таблицей и доступны с самого начала, поэтому заглушка — чистая декорация.
 */
function ChartSkeleton() {
	return (
		<div
			className={styles.chartSkeleton}
			aria-hidden='true'
		/>
	)
}

interface Props {
	chart: CaseChartData
	/** Таблица с теми же данными: приходит из серверного компонента и живёт без JS */
	children: ReactNode
}

export function CaseChartLoader({ chart, children }: Props) {
	// Наблюдаем за местом графика: у заглушки та же высота, поэтому подмена не сдвигает вёрстку
	const { ref, near } = useNearViewport<HTMLDivElement>()

	return (
		<figure className={styles.chart}>
			<div ref={ref}>{near ? <CaseChart chart={chart} /> : <ChartSkeleton />}</div>
			{children}
		</figure>
	)
}
