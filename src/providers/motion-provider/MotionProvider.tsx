'use client'

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

/**
 * Единственная точка загрузки движка анимаций. domAnimation подгружается лениво, поэтому в
 * начальный бандл попадает только маленький рантайм, а не весь framer-motion.
 *
 * strict запрещает компонент motion.* — во всём проекте используется только m.* из
 * 'framer-motion/m', иначе ленивая загрузка теряет смысл.
 *
 * reducedMotion='user' обязателен: глобальное CSS-правило гасит только CSS-анимации, а
 * движение, которое считает JS, надо гасить здесь. Framer обнуляет сдвиг и масштаб,
 * оставляя прозрачность, — это и есть корректное поведение по WCAG.
 */
export function MotionProvider({ children }: Props) {
	return (
		<LazyMotion
			features={domAnimation}
			strict
		>
			<MotionConfig reducedMotion='user'>{children}</MotionConfig>
		</LazyMotion>
	)
}
