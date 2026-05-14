const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGIT_CHARS = '0123456789'
const SPECIAL_CHARS = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`

const SPECIAL_SET = new Set(SPECIAL_CHARS)
const KNOWN_CHARS = new Set(
  LOWERCASE_CHARS + UPPERCASE_CHARS + DIGIT_CHARS + SPECIAL_CHARS,
)

export function getPasswordEntropy(password: string): number {
  if (password.length === 0) return 0

  const chars = [...password]
  let pool = 0

  if (/[a-z]/.test(password)) pool += LOWERCASE_CHARS.length
  if (/[A-Z]/.test(password)) pool += UPPERCASE_CHARS.length
  if (/[0-9]/.test(password)) pool += DIGIT_CHARS.length
  if (chars.some((c) => SPECIAL_SET.has(c))) pool += SPECIAL_CHARS.length
  // BMP Unicode beyond standard ASCII printable range
  if (chars.some((c) => !KNOWN_CHARS.has(c))) pool += 65536

  return password.length * Math.log2(pool)
}

// https://pages.nist.gov/800-63-3/sp800-63b.html
// < 40 bits -- weak -- 0
// 40-60 bits -- moderate -- 1
// 60-80 bits -- strong for most use cases -- 2
// 80+ bits -- very strong -- 3
export type StrengthLabel = 'weak' | 'moderate' | 'strong' | 'veryStrong'

export function getStrengthLabel(entropy: number): StrengthLabel {
  if (entropy < 40) return 'weak'
  if (entropy < 60) return 'moderate'
  if (entropy < 80) return 'strong'
  return 'veryStrong'
}
