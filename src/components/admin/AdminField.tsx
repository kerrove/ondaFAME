import clsx from 'clsx'
import { RotateCcw } from 'lucide-react'

import styles from './Admin.module.scss'
import type { AdminField as AdminFieldData } from '@/utils/admin-sections'

interface Props {
	field: AdminFieldData
	onReset: (key: string, original: string) => void
}

/** Примерная ширина строки поля в знаках — чтобы длинный текст был виден целиком без прокрутки */
const CHARS_PER_ROW = 70

export function AdminField({ field, onReset }: Props) {
	const changed = field.value !== field.original

	return (
		<div className={styles.field}>
			<div className={styles.fieldHead}>
				<label
					className={styles.label}
					htmlFor={field.key}
				>
					{field.label}
				</label>
				{changed && <span className={styles.badge}>изменено</span>}
			</div>

			<textarea
				id={field.key}
				name={field.key}
				className={clsx(styles.input, field.multiline && styles.multiline)}
				defaultValue={field.value}
				rows={field.multiline ? Math.ceil(field.value.length / CHARS_PER_ROW) + 1 : 1}
				spellCheck
			/>

			{changed && (
				<button
					type='button'
					className={styles.reset}
					onClick={() => onReset(field.key, field.original)}
					title={field.original}
				>
					<RotateCcw
						size={14}
						aria-hidden='true'
					/>
					Вернуть исходный текст
				</button>
			)}
		</div>
	)
}
