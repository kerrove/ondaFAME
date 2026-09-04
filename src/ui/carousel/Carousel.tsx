'use client'

import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './Carousel.module.scss'
import { useCarousel } from '@/hooks/useCarousel'
import { CarouselControls } from '@/ui/carousel-controls/CarouselControls'
import { SectionHeading } from '@/ui/section-heading/SectionHeading'

interface Props {
	id: string
	headingId: string
	title: ReactNode
	description?: string
	/** Человекочитаемое имя ленты для подписей стрелок и прокручиваемой области */
	label: string
	listClassName?: string
	children: ReactNode
}

/**
 * Умная обёртка ленты: владеет прокруткой и состоянием стрелок, но не знает, что внутри.
 * Карточки приходят из серверного компонента через children и остаются серверными.
 *
 * Прокручивается сам список: он же и грид, поэтому проценты в grid-auto-columns считаются от
 * ширины видимой области, а колонки переполняют её вместо того, чтобы сжиматься. Роль списка
 * при этом не переопределяется — aria-label на ul допустим и сохраняет связь ul → li.
 */
export function Carousel({
	id,
	headingId,
	title,
	description,
	label,
	listClassName,
	children
}: Props) {
	const { trackRef, canPrev, canNext, scrollPrev, scrollNext } = useCarousel()

	return (
		<>
			<SectionHeading
				id={headingId}
				title={title}
				description={description}
				aside={
					<CarouselControls
						controls={id}
						label={label}
						canPrev={canPrev}
						canNext={canNext}
						onPrev={scrollPrev}
						onNext={scrollNext}
					/>
				}
			/>

			<ul
				id={id}
				ref={trackRef}
				className={clsx(styles.track, listClassName)}
				aria-label={label}
				tabIndex={0}
			>
				{children}
			</ul>
		</>
	)
}
