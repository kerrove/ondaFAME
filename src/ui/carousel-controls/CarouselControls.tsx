'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './CarouselControls.module.scss'

interface Props {
	/** id прокручиваемой ленты — связывает кнопки с областью, которой они управляют */
	controls: string
	label: string
	canPrev: boolean
	canNext: boolean
	onPrev: () => void
	onNext: () => void
}

export function CarouselControls({ controls, label, canPrev, canNext, onPrev, onNext }: Props) {
	// Лента помещается целиком — управлять нечем. Место в разметке сохраняем, чтобы
	// заголовок не прыгал после гидратации, но мёртвых кнопок не показываем.
	const inert = !canPrev && !canNext

	return (
		<div
			className={styles.controls}
			data-inert={inert}
			aria-hidden={inert ? 'true' : undefined}
		>
			<button
				type='button'
				className={styles.arrow}
				onClick={onPrev}
				disabled={!canPrev}
				aria-controls={controls}
				aria-label={`${label}: назад`}
			>
				<ChevronLeft
					size={20}
					aria-hidden='true'
				/>
			</button>
			<button
				type='button'
				className={styles.arrow}
				onClick={onNext}
				disabled={!canNext}
				aria-controls={controls}
				aria-label={`${label}: вперёд`}
			>
				<ChevronRight
					size={20}
					aria-hidden='true'
				/>
			</button>
		</div>
	)
}
