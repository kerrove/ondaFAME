'use client'

import type { Variants } from 'framer-motion'
import * as m from 'framer-motion/m'
import type { ReactNode } from 'react'

type Motion = 'rise' | 'settle'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Задержка каскада живёт внутри варианта и берётся из custom: transition, заданный в варианте,
 * полностью замещает одноимённый проп, поэтому снаружи передавать его бесполезно.
 */

/** Текстовые блоки — заголовки, абзацы, призывы: подъём со снятием размытия. */
const rise: Variants = {
	hidden: { opacity: 0, y: 26, filter: 'blur(5px)' },
	shown: (index: number = 0) => ({
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: { duration: 0.65, ease: EASE, delay: Math.min(index, 5) * 0.08 }
	})
}

/** Карточки и портреты: короткое оседание с масштабом. */
const settle: Variants = {
	hidden: { opacity: 0, y: 18, scale: 0.97 },
	shown: (index: number = 0) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.55, ease: EASE, delay: Math.min(index, 5) * 0.08 }
	})
}

const VARIANTS: Record<Motion, Variants> = { rise, settle }

interface Props {
	children: ReactNode
	/** rise — для текста, settle — для карточек */
	motion?: Motion
	className?: string
	/** Позиция в ряду: задаёт ступень каскада */
	index?: number
	as?: 'div' | 'li' | 'header' | 'footer'
	itemProp?: string
	itemScope?: boolean
	itemType?: string
}

const TAGS = { div: m.div, li: m.li, header: m.header, footer: m.footer }

export function Reveal({
	children,
	motion = 'rise',
	className,
	index = 0,
	as = 'div',
	...rest
}: Props) {
	const Tag = TAGS[as]

	return (
		<Tag
			data-reveal=''
			className={className}
			variants={VARIANTS[motion]}
			custom={index}
			initial='hidden'
			whileInView='shown'
			viewport={{ once: true, amount: 0.25 }}
			{...rest}
		>
			{children}
		</Tag>
	)
}
