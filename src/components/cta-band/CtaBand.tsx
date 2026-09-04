import styles from './CtaBand.module.scss'
import { CTA_LABEL, CTA_NOTE, TELEGRAM_URL } from '@/constants/site'
import { Button } from '@/ui/button/Button'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	id: string
	/** Первая половина заголовка — белая: обстоятельство */
	lead: string
	/** Вторая половина — акцентная: обещание */
	accent: string
	text: string
}

/** Повторяющийся блок призыва. Формулировка действия одна на весь сайт и не варьируется. */
export function CtaBand({ id, lead, accent, text }: Props) {
	return (
		<section
			className={styles.band}
			aria-labelledby={id}
		>
			<GridBackdrop variant='spotlight' />

			<div className={styles.inner}>
				<Reveal index={0}>
					<h2
						id={id}
						className={styles.title}
					>
						{lead} <span className={styles.accent}>{accent}</span>
					</h2>
				</Reveal>

				<Reveal index={1}>
					<p className={styles.text}>{text}</p>
				</Reveal>

				<Reveal
					index={2}
					className={styles.action}
				>
					<Button
						href={TELEGRAM_URL}
						size='lg'
					>
						{CTA_LABEL}
					</Button>
					<p className={styles.note}>{CTA_NOTE}</p>
				</Reveal>
			</div>
		</section>
	)
}
