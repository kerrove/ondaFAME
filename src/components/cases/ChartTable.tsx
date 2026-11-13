import type { CaseChart } from '@/types'

interface Props {
	chart: CaseChart
	caption: string
	/** Заголовок столбца оси X, если у графика нет своего */
	defaultColumn: string
}

/**
 * Те же цифры, что на графике, — таблицей. Canvas скринридеру недоступен, а таблица живёт
 * в серверной разметке: она есть до гидратации, без JS и независимо от того, загрузился ли
 * график вообще.
 */
export function ChartTable({ chart, caption, defaultColumn }: Props) {
	const series = chart.listeners ? [chart.listeners, chart.clips] : [chart.clips]

	return (
		<figcaption className='visually-hidden'>
			<table>
				<caption>{caption}</caption>
				<thead>
					<tr>
						<th scope='col'>{chart.column ?? defaultColumn}</th>
						{series.map(item => (
							<th
								key={item.label}
								scope='col'
							>
								{item.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{chart.labels.map((label, index) => (
						<tr key={label}>
							<th scope='row'>{label}</th>
							{series.map(item => (
								<td key={item.label}>{item.data[index].toLocaleString('ru-RU')}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</figcaption>
	)
}
