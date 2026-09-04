'use client'

import { useState } from 'react'

import styles from './Faq.module.scss'
import { FaqItem } from './FaqItem'
import type { FaqItem as FaqItemData } from '@/types'

interface Props {
	items: FaqItemData[]
}

/** Умный компонент: держит открытый вопрос и раздаёт состояние вниз. Разметки не пишет. */
export function FaqList({ items }: Props) {
	const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

	return (
		<ul className={styles.list}>
			{items.map((item, index) => (
				<FaqItem
					key={item.id}
					item={item}
					index={index}
					open={openId === item.id}
					onToggle={() => setOpenId(openId === item.id ? null : item.id)}
				/>
			))}
		</ul>
	)
}
