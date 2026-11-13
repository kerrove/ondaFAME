import { ImagesConfig } from '@/configs/images.config'
import type { SiteContent, TeamMember } from '@/types'

/**
 * Портреты подклеиваются к карточке по id. Путь к файлу — не текст, поэтому в content.json его
 * нет: чтобы подставить портрет, положите файл в /public/team и допишите строку сюда.
 * Пока фото нет, карточка рисует инициалы фирменной плиткой.
 */
const PHOTOS: Record<string, string | undefined> = {
	nazar: ImagesConfig.NAZAR,
	yakovlev: ImagesConfig.YAKOVLEV,
	semernikov: ImagesConfig.SEMERNIKOV,
	shutikov: ImagesConfig.SHUTIKOV,
	shvechihin: ImagesConfig.SHVECHIHIN,
	cherednichenko: ImagesConfig.CHEREDNICHENKO,
	cooper: ImagesConfig.COOPER
}

export function getTeam(content: SiteContent): TeamMember[] {
	return content.team.members.map(member => ({
		...member,
		photo: PHOTOS[member.id] ?? null
	}))
}
