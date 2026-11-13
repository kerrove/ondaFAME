import clsx from 'clsx'
import { Mail, MapPin, Phone } from 'lucide-react'

import styles from './Footer.module.scss'
import { getContent } from '@/server/content'
import { Logo } from '@/ui/logo/Logo'
import { Reveal } from '@/ui/reveal/Reveal'

export async function Footer() {
	const { a11y, brand, contacts, footer, nav } = await getContent()

	return (
		<footer className={styles.footer}>
			<Reveal className={clsx('container', styles.inner)}>
				<div className={styles.brand}>
					<Logo
						light={brand.wordmarkLight}
						accent={brand.wordmarkAccent}
					/>
					<p className={styles.tagline}>{brand.tagline}</p>
				</div>

				<nav
					className={styles.nav}
					aria-label={a11y.footerNav}
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
						<li>
							<a
								className={styles.link}
								href={contacts.telegramUrl}
								target='_blank'
								rel='noopener noreferrer'
							>
								{footer.telegram}
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
						<span>{contacts.address}</span>
					</p>
					<a
						className={clsx(styles.contact, styles.contactLink)}
						href={contacts.phoneHref}
					>
						<Phone
							size={16}
							aria-hidden='true'
						/>
						<span>{contacts.phone}</span>
					</a>
					<a
						className={clsx(styles.contact, styles.contactLink)}
						href={`mailto:${contacts.email}`}
					>
						<Mail
							size={16}
							aria-hidden='true'
						/>
						<span>{contacts.email}</span>
					</a>
				</address>
			</Reveal>

			<div className={clsx('container', styles.bottom)}>
				<p>
					© {new Date().getFullYear()} {brand.fullName}
				</p>
			</div>
		</footer>
	)
}
