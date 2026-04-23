import { bench, describe } from 'vitest'
import { shuffle } from './random'
import { CHARSET } from './charset'

describe('shuffle performance', () => {
  bench('crypto shuffle', () => {
    shuffle(CHARSET.lower)
  })
})
