import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { BRAND, SITE_URL, TELEGRAM_URL } from '@/constants/site'
import { MotionProvider } from '@/providers/motion-provider/MotionProvider'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap'
})

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `${BRAND.fullName} — ${BRAND.tagline}`,
		template: `%s — ${BRAND.fullName}`
	},
	description: BRAND.description,
	applicationName: BRAND.fullName,
	keywords: [
		'продвижение музыки',
		'музыкальный маркетинг',
		'продвижение трека в TikTok',
		'продвижение у блогеров',
		'продюсирование артиста',
		'SMM для музыкантов',
		'масспостинг'
	],
	authors: [{ name: BRAND.fullName, url: SITE_URL }],
	creator: BRAND.fullName,
	publisher: BRAND.fullName,
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		url: SITE_URL,
		siteName: BRAND.fullName,
		title: `${BRAND.fullName} — ${BRAND.tagline}`,
		description: BRAND.description
	},
	twitter: {
		card: 'summary_large_image',
		title: `${BRAND.fullName} — ${BRAND.tagline}`,
		description: BRAND.description
	},
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
	},
	category: 'marketing'
}

export const viewport: Viewport = {
	themeColor: '#000000',
	colorScheme: 'dark'
}

/** Организация целиком — в JSON-LD; разметка услуг, кейсов, команды и вопросов лежит микроданными в самих секциях. */
const organizationLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: BRAND.fullName,
	legalName: BRAND.legalName,
	url: SITE_URL,
	description: BRAND.description,
	slogan: 'Пора выходить из тени',
	areaServed: 'RU',
	knowsLanguage: 'ru',
	sameAs: [TELEGRAM_URL],
	contactPoint: {
		'@type': 'ContactPoint',
		contactType: 'sales',
		url: TELEGRAM_URL,
		availableLanguage: 'Russian'
	}
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang='ru'
			className={inter.variable}
		>
			<body>
				<noscript>
					<style>
						{'[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}'}
					</style>
				</noscript>
				<a
					className='skip-link'
					href='#main'
				>
					Перейти к основному содержимому
				</a>
				<MotionProvider>{children}</MotionProvider>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
				/>
			</body>
		</html>
	)
}
