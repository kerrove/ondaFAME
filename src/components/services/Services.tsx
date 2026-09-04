import { ServiceCard } from './ServiceCard'
import styles from './Services.module.scss'
import { SERVICES } from '@/constants/services'
import { Carousel } from '@/ui/carousel/Carousel'

export function Services() {
	return (
		<section
			id='services'
			className='section'
			aria-labelledby='services-title'
			itemScope
			itemType='https://schema.org/ItemList'
		>
			<meta
				itemProp='name'
				content='Услуги ONDA FAME'
			/>
			<div className='container'>
				<Carousel
					id='services-track'
					headingId='services-title'
					title='Чем мы занимаемся'
					label='Услуги'
					listClassName={styles.track}
				>
					{SERVICES.map((service, index) => (
						<ServiceCard
							key={service.id}
							service={service}
							position={index + 1}
						/>
					))}
				</Carousel>
			</div>
		</section>
	)
}
