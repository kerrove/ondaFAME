import { Award, CircleCheck, ShieldCheck } from 'lucide-react'
import type { ComponentType } from 'react'

import styles from './Hero.module.scss'
import { HERO_BADGES } from '@/constants/services'
import { CTA_LABEL, CTA_NOTE, TELEGRAM_URL } from '@/constants/site'
import type { BadgeIcon } from '@/types'
import { Button } from '@/ui/button/Button'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'

const ICONS: Record<BadgeIcon, ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>> = {
	award: Award,
	shield: ShieldCheck,
	report: CircleCheck
}

export function Hero() {
	return (
		<section className={styles.hero}>
			<GridBackdrop variant='spotlight' />

			<div className={styles.inner}>
				{/* Кольцо-осциллограф: единственный движущийся элемент первого экрана, чистый CSS */}
				<div
					className={styles.ring}
					aria-hidden='true'
				>
					<span className={styles.ringArc} />
					<span className={styles.ringPulse} />
				</div>

				<h1 className={styles.title}>Пора выходить из тени</h1>

				<p className={styles.lead}>
					Первое маркетинговое агентство полного цикла с гарантией результата. Мы сделаем так, чтобы
					твою музыку заметили.
				</p>

				<ul className={styles.badges}>
					{HERO_BADGES.map(badge => {
						const Icon = ICONS[badge.icon]

						return (
							<li
								key={badge.id}
								className={styles.badge}
							>
								<Icon
									size={18}
									aria-hidden='true'
								/>
								<span>{badge.label}</span>
							</li>
						)
					})}
				</ul>

				<div className={styles.action}>
					<Button
						href={TELEGRAM_URL}
						size='lg'
					>
						{CTA_LABEL}
					</Button>
					<p className={styles.note}>{CTA_NOTE}</p>
				</div>
			</div>
		</section>
	)
}
