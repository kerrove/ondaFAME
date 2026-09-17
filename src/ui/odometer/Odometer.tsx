import clsx from 'clsx'
import type { CSSProperties } from 'react'

import styles from './Odometer.module.scss'
import { fieldWidth, isSeparator, placeOffset, placeWidth, spinFaces } from '@/utils/odometer'

interface Props {
	/** Текущее значение, уже отформатированное по разрядам */
	value: string
	/** Предыдущее значение: с него раскручиваются барабаны */
	previous: string
	/** Номер шага. Меняется вместе со значением и перезапускает прокрутку. */
	revision: number
	className?: string
}

/** Сдвиг старта между разрядами: старшие останавливаются первыми, младшие докручивают */
const STAGGER = 0.055

/**
 * Табло с барабанами: каждый меняющийся разряд прокручивается через несколько цифр и
 * останавливается на новой, знаки подаются сверху. Поле по ширине равно числу и плавно
 * расширяется, когда разрядов становится больше.
 */
export function Odometer({ value, previous, revision, className }: Props) {
	// Нумерация справа налево: у одного и того же разряда один ключ при любой длине числа
	const next = [...value].reverse()
	const past = [...previous].reverse()
	const places = Math.max(next.length, past.length)
	/*
	 * В разметку разряды уходят слева направо, как читается число: место каждого задаёт отступ
	 * справа, а не порядок в потоке. Иначе выделение и копирование числа дают его задом наперёд.
	 */
	const order = Array.from({ length: places }, (_, index) => places - 1 - index)

	return (
		<span
			className={clsx(styles.odometer, className)}
			style={{ '--field': fieldWidth(value) } as CSSProperties}
		>
			{order.map(place => {
				const char = next[place] ?? ''
				const before = past[place] ?? ''

				if (char === '' && before === '') return null

				const box = {
					'--offset': placeOffset(place),
					'--size': placeWidth(place)
				} as CSSProperties

				// Разделитель разрядов не крутится: его проявляет само расширение поля
				if (char === before || isSeparator(place)) {
					return (
						<span
							key={place}
							className={styles.place}
							style={box}
						>
							<span className={styles.face}>{char}</span>
						</span>
					)
				}

				const faces = spinFaces(before, char)

				return (
					<span
						key={place}
						className={styles.place}
						style={box}
					>
						<span
							key={revision}
							className={styles.reel}
							style={
								{
									'--travel': faces.length - 1,
									'--delay': `${(places - 1 - place) * STAGGER}s`
								} as CSSProperties
							}
						>
							{faces.map((face, index) => (
								<span
									key={index}
									className={styles.face}
								>
									{face}
								</span>
							))}
						</span>
					</span>
				)
			})}
		</span>
	)
}
