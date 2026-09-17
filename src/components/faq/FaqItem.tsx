import { Plus, X } from 'lucide-react'

import styles from './Faq.module.scss'
import type { FaqItem as FaqItemData } from '@/types'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	item: FaqItemData
	/** Позиция в списке: задаёт ступень появления при скролле и раскрывает первый вопрос */
	index: number
}

/**
 * Нативный disclosure вместо самодельного аккордеона: работает без JS, отдаёт ответ в разметке
 * с первого байта и сам держит семантику раскрытия. Атрибут name делает список
 * взаимоисключающим там, где браузер это умеет; где не умеет — вопросы открываются независимо,
 * и это единственное, что теряется.
 */
export function FaqItem({ item, index }: Props) {
	return (
		<Reveal
			as='li'
			motion='settle'
			index={index}
			className={styles.item}
		>
			<details
				className={styles.disclosure}
				name='faq'
				open={index === 0}
			>
				<summary className={styles.question}>
					<span className={styles.questionText}>{item.question}</span>
					<span
						className={styles.toggle}
						aria-hidden='true'
					>
						<Plus
							className={styles.iconClosed}
							size={16}
						/>
						<X
							className={styles.iconOpen}
							size={16}
						/>
					</span>
				</summary>

				<p className={styles.answer}>{item.answer}</p>
			</details>
		</Reveal>
	)
}
