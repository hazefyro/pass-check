import { describe, expect, it } from 'vitest'
import { defaultGeneratorValues, generateRandom } from './generator'
import { CHARSET } from '#/lib/charset'

describe('generatePassword', () => {
  describe('randomGenerator', () => {
    describe('defaultOptions', () => {
      it('returns string of lenght 16', () => {
        const result = generateRandom(defaultGeneratorValues)
        expect(result.length).toBe(16)
      })
      it('includes uppercase letter', () => {
        const result = generateRandom(defaultGeneratorValues)
        expect(result.includes(CHARSET.upper))
      })
      it('includes numbers', () => {
        const result = generateRandom(defaultGeneratorValues)
        expect(result.includes(CHARSET.numbers))
      })
      it('includes special character', () => {
        const result = generateRandom(defaultGeneratorValues)
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
        ...defaultGeneratorValues,
        length: 3,
      }

      expect(() => generateRandom(args)).toThrow('least')
    })
    it('throws for too long length', () => {
      const args = {
        ...defaultGeneratorValues,
        length: 257,
      }

      expect(() => generateRandom(args)).toThrow('most')
    })
  })
})
