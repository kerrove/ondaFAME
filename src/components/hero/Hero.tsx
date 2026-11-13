import { Award, CircleCheck, ShieldCheck } from 'lucide-react'
import type { ComponentType } from 'react'

import styles from './Hero.module.scss'
import { ListenersPlaque } from '@/components/listeners-plaque/ListenersPlaque'
import { getListeners } from '@/constants/listeners'
import { getContent } from '@/server/content'
import type { HeroBadgeId } from '@/types'
import { Button } from '@/ui/button/Button'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { ScrollCue } from '@/ui/scroll-cue/ScrollCue'

const ICONS: Record<HeroBadgeId, ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>> = {
	mbw: Award,
	guarantee: ShieldCheck,
	reporting: CircleCheck
}

export async function Hero() {
	const content = await getContent()
	const { hero, cta, contacts } = content

	return (
		<section className={styles.hero}>
			<GridBackdrop variant='spotlight' />

			<div className={styles.inner}>
				{/* Табло: счётчик слушателей идёт по кругу и показывает рост, а не ожидание */}
				<div className={styles.gauge}>
					<ListenersPlaque {...getListeners(content)} />
				</div>

				<h1 className={styles.title}>{hero.title}</h1>

				<p className={styles.lead}>{hero.lead}</p>

				<ul className={styles.badges}>
					{hero.badges.map(badge => {
						const Icon = ICONS[badge.id]

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
						href={contacts.telegramUrl}
						size='lg'
					>
						{cta.label}
					</Button>
					<p className={styles.note}>{cta.note}</p>

					<ScrollCue
						href='#services'
						label={hero.scrollCue}
					/>
				</div>
			</div>
		</section>
	)
}
