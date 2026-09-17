import type { CSSProperties } from 'react'

import styles from './Aggregators.module.scss'
import { AGGREGATORS } from '@/constants/aggregators'
import { BrandGlyph } from '@/ui/brand-glyph/BrandGlyph'
import { BrandSprite } from '@/ui/brand-glyph/BrandSprite'

/**
 * Сколько копий ленты лежит в разметке. Дорожка едет ровно на длину одной копии, поэтому за
 * кадром обязано оставаться не меньше экрана: (COPIES − 1) × 1113px. Двух копий не хватало —
 * к концу цикла справа появлялась пустота. Пять закрывают экраны примерно до 4450px, то есть
 * и ультраширокие 3440, и 4K без масштабирования.
 */
const COPIES = 5

interface GroupProps {
	/** Копии существуют только ради непрерывности и скринридеру не нужны */
	clone?: boolean
}

function Group({ clone }: GroupProps) {
	return (
		<ul
			className={styles.group}
			aria-hidden={clone || undefined}
		>
			{AGGREGATORS.map(item => (
				<li
					key={item.id}
					className={styles.item}
				>
					<span
						className={styles.glyph}
						style={{ height: `${item.height}rem` }}
					>
						<BrandGlyph id={item.id} />
					</span>
					<span className={styles.name}>{item.name}</span>
				</li>
			))}
		</ul>
	)
}

/**
 * Лента площадок между первым экраном и услугами. Едет бесконечно: одинаковые копии сдвигаются
 * ровно на длину одной, поэтому шов не виден. При запросе на покой лента останавливается и
 * раскладывается в обычный ряд — иначе часть логотипов осталась бы за кадром.
 */
export function Aggregators() {
	return (
		<section
			className={styles.strip}
			aria-label='Музыкальные площадки'
		>
			<BrandSprite />

			<div
				className={styles.track}
				style={{ '--copies': COPIES } as CSSProperties}
			>
				{Array.from({ length: COPIES }, (_, index) => (
					<Group
						key={index}
						clone={index > 0}
					/>
				))}
			</div>
		</section>
	)
}
