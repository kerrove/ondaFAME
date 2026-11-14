import clsx from 'clsx'
import { ArrowUpRight, Music2, Star } from 'lucide-react'

import { CaseChartLoader } from './CaseChartLoader'
import { CaseVideoCover } from './CaseVideoCover'
import styles from './Cases.module.scss'
import { ChartTable } from './ChartTable'
import type { CaseStudy, SiteContent } from '@/types'
import { Avatar } from '@/ui/avatar/Avatar'
import { Reveal } from '@/ui/reveal/Reveal'

interface Props {
	study: CaseStudy
	position: number
	/** Подписи карточки — общие для всех кейсов */
	labels: Pick<
		SiteContent['cases'],
		'cardPrefix' | 'chartCaption' | 'chartMonthColumn' | 'featuredLabel' | 'tiktokLabel'
	>
}

export function CaseCard({ study, position, labels }: Props) {
	const { cardPrefix, chartCaption, chartMonthColumn, featuredLabel, tiktokLabel } = labels
	const title = `${cardPrefix} ${study.artist} — ${study.track}`
	const { chart } = study

	return (
		<Reveal
			as='li'
			motion='settle'
			index={position - 1}
			className={clsx(
				styles.card,
				study.featured && styles.featured,
				!chart && styles.textOnly
			)}
			itemProp='itemListElement'
			itemScope
			itemType='https://schema.org/CreativeWork'
		>
			<meta
				itemProp='position'
				content={String(position)}
			/>
			<div className={styles.body}>
				{study.featured && (
					<p className={styles.featuredLabel}>
						<Star
							size={14}
							aria-hidden='true'
						/>
						{featuredLabel}
					</p>
				)}
				<div className={styles.identity}>
					{study.coverLoop && study.cover ? (
						<CaseVideoCover
							loop={study.coverLoop}
							cover={study.cover}
						/>
					) : (
						<Avatar
							name={study.artist}
							src={study.cover}
							size={80}
							shape='tile'
							className={styles.cover}
							decorative
						/>
					)}
					<div className={styles.identityText}>
						<p className={styles.tag}>{study.tag}</p>
						<h3
							className={styles.title}
							itemProp='name'
						>
							{cardPrefix} {study.artist} — <span className={styles.trackName}>{study.track}</span>
						</h3>
					</div>
				</div>

				<p
					className={styles.description}
					itemProp='description'
				>
					{study.description}
				</p>

				{study.tiktok && (
					<a
						className={styles.tiktok}
						href={study.tiktok}
						target='_blank'
						rel='noopener noreferrer'
						itemProp='url'
					>
						<Music2
							size={16}
							aria-hidden='true'
						/>
						{tiktokLabel}
						<ArrowUpRight
							size={16}
							aria-hidden='true'
						/>
					</a>
				)}

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

			{chart && (
				<CaseChartLoader chart={chart}>
					<ChartTable
						chart={chart}
						caption={`${title}: ${chart.caption ?? chartCaption}`}
						defaultColumn={chartMonthColumn}
					/>
				</CaseChartLoader>
			)}
		</Reveal>
	)
}
