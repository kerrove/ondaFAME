'use client'

import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { Plus, X } from 'lucide-react'

import styles from './Faq.module.scss'
import type { FaqItem as FaqItemData } from '@/types'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	item: FaqItemData
	open: boolean
	onToggle: () => void
	/** Позиция в списке: задаёт ступень появления при скролле */
	index: number
}

/** Тупой компонент: только разметка одного вопроса, состояние приходит сверху. */
export function FaqItem({ item, open, onToggle, index }: Props) {
	return (
		<Reveal
			as='li'
			motion='settle'
			index={index}
			className={clsx(styles.item, open && styles.open)}
		>
			<h3 className={styles.questionRow}>
				<button
					type='button'
					className={styles.question}
					aria-expanded={open}
					aria-controls={`faq-answer-${item.id}`}
					id={`faq-question-${item.id}`}
					onClick={onToggle}
				>
					<span>{item.question}</span>
					<span
						className={styles.toggle}
						aria-hidden='true'
					>
						{open ? <X size={16} /> : <Plus size={16} />}
					</span>
				</button>
			</h3>

			<AnimatePresence initial={false}>
				{open ? (
					<m.div
						key='answer'
						className={styles.answerWrap}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
					>
						<div
							id={`faq-answer-${item.id}`}
							role='region'
							aria-labelledby={`faq-question-${item.id}`}
						>
							<p className={styles.answer}>{item.answer}</p>
						</div>
					</m.div>
				) : null}
			</AnimatePresence>
		</Reveal>
	)
}
