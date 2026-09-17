import clsx from 'clsx'
import { Mail, MapPin, Phone } from 'lucide-react'

import styles from './Footer.module.scss'
import { BRAND, CONTACTS, NAV_LINKS, TELEGRAM_URL } from '@/constants/site'
import { Logo } from '@/ui/logo/Logo'
import { Reveal } from '@/ui/reveal/Reveal'

export function Footer() {
	return (
		<footer className={styles.footer}>
			<Reveal className={clsx('container', styles.inner)}>
				<div className={styles.brand}>
					<Logo />
					<p className={styles.tagline}>{BRAND.tagline}</p>
				</div>

				<nav
					className={styles.nav}
					aria-label='Навигация в подвале'
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
						<li>
							<a
								className={styles.link}
								href={TELEGRAM_URL}
								target='_blank'
								rel='noopener noreferrer'
							>
								Telegram
							</a>
						</li>
					</ul>
				</nav>

				<address className={styles.contacts}>
					<p className={styles.contact}>
						<MapPin
							size={16}
							aria-hidden='true'
						/>
						<span>{CONTACTS.address}</span>
					</p>
					<a
						className={clsx(styles.contact, styles.contactLink)}
						href={CONTACTS.phoneHref}
					>
						<Phone
							size={16}
							aria-hidden='true'
						/>
						<span>{CONTACTS.phone}</span>
					</a>
					<a
						className={clsx(styles.contact, styles.contactLink)}
						href={`mailto:${CONTACTS.email}`}
					>
						<Mail
							size={16}
							aria-hidden='true'
						/>
						<span>{CONTACTS.email}</span>
					</a>
				</address>
			</Reveal>

			<div className={clsx('container', styles.bottom)}>
				<p>
					© {new Date().getFullYear()} {BRAND.fullName}
				</p>
			</div>
		</footer>
	)
}
