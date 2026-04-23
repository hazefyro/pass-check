import { bench, describe } from 'vitest'
import { shuffle } from './random'
import { CHARSET } from './charset'

describe('shuffle performance', () => {
  bench('shuffle', () => {
    shuffle(CHARSET.lower)
  })
})
