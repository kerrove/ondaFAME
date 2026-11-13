'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

import { LISTENER_STEP_MS } from '@/constants/listeners'

/** Запрос на покой: движение считает JS, поэтому глобального CSS-правила здесь мало */
const CALM = '(prefers-reduced-motion: reduce)'

function subscribeToCalm(notify: () => void) {
	const query = window.matchMedia(CALM)

	query.addEventListener('change', notify)

	return () => query.removeEventListener('change', notify)
}

const readCalm = () => window.matchMedia(CALM).matches
/** На сервере медиазапроса нет: рендерим обычную ветку, клиент поправит после гидратации */
const readCalmOnServer = () => false

/**
 * Шаг счётчика на первом экране. Возвращает текущее и предыдущее значение — по паре табло
 * понимает, какие разряды перекатывать, — и номер шага, перезапускающий анимацию.
 *
 * При запросе на покой цикл не запускается вовсе: табло замирает на последней ступени, то есть
 * на самой крупной цифре. Содержимое, которое обновляется само и без паузы, — нарушение WCAG.
 */
export function useListenersTicker(steps: number[]) {
	const calm = useSyncExternalStore(subscribeToCalm, readCalm, readCalmOnServer)
	const [step, setStep] = useState(0)

	useEffect(() => {
		if (calm) return

		const timer = window.setInterval(() => setStep(current => current + 1), LISTENER_STEP_MS)

		return () => window.clearInterval(timer)
	}, [calm])

	const index = calm ? steps.length - 1 : step % steps.length
	// Перекатывать нечего на первом шаге и в режиме покоя: предыдущее значение равно текущему
	const previousIndex = calm || step === 0 ? index : (step - 1) % steps.length

	return {
		value: steps[index],
		previous: steps[previousIndex],
		revision: step
	}
}
