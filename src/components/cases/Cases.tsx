import { CaseCard } from './CaseCard'
import styles from './Cases.module.scss'
import { getCases } from '@/constants/cases'
import { getContent } from '@/server/content'
import { Carousel } from '@/ui/carousel/Carousel'

export async function Cases() {
	const content = await getContent()

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
				content={content.cases.schemaName}
			/>
			<div className='container'>
				<Carousel
					id='cases-track'
					headingId='cases-title'
					title={content.cases.title}
					description={content.cases.description}
					label={content.cases.label}
					prevLabel={content.a11y.carouselPrev}
					nextLabel={content.a11y.carouselNext}
					listClassName={styles.track}
				>
					{getCases(content).map((study, index) => (
						<CaseCard
							key={study.id}
							study={study}
							position={index + 1}
							labels={content.cases}
						/>
					))}
				</Carousel>
			</div>
		</section>
	)
}
