import styles from './Faq.module.scss'
import { FaqItem } from './FaqItem'
import { getContent } from '@/server/content'
import type { FaqItem as FaqEntry } from '@/types'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Reveal } from '@/ui/reveal/Reveal'

/** Раскрыт при загрузке — главный вопрос клиента. Нет такого id в списке — раскрыт первый. */
const DEFAULT_OPEN_ID = 'guarantee'

function faqLd(items: FaqEntry[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map(item => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: { '@type': 'Answer', text: item.answer }
		}))
	}
}

export async function Faq() {
	const { faq } = await getContent()
	const openId = faq.items.some(item => item.id === DEFAULT_OPEN_ID)
		? DEFAULT_OPEN_ID
		: faq.items[0]?.id

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
						{faq.title}
					</h2>
					<p className={styles.description}>{faq.description}</p>
				</Reveal>

				<ul className={styles.list}>
					{faq.items.map((item, index) => (
						<FaqItem
							key={item.id}
							item={item}
							index={index}
							defaultOpen={item.id === openId}
						/>
					))}
				</ul>
			</div>

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faq.items)) }}
			/>
		</section>
	)
}
