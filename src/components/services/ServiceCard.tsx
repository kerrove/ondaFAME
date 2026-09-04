import { Rocket, Sparkles, Users } from 'lucide-react'
import type { ComponentType } from 'react'

import styles from './Services.module.scss'
import type { Service, ServiceIcon } from '@/types'
import { Reveal } from '@/ui/reveal/Reveal'

const ICONS: Record<ServiceIcon, ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>> = {
	producing: Rocket,
	bloggers: Users,
	smm: Sparkles
}

interface Props {
	service: Service
	position: number
}

export function ServiceCard({ service, position }: Props) {
	const Icon = ICONS[service.icon]

	return (
		<Reveal
			as='li'
			index={position - 1}
			className={styles.card}
			itemProp='itemListElement'
			itemScope
			itemType='https://schema.org/Service'
		>
			<meta
				itemProp='position'
				content={String(position)}
			/>
			<span
				className={styles.icon}
				aria-hidden='true'
			>
				<Icon size={32} />
			</span>
			<h3
				className={styles.title}
				itemProp='name'
			>
				{service.title}
			</h3>
			<p
				className={styles.description}
				itemProp='description'
			>
				{service.description}
			</p>
		</Reveal>
	)
}
