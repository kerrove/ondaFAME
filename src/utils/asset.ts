/**
 * Путь к файлу из /public с учётом базового пути развёртывания.
 *
 * На GitHub Pages сайт живёт в подкаталоге (/ondaFAME), и basePath Next подставляет сам только в
 * next/link и в метаданные файловой конвенции (icon, manifest, opengraph-image). В src у
 * next/image и в путях, написанных руками, его нет — файл лежит по /ondaFAME/song.avif, а
 * браузер просит /song.avif и получает 404. Ровно это описано в документации basePath.
 *
 * Значение инлайнится в бандл на сборке, поэтому смена подкаталога требует пересборки.
 * Локально переменная не задана — путь остаётся прежним.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function asset(path: string) {
	return `${BASE_PATH}${path}`
}
