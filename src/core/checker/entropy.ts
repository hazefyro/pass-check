export function getPasswordEntropy(password: string): number {
  if (password.length === 0) return 0
  const length = password.length
  const array = password.split('')
  const uniqueChars = new Set(array)

  return length * Math.log2(uniqueChars.size)
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
