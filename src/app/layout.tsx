import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'
import { SITE_ORIGIN, SITE_URL } from '@/constants/site'
import { MotionProvider } from '@/providers/motion-provider/MotionProvider'
import { getContent } from '@/server/content'
import type { SiteContent } from '@/types'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap'
})

export async function generateMetadata(): Promise<Metadata> {
	const { brand, metadata } = await getContent()

	return {
		metadataBase: new URL(SITE_ORIGIN),
		title: {
			default: `${brand.fullName} — ${brand.tagline}`,
			template: `%s — ${brand.fullName}`
		},
		description: brand.description,
		applicationName: brand.fullName,
		keywords: metadata.keywords,
		authors: [{ name: brand.fullName, url: SITE_URL }],
		creator: 'https://kerrove.ru',
		publisher: brand.fullName,
		alternates: { canonical: `${SITE_URL}/` },
		openGraph: {
			type: 'website',
			locale: 'ru_RU',
			url: SITE_URL,
			siteName: brand.fullName,
			title: `${brand.fullName} — ${brand.tagline}`,
			description: brand.description
		},
		twitter: {
			card: 'summary_large_image',
			title: `${brand.fullName} — ${brand.tagline}`,
			description: brand.description
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
		},
		category: 'marketing'
	}
}

export const viewport: Viewport = {
	themeColor: '#000000',
	colorScheme: 'dark'
}

/** Организация целиком — в JSON-LD; разметка услуг, кейсов, команды и вопросов лежит микроданными в самих секциях. */
function organizationLd(brand: SiteContent['brand'], telegramUrl: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: brand.fullName,
		legalName: brand.legalName,
		url: SITE_URL,
		description: brand.description,
		slogan: brand.slogan,
		areaServed: 'RU',
		knowsLanguage: 'ru',
		sameAs: [telegramUrl],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'sales',
			url: telegramUrl,
			availableLanguage: 'Russian'
		}
	}
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
	const { a11y, brand, contacts } = await getContent()

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
					{a11y.skipLink}
				</a>
				<MotionProvider>
					<Header />
					<main id='main'>{children}</main>
					<Footer />
				</MotionProvider>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationLd(brand, contacts.telegramUrl))
					}}
				/>
			</body>
		</html>
	)
}
