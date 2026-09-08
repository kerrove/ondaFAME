import { Cases } from '@/components/cases/Cases'
import { CtaBand } from '@/components/cta-band/CtaBand'
import { Faq } from '@/components/faq/Faq'
import { Hero } from '@/components/hero/Hero'
import { Services } from '@/components/services/Services'
import { Team } from '@/components/team/Team'

export default function HomePage() {
	return (
		<>
			<Hero />
			<Services />
			<Cases />

			<CtaBand
				id='cta-pricing'
				lead='Через нас продвижение'
				accent='дешевле. Попробуй.'
				text='За счёт долгосрочного и стратегического партнёрства с блогерами, сервисами, музыкальными СМИ и медиа мы получаем эксклюзивные скидки за объём приведённых клиентов. Эти условия недоступны при прямом заказе — у человека нет оптовых скидок, поэтому работать через нас, банально, выгоднее.'
			/>

			<Team />
			<Faq />

			<CtaBand
				id='cta-final'
				lead='Мы сделаем так, чтобы'
				accent='твои треки знал каждый.'
				text='Работа без посредников, без пустых обещаний и без кабальных условий лейблов. Ты заслуживаешь стать известным, и только мы сможем в этом помочь.'
			/>
		</>
	)
}
