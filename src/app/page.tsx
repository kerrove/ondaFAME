import { Aggregators } from '@/components/aggregators/Aggregators'
import { Cases } from '@/components/cases/Cases'
import { CtaBand } from '@/components/cta-band/CtaBand'
import { Faq } from '@/components/faq/Faq'
import { Hero } from '@/components/hero/Hero'
import { Quote } from '@/components/quote/Quote'
import { Services } from '@/components/services/Services'
import { Team } from '@/components/team/Team'
import { ImagesConfig } from '@/configs/images.config'
import { getContent } from '@/server/content'

export default async function HomePage() {
	const { quote, ctaBands, cta, contacts } = await getContent()

	return (
		<>
			<Hero />
			<Aggregators />
			<Services />
			<Cases />

			<Quote
				{...quote}
				photo={ImagesConfig.LIL_CRYSTALLL}
			/>

			<CtaBand
				{...ctaBands.pricing}
				ctaLabel={cta.label}
				ctaNote={cta.note}
				ctaHref={contacts.telegramUrl}
			/>

			<Team />
			<Faq />

			<CtaBand
				{...ctaBands.final}
				ctaLabel={cta.label}
				ctaNote={cta.note}
				ctaHref={contacts.telegramUrl}
			/>
		</>
	)
}
