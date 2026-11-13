import type { Metadata } from 'next'

import styles from './not-found.module.scss'
import { getContent } from '@/server/content'
import { Button } from '@/ui/button/Button'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Logo } from '@/ui/logo/Logo'

export async function generateMetadata(): Promise<Metadata> {
	const { notFound } = await getContent()

	return {
		title: notFound.metaTitle,
		robots: { index: false, follow: true }
	}
}

export default async function NotFound() {
	const { notFound, brand, contacts, cta } = await getContent()

	return (
		<main className={styles.page}>
			<GridBackdrop variant='spotlight' />

			<div className={styles.inner}>
				<Logo
					light={brand.wordmarkLight}
					accent={brand.wordmarkAccent}
				/>
				<p className={styles.code}>{notFound.code}</p>
				<h1 className={styles.title}>{notFound.title}</h1>
				<p className={styles.text}>{notFound.text}</p>
				<div className={styles.actions}>
					<Button
						href='/'
						variant='ghost'
						withIcon={false}
					>
						{notFound.homeAction}
					</Button>
					<Button href={contacts.telegramUrl}>{cta.label}</Button>
				</div>
			</div>
		</main>
	)
}
