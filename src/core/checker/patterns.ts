// https://github.com/MagicFloppy/kurwayou.txt/blob/main/kurwayou.txt
// https://github.com/danielmiessler/SecLists/tree/master/Passwords

export function isCommonPassword(password: string, set: Set<string>): boolean {
  const lower = password.toLocaleLowerCase()
  return set.has(lower)
}

// https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Keyboard-Walks/Keyboard-Combinations.txt

export function hasWalks(password: string, walks: Array<string>): boolean {
  const lower = password.toLocaleLowerCase()
  if (lower.length < 4) return false
  return walks.some((walk) => {
    const lowerWalk = walk.toLocaleLowerCase()
    return lower.includes(lowerWalk) || lowerWalk.includes(lower)
  })
}

// (.{2,})\1
// (      ) - capture group, saves the matched text for reuse
// .        - any character
// {2,}     - 2 or more times (so the group matches at least 2 chars)
// \1       - backreference, must match the exact same text as the capture group
// together: any sequence of 2+ chars followed immediately by itself
// e.g. abcabc ("abc" + "abc"), 123123 ("123" + "123")
export function hasRepeatedSequence(password: string): boolean {
  return /(.{2,})\1/.test(password)
}

// DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY
// e.g. 12.05.1990, 12/05/90, 12-05-1990
const separatorDate = /\d{1,2}[.\-/]\d{1,2}[.\-/]\d{2,4}/

// YYYYMMDD
// e.g. 19901205
const isoDate = /\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/

// DDMMYYYY or MMDDYYYY (no separator)
// e.g. 12051990
const compactDate = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{4}/

// YYYY alone (birth years, common in passwords)
// e.g. 1990, 2001
const yearOnly = /(19|20)\d{2}/

export function hasDatePattern(password: string): boolean {
  return (
    separatorDate.test(password) ||
    isoDate.test(password) ||
    compactDate.test(password) ||
    yearOnly.test(password)
  )
}
