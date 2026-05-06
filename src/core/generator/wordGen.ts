import { CHARSET } from '#/lib/charset'
import { randomChar, randomInt } from '#/lib/random'

const MAX_COUNT = 10
const MIN_COUNT = 2
const MAX_CUSTOM_SEPARATOR_LENGTH = 5

type WordFlags = {
  includeUppercase: boolean
  includeNumber: boolean
}

type WordLang = {
  includeEnglish: boolean
  includePolish: boolean
}

export type Separators = '-' | ' ' | '.' | ',' | '_' | ''

type SeparatorOption =
  | { type: 'default'; value: Separators }
  | { type: 'custom'; value: string }

export type WordPasswordOptions = {
  count: number
  flags: WordFlags
  langs: WordLang
  separator: SeparatorOption
}

export const defaultWordPasswordValues: WordPasswordOptions = {
  count: 4,
  flags: { includeUppercase: true, includeNumber: false },
  langs: { includeEnglish: true, includePolish: false },
  separator: { type: 'default', value: '-' },
}

export function generateWordPassword(
  { count, flags, separator }: WordPasswordOptions,
  wordsList: Array<string>,
): string {
  if (count < MIN_COUNT) {
    throw new Error('Word count must be at least 2')
  }
  if (MAX_COUNT < count) {
    throw new Error('Word count must be at most 10')
  }
  if (
    separator.type === 'custom' &&
    MAX_CUSTOM_SEPARATOR_LENGTH <= separator.value.length
  ) {
    throw new Error('Separator length must be at most 5')
  }
  const bytes = new Uint8Array(count)
  crypto.getRandomValues(bytes)

  let array = Array.from(
    { length: count },
    () => wordsList[randomInt(wordsList.length)],
  )

  if (flags.includeUppercase) {
    array = array.map((word) => word[0].toUpperCase() + word.slice(1))
  }

  if (flags.includeNumber) {
    array = array.map((word) => word + randomChar(CHARSET.numbers))
  }

  return array.join(separator.value)
}
