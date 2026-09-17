'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Сообщает, подошёл ли элемент к экрану. Нужен там, где тяжёлый чанк не должен попадать в
 * первую загрузку: пока блок далеко, он не грузится вовсе.
 *
 * Запас по умолчанию — целый экран с лишним. Он взят намеренно: если ждать появления блока
 * в кадре, экономия на загрузке превратится в ожидание на месте. Наблюдатель отключается
 * сразу после срабатывания — следить больше не за чем.
 */
export function useNearViewport<T extends HTMLElement>(rootMargin = '600px 0px') {
	const ref = useRef<T | null>(null)
	const [near, setNear] = useState(false)

	useEffect(() => {
		const node = ref.current

		if (!node) return

		const observer = new IntersectionObserver(
			entries => {
				if (entries.some(entry => entry.isIntersecting)) {
					setNear(true)
					observer.disconnect()
				}
			},
			{ rootMargin }
		)

		observer.observe(node)

		return () => observer.disconnect()
	}, [rootMargin])

	return { ref, near }
}
