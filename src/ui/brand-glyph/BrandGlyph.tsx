import { GLYPH_VIEW_BOX } from './BrandSprite'
import type { AggregatorId } from '@/types'

interface Props {
	id: AggregatorId
}

/**
 * Ссылка на знак из спрайта. Контур лежит в разметке один раз, здесь остаётся только рамка
 * с нужной пропорцией: цвет наследуется от неё же через currentColor.
 */
export function BrandGlyph({ id }: Props) {
	return (
		<svg
			viewBox={GLYPH_VIEW_BOX[id]}
			fill='currentColor'
			aria-hidden='true'
		>
			<use href={`#brand-${id}`} />
		</svg>
	)
}
