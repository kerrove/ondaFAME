import styles from './CtaBand.module.scss'
import type { CtaBandContent } from '@/types'
import { Button } from '@/ui/button/Button'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Reveal } from '@/ui/reveal/Reveal'

/** Повторяющийся блок призыва. Формулировка действия одна на весь сайт и не варьируется. */
interface Props extends CtaBandContent {
	/** Кнопка и подпись под ней — общие на весь сайт, приходят из cta в content.json */
	ctaLabel: string
	ctaNote: string
	ctaHref: string
}

export function CtaBand({ id, lead, accent, text, ctaLabel, ctaNote, ctaHref }: Props) {
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
						href={ctaHref}
						size='lg'
					>
						{ctaLabel}
					</Button>
					<p className={styles.note}>{ctaNote}</p>
				</Reveal>
			</div>
		</section>
	)
}
