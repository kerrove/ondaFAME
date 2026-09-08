import clsx from 'clsx'
import Image from 'next/image'

import styles from './Avatar.module.scss'

interface Props {
	name: string
	src: string | null
	size: number
	/**
	 * square — плитка портрета, circle — аватар профиля, tile — обложка релиза,
	 * plain — своего скругления нет: кадр обрезает родительская оправа.
	 */
	shape?: 'square' | 'circle' | 'tile' | 'plain'
	className?: string
	/** Портрет уже подписан именем рядом — от скринридера его прячем */
	decorative?: boolean
}

function initials(name: string) {
	return name
		.split(' ')
		.slice(0, 2)
		.map(part => part.charAt(0))
		.join('')
		.toUpperCase()
}

/** Пока реальное фото не передано, рисуем инициалы фирменной плиткой — не серую заглушку. */
export function Avatar({ name, src, size, shape = 'square', className, decorative }: Props) {
	const classes = clsx(styles.avatar, styles[shape], className)

	if (src) {
		return (
			<Image
				className={classes}
				src={src}
				alt={decorative ? '' : name}
				width={size}
				height={size}
				sizes={`${size}px`}
			/>
		)
	}

	return (
		<span
			className={clsx(classes, styles.fallback)}
			// size — потолок, а не фиксированная ширина: в узкой колонке плитка ужимается
			style={{ maxWidth: size, fontSize: Math.round(size * 0.26) }}
			role={decorative ? undefined : 'img'}
			aria-label={decorative ? undefined : name}
			aria-hidden={decorative ? 'true' : undefined}
		>
			{initials(name)}
		</span>
	)
}
