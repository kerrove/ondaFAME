import { CaseCard } from './CaseCard'
import styles from './Cases.module.scss'
import { CASES } from '@/constants/cases'
import { Carousel } from '@/ui/carousel/Carousel'

export function Cases() {
	return (
		<section
			id='cases'
			className='section'
			aria-labelledby='cases-title'
			itemScope
			itemType='https://schema.org/ItemList'
		>
			<meta
				itemProp='name'
				content='Кейсы ONDA FAME'
			/>
			<div className='container'>
				<Carousel
					id='cases-track'
					headingId='cases-title'
					title='Кейсы'
					description='Цифры из отчётов по завершённым кампаниям.'
					label='Кейсы'
					listClassName={styles.track}
				>
					{CASES.map((study, index) => (
						<CaseCard
							key={study.id}
							study={study}
							position={index + 1}
						/>
					))}
				</Carousel>
			</div>
		</section>
	)
}
