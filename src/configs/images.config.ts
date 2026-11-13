import { asset } from '@/utils/asset'

/** Файлы из /public. Пути идут через asset(): на GitHub Pages сайт живёт в подкаталоге. */
export class ImagesConfig {
	static readonly NAZAR = asset('/team/nazar.avif')
	static readonly YAKOVLEV = asset('/team/yakovlev.avif')
	static readonly SEMERNIKOV = asset('/team/semernikov.avif')
	static readonly SHUTIKOV = asset('/team/shutikov.avif')
	static readonly SHVECHIHIN = asset('/team/shvechihin.avif')
	static readonly CHEREDNICHENKO = asset('/team/cherednichenko.avif')
	static readonly COOPER = asset('/team/cooper.avif')
	static readonly SONG = asset('/song.avif')
	static readonly NOTER_DAME = asset('/noterdamedeparis.webp')
	static readonly LIL_CRYSTALLL = asset('/lyl-crystall.jpg')
}
