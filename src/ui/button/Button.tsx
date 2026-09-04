import clsx from 'clsx'
import { Send } from 'lucide-react'
import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

import styles from './Button.module.scss'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'lg'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
	variant?: Variant
	size?: Size
	/** Иконка бумажного самолётика — метка того, что действие уходит в мессенджер */
	withIcon?: boolean
}

export function Button({
	href,
	variant = 'primary',
	size = 'md',
	withIcon = true,
	className,
	children,
	...rest
}: Props) {
	const external = href.startsWith('http')
	// Внутренние переходы идут через next/link, внешние — обычной ссылкой в новой вкладке
	const Tag = external ? 'a' : Link

	return (
		<Tag
			href={href}
			className={clsx(styles.button, styles[variant], styles[size], className)}
			{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
			{...rest}
		>
			{withIcon ? (
				<Send
					className={styles.icon}
					size={size === 'lg' ? 20 : 17}
					strokeWidth={2}
					aria-hidden='true'
				/>
			) : null}
			<span>{children}</span>
		</Tag>
	)
}
