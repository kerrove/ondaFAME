'use client'

import { useEffect, useRef, useState } from 'react'

interface Carousel {
	trackRef: React.RefObject<HTMLUListElement | null>
	canPrev: boolean
	canNext: boolean
	scrollPrev: () => void
	scrollNext: () => void
}

/**
 * Карусель на нативном скролле со scroll-snap: свайп, колесо и клавиатура работают сами,
 * стрелки лишь дублируют жест. Прокручивается сам ul: он же и грид, поэтому проценты в
 * grid-auto-columns считаются от видимой ширины, а колонки переполняют её, а не сжимаются.
 */
export function useCarousel(): Carousel {
	const trackRef = useRef<HTMLUListElement | null>(null)
	const [canPrev, setCanPrev] = useState(false)
	const [canNext, setCanNext] = useState(false)

	useEffect(() => {
		const track = trackRef.current
		if (!track) return

		const sync = () => {
			const max = track.scrollWidth - track.clientWidth
			setCanPrev(track.scrollLeft > 1)
			setCanNext(track.scrollLeft < max - 1)
		}

		sync()
		track.addEventListener('scroll', sync, { passive: true })

		const observer = new ResizeObserver(sync)
		observer.observe(track)

		return () => {
			track.removeEventListener('scroll', sync)
			observer.disconnect()
		}
	}, [])

	const step = (direction: 1 | -1) => {
		const track = trackRef.current
		if (!track) return

		const item = track.firstElementChild as HTMLElement | null
		const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0
		const distance = item ? item.offsetWidth + gap : track.clientWidth * 0.8

		track.scrollBy({ left: distance * direction, behavior: 'smooth' })
	}

	return {
		trackRef,
		canPrev,
		canNext,
		scrollPrev: () => step(-1),
		scrollNext: () => step(1)
	}
}
