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
	caption: string
}

export function CaseChart({ chart, caption }: Props) {
	const reduced = useReducedMotion()
	// Компонент грузится только в браузере (ssr: false), поэтому document доступен на первом рендере
	const theme = readChartTheme()

	return (
		<figure className={styles.chart}>
			<div className={styles.canvas}>
				<Line
					data={buildChartData(chart, theme)}
					options={buildChartOptions(reduced ?? false, theme)}
					plugins={[crosshair(theme)]}
					aria-hidden='true'
				/>
			</div>

			{/* Canvas недоступен скринридеру — те же данные дублируются таблицей */}
			<figcaption className='visually-hidden'>
				<table>
					<caption>{caption}</caption>
					<thead>
						<tr>
							<th scope='col'>Месяц</th>
							<th scope='col'>{chart.listeners.label}</th>
							<th scope='col'>{chart.clips.label}</th>
						</tr>
					</thead>
					<tbody>
						{chart.labels.map((label, index) => (
							<tr key={label}>
								<th scope='row'>{label}</th>
								<td>{chart.listeners.data[index].toLocaleString('ru-RU')}</td>
								<td>{chart.clips.data[index].toLocaleString('ru-RU')}</td>
							</tr>
						))}
					</tbody>
				</table>
			</figcaption>
		</figure>
	)
}
