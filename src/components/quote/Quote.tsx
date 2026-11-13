import Image from 'next/image'

import styles from './Quote.module.scss'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	/** Первая половина — белая: обстоятельство */
	lead: string
	/** Вторая половина — акцентная: обещание */
	accent: string
	author: string
	/** Где это было сказано. Для цитаты своего артиста не нужен: рядом его фото и имя. */
	source?: string
	/** Фото автора цитаты в /public — стоит слева от текста */
	photo: string
}

/** Пауза между кейсом и разговором о цене: одна мысль на весь экран. */
export function Quote({ lead, accent, author, source, photo }: Props) {
	return (
		<section className={styles.section}>
			<Reveal className={styles.inner}>
				<figure className={styles.figure}>
					<Image
						className={styles.photo}
						src={photo}
						// Имя автора уже читается из figcaption — второй раз скринридеру его не повторяем
						alt=''
						width={320}
						height={320}
						sizes='(min-width: 768px) 320px, 240px'
					/>
					<div className={styles.body}>
						<span
							className={styles.tick}
							aria-hidden='true'
						/>
						<blockquote className={styles.text}>
							{lead} <span className={styles.accent}>{accent}</span>
						</blockquote>
						<figcaption className={styles.author}>
							{author}
							{source && <span className={styles.source}>{source}</span>}
						</figcaption>
					</div>
				</figure>
			</Reveal>
		</section>
	)
}
