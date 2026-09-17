import styles from './Faq.module.scss'
import { FaqItem } from './FaqItem'
import { FAQ } from '@/constants/faq'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Reveal } from '@/ui/reveal/Reveal'

const faqLd = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: FAQ.map(item => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: { '@type': 'Answer', text: item.answer }
	}))
}

export function Faq() {
	return (
		<section
			id='faq'
			className='section'
			aria-labelledby='faq-title'
		>
			<GridBackdrop />

			<div className='container'>
				<Reveal>
					<h2
						id='faq-title'
						className={styles.title}
					>
						F. A.Q
					</h2>
					<p className={styles.description}>Частые вопросы о процессе, сроках и метриках.</p>
				</Reveal>

				<ul className={styles.list}>
					{FAQ.map((item, index) => (
						<FaqItem
							key={item.id}
							item={item}
							index={index}
						/>
					))}
				</ul>
			</div>

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
			/>
		</section>
	)
}
