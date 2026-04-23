import { CHARSET } from '#/lib/charset'
import { randomChar, shuffle } from '#/lib/random'

const MAX_LENGTH = 256
const MIN_LENGTH = 4

export type RandomFlags = {
  includeUppercase: boolean
  includeNumbers: boolean
  includeSpecialChars: boolean
}

export type RandomPasswordOptions = {
  length: number
  flags: RandomFlags
}

export const defaultRandomPasswordValues: RandomPasswordOptions = {
  length: 16,
  flags: {
    includeNumbers: true,
    includeSpecialChars: true,
    includeUppercase: true,
  },
}

export function generateRandomPassword({
  length,
  flags,
}: RandomPasswordOptions): string {
  if (MAX_LENGTH <= length) {
    throw new Error('Length must be at most 256')
  }
  if (length <= MIN_LENGTH) {
    throw new Error('Length must be at least 4')
  }
  let charset: Array<string> = [CHARSET.lower]
  let password = ''

  if (flags.includeUppercase) {
    charset.push(CHARSET.upper)
    password += randomChar(CHARSET.upper)
    length -= 1
  }

  if (flags.includeNumbers) {
    charset.push(CHARSET.numbers)
    password += randomChar(CHARSET.numbers)
    length -= 1
  }

  if (flags.includeSpecialChars) {
    charset.push(CHARSET.special)
    password += randomChar(CHARSET.special)
    length -= 1
  }

  const charsetString = charset.join('')

  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)

  return shuffle(
    Array.from(bytes)
      .map((b) => charsetString[b % charsetString.length])
      .concat(password)
      .join(''),
  )
}

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

type Separator = '-' | ' ' | '.' | ',' | '_' | ''

type SeparatorOption =
  | { type: 'default'; value: Separator }
  | { type: 'custom'; value: string }

type WordPasswordOptions = {
  count: number
  flags: WordFlags
  langs: WordLang
  separator: SeparatorOption
}

const defaultWordPasswordValues: WordPasswordOptions = {
  count: 5,
  flags: { includeUppercase: true, includeNumber: false },
  langs: { includeEnglish: true, includePolish: false },
  separator: { type: 'default', value: '-' },
}

export function generateWordPassword(
  { count, flags, separator }: WordPasswordOptions,
  wordsList: Array<string>,
): string {
  // TODO check all the ifs max,min,separator

  const bytes = new Uint8Array(count)
  crypto.getRandomValues(bytes)

  let array = Array.from(bytes).map((b) => wordsList[b % wordsList.length])

  if (flags.includeUppercase) {
    array = array.map((word) => word[0].toUpperCase() + word.slice(1))
  }

  if (flags.includeNumber) {
    array = array.map((word) => word + randomChar(CHARSET.numbers))
  }

  return array.join(separator.value)
}

// const wordList = [
//   'truck',
//   'phone',
//   'elephant',
//   'music',
//   'nachos',
//   'compuer',
//   'design',
// ]
// const args: WordPasswordOptions = {
//   ...defaultWordPasswordValues,
//   separator: { type: 'custom', value: 'dupa' },
//   flags: {
//     ...defaultWordPasswordValues.flags,
//     includeNumber: true,
//   },
// }
// const res = generateWordPassword(args, wordList)
// console.log(res)
