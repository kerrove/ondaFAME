import clsx from 'clsx'
import { Save, Undo2 } from 'lucide-react'

import styles from './Admin.module.scss'
import type { AdminActionState } from '@/app/admin/actions'

interface Props {
	status: AdminActionState
	pending: boolean
	dirty: boolean
	historyCount: number
	onUndo: () => void
}

/** Панель внизу экрана: кнопка сохранения всегда под рукой, где бы ни шла правка */
export function AdminToolbar({ status, pending, dirty, historyCount, onUndo }: Props) {
	const message = pending
		? 'Сохраняем…'
		: status.message || (dirty ? 'Есть несохранённые правки' : 'Все правки сохранены')

	return (
		<div className={styles.toolbar}>
			<p
				className={clsx(
					styles.status,
					!pending && status.status === 'error' && styles.statusError,
					!pending && status.status === 'success' && styles.statusSuccess
				)}
				role='status'
			>
				{message}
			</p>

			<div className={styles.actions}>
				<button
					type='button'
					className={styles.secondary}
					onClick={onUndo}
					disabled={pending || historyCount === 0}
				>
					<Undo2
						size={16}
						aria-hidden='true'
					/>
					Отменить последнее сохранение
				</button>
				<button
					type='submit'
					className={styles.primary}
					disabled={pending}
				>
					<Save
						size={16}
						aria-hidden='true'
					/>
					Сохранить
				</button>
			</div>
		</div>
	)
}
