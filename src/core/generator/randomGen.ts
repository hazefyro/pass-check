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
  length: 18,
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
  if (MAX_LENGTH < length) {
    throw new Error('Password length must be at most 256')
  }
  if (length < MIN_LENGTH) {
    throw new Error('Password length must be at least 4')
  }
  const charset: Array<string> = [CHARSET.lower]
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
