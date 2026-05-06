import { describe, expect, it } from 'vitest'
import type { RandomPasswordOptions } from './randomGen'
import {
  defaultRandomPasswordValues,
  generateRandomPassword,
} from './randomGen'

describe('randomGenerator', () => {
  describe('defaultOptions', () => {
    it('returns string of length 16', () => {
      const result = generateRandomPassword(defaultRandomPasswordValues)
      expect(result.length).toBe(16)
    })
    it('includes uppercase letter', () => {
      const result = generateRandomPassword(defaultRandomPasswordValues)
      expect(result).toMatch(/[A-Z]/)
    })
    it('includes numbers', () => {
      const result = generateRandomPassword(defaultRandomPasswordValues)
      expect(result).toMatch(/[0-9]/)
    })
    it('includes special character', () => {
      const result = generateRandomPassword(defaultRandomPasswordValues)
      expect(result).toMatch(/[!@#$%^&*()]/)
    })
  })
  it('returns password with correct length', () => {
    const args = {
      ...defaultRandomPasswordValues,
      length: 10,
    }
    const result = generateRandomPassword(args)
    expect(result.length === 10).toBe(true)
  })
  it('includes lowercase letter', () => {
    const result = generateRandomPassword(defaultRandomPasswordValues)
    expect(result).toMatch(/[a-z]/)
  })
  it('includes uppercase letter when enabled', () => {
    const args: RandomPasswordOptions = {
      ...defaultRandomPasswordValues,
      flags: { ...defaultRandomPasswordValues.flags, includeUppercase: true },
    }
    const result = generateRandomPassword(args)
    expect(result).toMatch(/[A-Z]/)
  })
  it('includes number when enabled', () => {
    const args: RandomPasswordOptions = {
      ...defaultRandomPasswordValues,
      flags: { ...defaultRandomPasswordValues.flags, includeNumbers: true },
    }
    const result = generateRandomPassword(args)
    expect(result).toMatch(/[0-9]/)
  })
  it('includes special character when enabled', () => {
    const args: RandomPasswordOptions = {
      ...defaultRandomPasswordValues,
      flags: { ...defaultRandomPasswordValues.flags, includeNumbers: true },
    }
    const result = generateRandomPassword(args)
    expect(result).toMatch(/[!@#$%^&*()]/)
  })
  it('does not includes uppercase letter when disabled', () => {
    const args: RandomPasswordOptions = {
      ...defaultRandomPasswordValues,
      flags: {
        ...defaultRandomPasswordValues.flags,
        includeUppercase: false,
      },
    }
    const result = generateRandomPassword(args)
    expect(result).not.toMatch(/[A-Z]/)
  })
  it('does not includes number when disabled', () => {
    const args: RandomPasswordOptions = {
      ...defaultRandomPasswordValues,
      flags: {
        ...defaultRandomPasswordValues.flags,
        includeNumbers: false,
      },
    }
    const result = generateRandomPassword(args)
    expect(result).not.toMatch(/[0-9]/)
  })
  it('does not includes special character when disabled', () => {
    const args: RandomPasswordOptions = {
      ...defaultRandomPasswordValues,
      flags: {
        ...defaultRandomPasswordValues.flags,
        includeSpecialChars: false,
      },
    }
    const result = generateRandomPassword(args)
    expect(result).not.toMatch(/[!@#$%^&*()]/)
  })

  it('throws for too short length', () => {
    const args = {
      ...defaultRandomPasswordValues,
      length: 3,
    }

    expect(() => generateRandomPassword(args)).toThrow('least')
  })
  it('throws for too long length', () => {
    const args = {
      ...defaultRandomPasswordValues,
      length: 257,
    }

    expect(() => generateRandomPassword(args)).toThrow('most')
  })
})
