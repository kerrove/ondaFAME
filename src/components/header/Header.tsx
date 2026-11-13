import Link from 'next/link'

import styles from './Header.module.scss'
import { getContent } from '@/server/content'
import { Button } from '@/ui/button/Button'
import { Logo } from '@/ui/logo/Logo'

export async function Header() {
	const { a11y, brand, contacts, cta, nav } = await getContent()

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link
					className={styles.brand}
					href='/'
					// Маршрут и так открыт: префетч самого себя тянет лишний RSC-ответ
					prefetch={false}
					aria-label={a11y.logoHome}
				>
					<Logo
						light={brand.wordmarkLight}
						accent={brand.wordmarkAccent}
					/>
				</Link>

				<nav
					className={styles.nav}
					aria-label={a11y.headerNav}
				>
					<ul className={styles.list}>
						{nav.map(link => (
							<li key={link.href}>
								<a
									className={styles.link}
									href={link.href}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<Button
					href={contacts.telegramUrl}
					variant='ghost'
					className={styles.cta}
				>
					{cta.label}
				</Button>
			</div>
		</header>
	)
}
