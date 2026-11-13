'use client'

import { ArrowUp } from 'lucide-react'

import styles from './ListenersPlaque.module.scss'
import { formatListeners } from '@/constants/listeners'
import { useListenersTicker } from '@/hooks/useListenersTicker'
import { Odometer } from '@/ui/odometer/Odometer'

/**
 * Табло первого экрана: счётчик ежемесячных слушателей идёт по кругу от первых слушателей
 * к миллионам. Для скринридера это один объект с постоянной подписью — разряды, меняющиеся
 * каждые две секунды, озвучивать нечего.
 */
interface Props {
	steps: number[]
	label: string
	ariaLabel: string
}

export function ListenersPlaque({ steps, label, ariaLabel }: Props) {
	const { value, previous, revision } = useListenersTicker(steps)

	return (
		<div
			className={styles.gauge}
			role='img'
			aria-label={ariaLabel}
		>
			<p className={styles.plaque}>
				{/* Импульс по верхней кромке в момент шага: прибор отмечает скачок */}
				<span
					key={revision}
					className={styles.spark}
					aria-hidden='true'
				/>

				<Odometer
					className={styles.value}
					value={formatListeners(value)}
					previous={formatListeners(previous)}
					revision={revision}
				/>
				<span className={styles.label}>{label}</span>
			</p>

			<span
				className={styles.trend}
				aria-hidden='true'
			>
				<ArrowUp
					size={20}
					strokeWidth={2.5}
				/>
			</span>
		</div>
	)
}
