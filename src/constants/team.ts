import { ImagesConfig } from '@/configs/images.config'
import type { TeamMember } from '@/types'

/**
 * Фотографии команды пока не переданы отдельными файлами — до тех пор карточка рисует инициалы
 * в фирменной плитке. Чтобы подставить портрет, положите файл в /public/team и укажите путь в photo.
 */
export const TEAM: TeamMember[] = [
	{ id: 'nazar', name: 'Назар Потапов', role: 'Генеральный директор', photo: ImagesConfig.NAZAR },
	{
		id: 'yakovlev',
		name: 'Александр Яковлев',
		role: 'Ведущий специалист таргетированной рекламы',
		photo: ImagesConfig.YAKOVLEV
	},
	{
		id: 'semernikov',
		name: 'Владислав Семерников',
		role: 'Специалист технической поддержки',
		photo: ImagesConfig.SEMERNIKOV
	},
	{
		id: 'shutikov',
		name: 'Александр Шутиков',
		role: 'Специалист технической поддержки',
		photo: ImagesConfig.SHUTIKOV
	}
]
