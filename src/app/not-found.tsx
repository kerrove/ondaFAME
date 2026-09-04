import type { Metadata } from 'next'

import styles from './not-found.module.scss'
import { CTA_LABEL, TELEGRAM_URL } from '@/constants/site'
import { Button } from '@/ui/button/Button'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Logo } from '@/ui/logo/Logo'

export const metadata: Metadata = {
	title: 'Страница не найдена',
	robots: { index: false, follow: true }
}

export default function NotFound() {
	return (
		<main className={styles.page}>
			<GridBackdrop variant='spotlight' />

			<div className={styles.inner}>
				<Logo />
				<p className={styles.code}>404</p>
				<h1 className={styles.title}>Такой страницы нет</h1>
				<p className={styles.text}>
					Ссылка устарела или была набрана с ошибкой. Вернитесь на главную — или сразу напишите нам.
				</p>
				<div className={styles.actions}>
					<Button
						href='/'
						variant='ghost'
						withIcon={false}
					>
						На главную
					</Button>
					<Button href={TELEGRAM_URL}>{CTA_LABEL}</Button>
				</div>
			</div>
		</main>
	)
}
