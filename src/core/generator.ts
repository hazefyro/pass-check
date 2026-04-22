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

type WordFlags = {
  includeUppercase: boolean
  includeNumber: boolean
}

type WordLang = {
  includeEnglish: boolean
  includePolish: boolean
}

type WordPasswordOptions = {
  count: number
  flags: WordFlags
  langs: WordLang
  separator:
    | 'hyphens'
    | 'spaces'
    | 'periods'
    | 'commas'
    | 'underscores'
    | 'nothing'
}

const defaultWordPasswordValues: WordPasswordOptions = {
  count: 5,
  flags: { includeUppercase: true, includeNumber: false },
  langs: { includeEnglish: true, includePolish: false },
  separator: 'hyphens',
}

export function generateWordPassword(
  { count, flags, separator }: WordPasswordOptions,
  wordsList: Array<string>,
): string {
  return ''
}
