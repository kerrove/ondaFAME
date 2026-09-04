import styles from './Logo.module.scss'
import { BRAND } from '@/constants/site'

/** Начертание логотипа: «onda» белым, «FAME» акцентным — единственный капслок на сайте. */
export function Logo() {
	return (
		<span className={styles.logo}>
			<span className={styles.light}>{BRAND.wordmarkLight}</span>
			<span className={styles.accent}>{BRAND.wordmarkAccent}</span>
		</span>
	)
}
