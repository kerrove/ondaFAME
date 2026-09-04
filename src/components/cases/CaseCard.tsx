import { CaseChartLoader } from './CaseChartLoader'
import styles from './Cases.module.scss'
import type { CaseStudy } from '@/types'
import { Avatar } from '@/ui/avatar/Avatar'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	study: CaseStudy
	position: number
}

export function CaseCard({ study, position }: Props) {
	const title = `Кейс ${study.artist} — ${study.track}`

	return (
		<Reveal
			as='li'
			motion='settle'
			index={position - 1}
			className={styles.card}
			itemProp='itemListElement'
			itemScope
			itemType='https://schema.org/CreativeWork'
		>
			<meta
				itemProp='position'
				content={String(position)}
			/>
			<div className={styles.body}>
				<div className={styles.identity}>
					<Avatar
						name={study.artist}
						src={study.avatar}
						size={72}
						shape='circle'
						decorative
					/>
					<div>
						<p className={styles.tag}>{study.tag}</p>
						<h3
							className={styles.title}
							itemProp='name'
						>
							Кейс {study.artist} — <span className={styles.trackName}>{study.track}</span>
						</h3>
					</div>
				</div>

				<p
					className={styles.description}
					itemProp='description'
				>
					{study.description}
				</p>

				<ul className={styles.metrics}>
					{study.metrics.map(metric => (
						<li
							key={metric.id}
							className={styles.metric}
						>
							<span className={styles.metricValue}>{metric.value}</span>
							<span className={styles.metricLabel}>{metric.label}</span>
						</li>
					))}
				</ul>
			</div>

			<CaseChartLoader
				chart={study.chart}
				caption={`${title}: рост по месяцам`}
			/>
		</Reveal>
	)
}
