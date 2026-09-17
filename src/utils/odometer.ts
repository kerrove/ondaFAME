/**
 * Геометрия и барабаны табло. Знакоместа считаются справа налево и имеют фиксированную ширину
 * в долях кегля — только так разряд остаётся на своём месте, когда число меняет длину, а поле
 * может плавно расширяться вместе с числом.
 */

/** Ширина цифры и разделителя разрядов в долях кегля */
const DIGIT = 0.6
const SEPARATOR = 0.28

/** Разряды сгруппированы по три справа, поэтому разделитель всегда занимает каждое 4-е место */
export function isSeparator(place: number) {
	return place % 4 === 3
}

export function placeWidth(place: number) {
	return isSeparator(place) ? SEPARATOR : DIGIT
}

/** Расстояние от правого края табло до знакоместа */
export function placeOffset(place: number) {
	let offset = 0

	for (let index = 0; index < place; index++) offset += placeWidth(index)

	return offset
}

/** Полная ширина числа в долях кегля */
export function fieldWidth(value: string) {
	return placeOffset(value.length)
}

/** Полный оборот барабана: десять цифр */
const REVOLUTION = 10

const digit = (value: number) => String(((value % 10) + 10) % 10)

/**
 * Грани барабана сверху вниз. Нижняя — то, что видно сейчас, верхняя — то, на чём он
 * остановится, между ними цифры, через которые он прокручивается. Лишний оборот нужен, чтобы
 * разряд успел набрать скорость: без него смена 8 → 9 читается как подмена знака, а не как разгон.
 */
export function spinFaces(from: string, to: string) {
	// Разряд уходит: барабан докручивает оборот и останавливается на пустоте
	if (to === '') {
		const faces = ['']

		for (let step = REVOLUTION - 1; step >= 0; step--) faces.push(digit(Number(from) + step))

		return faces
	}

	const target = Number(to)
	// Приходящий разряд крутится ровно оборот, остальные — оборот плюс разницу цифр
	const travel = from === '' ? REVOLUTION : ((target - Number(from) + 10) % 10) + REVOLUTION
	const faces = Array.from({ length: travel + 1 }, (_, step) => digit(target - step))

	// Разряда раньше не было: барабан приходит из пустоты
	if (from === '') faces[travel] = ''

	return faces
}
