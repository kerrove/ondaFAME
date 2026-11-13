'use client'

import styles from './Admin.module.scss'
import { AdminSectionBlock } from './AdminSectionBlock'
import { AdminToolbar } from './AdminToolbar'
import { type SaveAction, type UndoAction, useAdminEditor } from './useAdminEditor'
import type { AdminSection } from '@/utils/admin-sections'

interface Props {
	sections: AdminSection[]
	historyCount: number
	/** Меняется с каждой сохранённой версией: форма пересоздаётся и показывает свежие тексты */
	revision: string
	saveAction: SaveAction
	undoAction: UndoAction
}

export function AdminEditor({ sections, historyCount, revision, saveAction, undoAction }: Props) {
	const { formRef, status, pending, dirty, markDirty, submit, undo, resetField } = useAdminEditor(
		saveAction,
		undoAction
	)

	return (
		<div className={styles.page}>
			<header className={styles.intro}>
				<h1 className={styles.heading}>Тексты сайта</h1>
				<p className={styles.lead}>
					Откройте нужный раздел, поправьте текст прямо в поле и нажмите «Сохранить» внизу экрана —
					изменения сразу появятся на сайте. Если что-то пошло не так, нажмите «Отменить последнее
					сохранение».
				</p>
			</header>

			<form
				key={revision}
				ref={formRef}
				className={styles.form}
				onSubmit={submit}
				onInput={markDirty}
			>
				{sections.map(section => (
					<AdminSectionBlock
						key={section.id}
						section={section}
						onReset={resetField}
					/>
				))}

				<AdminToolbar
					status={status}
					pending={pending}
					dirty={dirty}
					historyCount={historyCount}
					onUndo={undo}
				/>
			</form>
		</div>
	)
}
