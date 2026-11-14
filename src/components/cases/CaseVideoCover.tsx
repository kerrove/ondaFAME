'use client'

import clsx from 'clsx'
import { useReducedMotion } from 'framer-motion'

import styles from './Cases.module.scss'
import { useNearViewport } from '@/hooks/useNearViewport'

interface Props {
	loop: string
	cover: string
}

export function CaseVideoCover({ loop, cover }: Props) {
	const { ref, near } = useNearViewport<HTMLVideoElement>('0px')
	const reducedMotion = useReducedMotion()

	return (
		<video
			ref={ref}
			className={clsx(styles.cover, styles.animatedCover)}
			src={near && reducedMotion === false ? loop : undefined}
			poster={cover}
			width={80}
			height={80}
			autoPlay
			muted
			loop
			playsInline
			disablePictureInPicture
			preload='none'
			aria-hidden='true'
		/>
	)
}
