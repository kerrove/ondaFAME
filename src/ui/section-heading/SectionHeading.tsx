import type { ReactNode } from 'react'

import styles from './SectionHeading.module.scss'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	id?: string
	title: ReactNode
	description?: string
	/** Слот для стрелок карусели справа от заголовка */
	aside?: ReactNode
}

export function SectionHeading({ id, title, description, aside }: Props) {
	return (
		<Reveal
			as='header'
			className={styles.heading}
		>
			<div className={styles.text}>
				<h2
					id={id}
					className={styles.title}
				>
					{title}
				</h2>
				{description ? <p className={styles.description}>{description}</p> : null}
			</div>
			{aside ? <div className={styles.aside}>{aside}</div> : null}
		</Reveal>
	)
}
