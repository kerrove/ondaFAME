import type { CaseChart } from '@/types'

interface Props {
	chart: CaseChart
	caption: string
}

/**
 * Те же цифры, что на графике, — таблицей. Canvas скринридеру недоступен, а таблица живёт
 * в серверной разметке: она есть до гидратации, без JS и независимо от того, загрузился ли
 * график вообще.
 */
export function ChartTable({ chart, caption }: Props) {
	return (
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
	)
}
