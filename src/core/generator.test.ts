import { describe, expect, it } from 'vitest'
import {
  defaultRandomPasswordValues,
  generateRandomPassword,
} from './generator'
import { CHARSET } from '#/lib/charset'

describe('generatePassword', () => {
  describe('randomGenerator', () => {
    describe('defaultOptions', () => {
      it('returns string of lenght 16', () => {
        const result = generateRandomPassword(defaultRandomPasswordValues)
        expect(result.length).toBe(16)
      })
      it('includes uppercase letter', () => {
        const result = generateRandomPassword(defaultRandomPasswordValues)
        expect(result.includes(CHARSET.upper))
      })
      it('includes numbers', () => {
        const result = generateRandomPassword(defaultRandomPasswordValues)
        expect(result.includes(CHARSET.numbers))
      })
      it('includes special character', () => {
        const result = generateRandomPassword(defaultRandomPasswordValues)
        expect(result.includes(CHARSET.special))
      })
    })
    it('returs password with correct length')
    it('includes lowercase letter')
    it('includes uppercase letter when enabled')
    it('includes number when enabled')
    it('includes special character when enabled')
    it('does not includes uppercase letter when disabled')
    it('does not includes number when disabled')
    it('does not includes special character when disabled')

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
})
