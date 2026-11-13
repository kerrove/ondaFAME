import styles from './Admin.module.scss'
import { AdminField } from './AdminField'
import type { AdminSection } from '@/utils/admin-sections'

interface Props {
	section: AdminSection
	onReset: (key: string, original: string) => void
}

/** Раздел свёрнут по умолчанию: полей больше сотни, открытыми они превращаются в простыню */
export function AdminSectionBlock({ section, onReset }: Props) {
	return (
		<details className={styles.section}>
			<summary className={styles.summary}>
				<span className={styles.sectionTitle}>{section.title}</span>
				{section.changed > 0 && (
					<span className={styles.badge}>изменено полей: {section.changed}</span>
				)}
			</summary>

			<div className={styles.sectionBody}>
				{section.hint && <p className={styles.hint}>{section.hint}</p>}

				{section.groups.map(group => (
					<fieldset
						key={group.id}
						className={styles.group}
					>
						{group.title && <legend className={styles.groupTitle}>{group.title}</legend>}

						{group.fields.map(field => (
							<AdminField
								key={field.key}
								field={field}
								onReset={onReset}
							/>
						))}
					</fieldset>
				))}
			</div>
		</details>
	)
}
