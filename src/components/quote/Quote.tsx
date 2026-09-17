import styles from './Quote.module.scss'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	/** Первая половина — белая: обстоятельство */
	lead: string
	/** Вторая половина — акцентная: обещание */
	accent: string
	author: string
	/** Где это было сказано: цитата без источника — просто красивая строка */
	source: string
}

/** Пауза между кейсом и разговором о цене: одна мысль на весь экран. */
export function Quote({ lead, accent, author, source }: Props) {
	return (
		<section className={styles.section}>
			<Reveal className={styles.inner}>
				<figure>
					<span
						className={styles.tick}
						aria-hidden='true'
					/>
					<blockquote className={styles.text}>
						{lead} <span className={styles.accent}>{accent}</span>
					</blockquote>
					<figcaption className={styles.author}>
						{author}
						<span className={styles.source}>{source}</span>
					</figcaption>
				</figure>
			</Reveal>
		</section>
	)
}
