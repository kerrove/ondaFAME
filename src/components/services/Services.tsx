import clsx from 'clsx'

import { ServiceCard } from './ServiceCard'
import styles from './Services.module.scss'
import { getServices } from '@/constants/services'
import { getContent } from '@/server/content'
import { Carousel } from '@/ui/carousel/Carousel'

export async function Services() {
	const content = await getContent()

	return (
		<section
			id='services'
			className={clsx('section', styles.section)}
			aria-labelledby='services-title'
			itemScope
			itemType='https://schema.org/ItemList'
		>
			<meta
				itemProp='name'
				content={content.services.schemaName}
			/>
			<div className='container'>
				<Carousel
					id='services-track'
					headingId='services-title'
					title={content.services.title}
					label={content.services.label}
					prevLabel={content.a11y.carouselPrev}
					nextLabel={content.a11y.carouselNext}
					listClassName={styles.track}
				>
					{getServices(content).map((service, index) => (
						<ServiceCard
							position={index + 1}
							service={service}
							key={service.id}
						/>
					))}
				</Carousel>
			</div>
		</section>
	)
}
