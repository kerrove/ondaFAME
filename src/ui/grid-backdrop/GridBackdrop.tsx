import clsx from 'clsx'

import styles from './GridBackdrop.module.scss'

interface Props {
	/** Плотная сетка с подсветкой в центре — для первого экрана и CTA-блоков */
	variant?: 'plain' | 'spotlight'
	className?: string
}

/** Декоративная координатная сетка под контентом. Не участвует в дереве доступности. */
export function GridBackdrop({ variant = 'plain', className }: Props) {
	return (
		<div
			className={clsx(styles.grid, styles[variant], className)}
			aria-hidden='true'
		/>
	)
}
