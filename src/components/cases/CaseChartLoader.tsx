'use client'

import dynamic from 'next/dynamic'

import styles from './Cases.module.scss'
import type { CaseChart as CaseChartData } from '@/types'

/**
 * chart.js весит больше всей остальной страницы и всегда лежит ниже первого экрана,
 * поэтому грузится отдельным чанком и только в браузере.
 */
const CaseChart = dynamic(() => import('./CaseChart').then(mod => mod.CaseChart), {
	ssr: false,
	loading: () => (
		<div
			className={styles.chartSkeleton}
			role='status'
			aria-label='График загружается'
		/>
	)
})

interface Props {
	chart: CaseChartData
	caption: string
}

export function CaseChartLoader({ chart, caption }: Props) {
	return (
		<CaseChart
			chart={chart}
			caption={caption}
		/>
	)
}
