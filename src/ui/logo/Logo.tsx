import styles from './Logo.module.scss'

/** Начертание логотипа: «onda» белым, «FAME» акцентным — единственный капслок на сайте. */
interface Props {
	light: string
	accent: string
}

export function Logo({ light, accent }: Props) {
	return (
		<span className={styles.logo}>
			<span className={styles.light}>{light}</span>
			<span className={styles.accent}>{accent}</span>
		</span>
	)
}
