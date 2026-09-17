'use client'

import { ArrowUp } from 'lucide-react'

import styles from './ListenersPlaque.module.scss'
import { LISTENERS_LABEL, LISTENER_STEPS, formatListeners } from '@/constants/listeners'
import { useListenersTicker } from '@/hooks/useListenersTicker'
import { Odometer } from '@/ui/odometer/Odometer'

/** Подпись для скринридера собирается из тех же ступеней, что крутит табло */
const RANGE = `от ${LISTENER_STEPS[0]} до ${formatListeners(LISTENER_STEPS[LISTENER_STEPS.length - 1])}`

/**
 * Табло первого экрана: счётчик ежемесячных слушателей идёт по кругу от первых слушателей
 * к миллионам. Для скринридера это один объект с постоянной подписью — разряды, меняющиеся
 * каждые две секунды, озвучивать нечего.
 */
export function ListenersPlaque() {
	const { value, previous, revision } = useListenersTicker()

	return (
		<div
			className={styles.gauge}
			role='img'
			aria-label={`Счётчик роста: ${RANGE} ${LISTENERS_LABEL}`}
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
				<span className={styles.label}>{LISTENERS_LABEL}</span>
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
