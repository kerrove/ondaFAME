import Link from 'next/link'

import styles from './Header.module.scss'
import { CTA_LABEL, NAV_LINKS, TELEGRAM_URL } from '@/constants/site'
import { Button } from '@/ui/button/Button'
import { Logo } from '@/ui/logo/Logo'

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link
					className={styles.brand}
					href='/'
					aria-label='ondaFAME, на главную'
				>
					<Logo />
				</Link>

				<nav
					className={styles.nav}
					aria-label='Разделы страницы'
				>
					<ul className={styles.list}>
						{NAV_LINKS.map(link => (
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
					href={TELEGRAM_URL}
					variant='ghost'
					className={styles.cta}
				>
					{CTA_LABEL}
				</Button>
			</div>
		</header>
	)
}
