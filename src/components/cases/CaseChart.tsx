'use client'

import { CategoryScale, Chart, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { useReducedMotion } from 'framer-motion'
import { Line } from 'react-chartjs-2'

import styles from './Cases.module.scss'
import type { CaseChart as CaseChartData } from '@/types'
import { buildChartData, buildChartOptions, crosshair, readChartTheme } from '@/utils/chart'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

interface Props {
	chart: CaseChartData
}

/** Только canvas: подпись-таблица рисуется на сервере и живёт в разметке независимо от чанка. */
export function CaseChart({ chart }: Props) {
	const reduced = useReducedMotion()
	// Компонент грузится только в браузере (ssr: false), поэтому document доступен на первом рендере
	const theme = readChartTheme()

	return (
		<div className={styles.canvas}>
			<Line
				data={buildChartData(chart, theme)}
				options={buildChartOptions(reduced ?? false, theme)}
				plugins={[crosshair(theme)]}
				aria-hidden='true'
			/>
		</div>
	)
}
