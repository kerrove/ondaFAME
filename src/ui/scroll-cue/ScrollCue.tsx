import { ChevronDown } from 'lucide-react'

import styles from './ScrollCue.module.scss'

interface Props {
	/** Якорь следующей секции */
	href: string
	/** Что произойдёт по нажатию — читает скринридер */
	label: string
}

/** Подсказка о том, что страница листается дальше. Работает и как ссылка на следующую секцию. */
export function ScrollCue({ href, label }: Props) {
	return (
		<a
			href={href}
			className={styles.cue}
		>
			<span className='visually-hidden'>{label}</span>
			<ChevronDown
				size={22}
				strokeWidth={2}
				aria-hidden='true'
			/>
		</a>
	)
}
