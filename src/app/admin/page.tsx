import type { Metadata } from 'next'
import { connection } from 'next/server'
import { createHash } from 'node:crypto'

import { saveContent, undoLastSave } from './actions'
import { AdminEditor } from '@/components/admin/AdminEditor'
import { BASE_CONTENT, countHistory, readOverrides } from '@/server/content'
import { buildAdminSections } from '@/utils/admin-sections'

export const metadata: Metadata = {
	title: 'Редактор текстов',
	robots: { index: false, follow: false }
}

/** Редактор текстов сайта. Доступ закрыт паролем в src/proxy.ts. */
export default async function AdminPage() {
	// Правки читаются с диска на каждый заход: без этого Next испёк бы страницу на сборке
	await connection()

	const overrides = await readOverrides()

	return (
		<AdminEditor
			revision={createHash('sha1').update(JSON.stringify(overrides)).digest('hex')}
			sections={buildAdminSections(BASE_CONTENT, overrides)}
			historyCount={await countHistory()}
			saveAction={saveContent}
			undoAction={undoLastSave}
		/>
	)
}
