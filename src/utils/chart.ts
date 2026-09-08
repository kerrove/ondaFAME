import type { ChartData, Chart as ChartInstance, ChartOptions, Plugin } from 'chart.js'

import type { CaseChart } from '@/types'

/** Canvas не понимает CSS-переменные, поэтому палитра читается из :root один раз при монтировании. */
const FALLBACK_FONT = "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"

export interface ChartTheme {
	font: string
	accent: string
	/** Светлая ступень акцента — значение в тултипе лежит на приподнятой панели, ядру там темно */
	accentText: string
	cyan: string
	grid: string
	tick: string
	panel: string
	hairline: string
}

export function readChartTheme(): ChartTheme {
	const root = getComputedStyle(document.documentElement)
	const token = (name: string, fallback: string) => root.getPropertyValue(name).trim() || fallback

	return {
		font: getComputedStyle(document.body).fontFamily || FALLBACK_FONT,
		accent: token('--accent', '#8b5cf6'),
		accentText: token('--accent-text', '#c4a2ff'),
		cyan: token('--data-cyan', '#22d3ee'),
		grid: token('--grid-line-chart', 'rgba(167, 139, 250, 0.09)'),
		tick: token('--faint', '#95909f'),
		panel: token('--panel-raised', '#150d20'),
		hairline: token('--hairline-strong', 'rgba(196, 162, 255, 0.22)')
	}
}

const compact = new Intl.NumberFormat('ru-RU', { notation: 'compact', maximumFractionDigits: 1 })
const full = new Intl.NumberFormat('ru-RU')

/** Вертикальная линия через наведённую точку — как на осциллографе. */
export function crosshair(theme: ChartTheme): Plugin<'line'> {
	return {
		id: 'crosshair',
		afterDatasetsDraw(chart: ChartInstance) {
			const active = chart.tooltip?.getActiveElements?.()
			if (!active?.length) return

			const { ctx, chartArea } = chart
			const x = active[0].element.x

			ctx.save()
			ctx.beginPath()
			ctx.moveTo(x, chartArea.top)
			ctx.lineTo(x, chartArea.bottom)
			ctx.lineWidth = 1
			ctx.strokeStyle = theme.hairline
			ctx.stroke()
			ctx.restore()
		}
	}
}

export function buildChartData(chart: CaseChart, theme: ChartTheme): ChartData<'line'> {
	const line = (color: string, axis: string) => ({
		borderColor: color,
		backgroundColor: color,
		borderWidth: 2.5,
		tension: 0.42,
		pointRadius: 0,
		pointHoverRadius: 5,
		pointHoverBorderWidth: 2,
		pointHoverBorderColor: '#000000',
		yAxisID: axis
	})

	return {
		labels: chart.labels,
		datasets: [
			{
				label: chart.listeners.label,
				data: chart.listeners.data,
				...line(theme.accent, 'listeners')
			},
			{ label: chart.clips.label, data: chart.clips.data, ...line(theme.cyan, 'clips') }
		]
	}
}

export function buildChartOptions(reducedMotion: boolean, theme: ChartTheme): ChartOptions<'line'> {
	const axisTicks = {
		color: theme.tick,
		font: { family: theme.font, size: 12 },
		maxTicksLimit: 5,
		callback: (value: string | number) => compact.format(Number(value))
	}

	return {
		responsive: true,
		maintainAspectRatio: false,
		animation: reducedMotion ? false : { duration: 1100, easing: 'easeOutQuart' },
		interaction: { mode: 'index', intersect: false },
		layout: { padding: { top: 8 } },
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: theme.panel,
				borderColor: theme.hairline,
				borderWidth: 1,
				cornerRadius: 12,
				padding: 12,
				titleColor: '#ffffff',
				titleFont: { family: theme.font, size: 13, weight: 600 },
				bodyFont: { family: theme.font, size: 13 },
				bodySpacing: 6,
				displayColors: false,
				callbacks: {
					label: context => `${context.dataset.label}: ${full.format(context.parsed.y ?? 0)}`,
					// Значение красится в цвет своей линии — легенды нет, различать надо здесь
					labelTextColor: context => (context.datasetIndex === 0 ? theme.accentText : theme.cyan)
				}
			}
		},
		scales: {
			x: {
				grid: { color: theme.grid },
				border: { display: false },
				ticks: { color: theme.tick, font: { family: theme.font, size: 12 } }
			},
			listeners: {
				type: 'linear',
				position: 'left',
				grid: { color: theme.grid },
				border: { display: false },
				ticks: axisTicks
			},
			clips: {
				type: 'linear',
				position: 'right',
				// Своя вершина шкалы: без неё обе кривые нормализуются одинаково и сливаются в одну
				suggestedMax: 200_000,
				grid: { display: false },
				border: { display: false },
				ticks: axisTicks
			}
		}
	}
}
