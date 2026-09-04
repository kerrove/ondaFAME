import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { BRAND } from '@/constants/site'

export const alt = `${BRAND.fullName} — ${BRAND.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ACCENT = '#4ee35c'
const MUTED = '#a1a1aa'

/**
 * Начертание для превью: Inter Bold, статический инстанс с кириллицей (79 КБ).
 * Файл лежит в репозитории, поэтому сборка не ходит в сеть.
 */
const font = readFile(join(process.cwd(), 'src/assets/fonts/Inter-Bold.ttf'))

/** Превью для соцсетей: то же чёрное поле и тот же сигнальный зелёный, что и на странице. */
export default async function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				background: '#000000',
				padding: 80,
				color: '#ffffff',
				fontFamily: 'Inter'
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: 46,
					letterSpacing: -2,
					fontWeight: 700
				}}
			>
				<span>{BRAND.wordmarkLight}</span>
				<span style={{ color: ACCENT }}>{BRAND.wordmarkAccent}</span>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div
					style={{
						display: 'flex',
						fontSize: 94,
						letterSpacing: -4,
						lineHeight: 1.05,
						fontWeight: 700
					}}
				>
					Пора выходить из тени
				</div>
				<div
					style={{
						display: 'flex',
						marginTop: 28,
						fontSize: 32,
						color: MUTED,
						letterSpacing: -1
					}}
				>
					{BRAND.tagline}
				</div>
			</div>

			<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
				<div style={{ display: 'flex', width: 64, height: 4, background: ACCENT }} />
				<div style={{ display: 'flex', fontSize: 26, color: MUTED }}>
					Гарантия результата · Официальная отчётность
				</div>
			</div>
		</div>,
		{
			...size,
			fonts: [{ name: 'Inter', data: await font, weight: 700, style: 'normal' }]
		}
	)
}
