'use client'

import { type FormEvent, useEffect, useRef, useState, useTransition } from 'react'

import type { AdminActionState } from '@/app/admin/actions'

export type SaveAction = (
	previous: AdminActionState,
	formData: FormData
) => Promise<AdminActionState>

export type UndoAction = () => Promise<AdminActionState>

const IDLE: AdminActionState = { status: 'idle', message: '' }

/**
 * Поведение редактора: сохранение, отмена, «Вернуть исходный» у поля и предупреждение о
 * несохранённых правках при уходе со страницы.
 *
 * Форма отправляется вручную, а не через <form action>: React сбрасывает такую форму после
 * каждого действия, и при ошибке проверки заказчик потерял бы всё набранное.
 */
export function useAdminEditor(saveAction: SaveAction, undoAction: UndoAction) {
	const formRef = useRef<HTMLFormElement>(null)
	const [status, setStatus] = useState(IDLE)
	const [dirty, setDirty] = useState(false)
	const [pending, startTransition] = useTransition()

	useEffect(() => {
		if (!dirty) return

		// Браузер сам покажет «Покинуть сайт? Изменения могут не сохраниться»
		const warn = (event: BeforeUnloadEvent) => event.preventDefault()

		window.addEventListener('beforeunload', warn)

		return () => window.removeEventListener('beforeunload', warn)
	}, [dirty])

	function settle(result: AdminActionState) {
		setStatus(result)

		if (result.status === 'success') setDirty(false)
	}

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const data = new FormData(event.currentTarget)

		startTransition(async () => settle(await saveAction(IDLE, data)))
	}

	function undo() {
		if (!window.confirm('Вернуть тексты, какими они были до последнего сохранения?')) return

		startTransition(async () => settle(await undoAction()))
	}

	/** Новая правка — старое «Сохранено» или ошибка уже не про текущее состояние формы */
	function markDirty() {
		setDirty(true)
		setStatus(IDLE)
	}

	function resetField(key: string, original: string) {
		const field = formRef.current?.elements.namedItem(key)

		if (!(field instanceof HTMLTextAreaElement)) return

		field.value = original
		field.focus()
		markDirty()
	}

	return {
		formRef,
		status,
		pending,
		dirty,
		markDirty,
		submit,
		undo,
		resetField
	}
}
