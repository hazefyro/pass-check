function randomInt(max: number): number {
  const arr = new Uint32Array(1)
  crypto.getRandomValues(arr)
  return arr[0] % max
}

export function randomChar(str: string) {
  return str[randomInt(str.length)]
}

export function shuffle(str: string): string {
  const arr = str.split('')

  for (let i = arr.length - 1; i > 0; i--) {
    const rand = new Uint32Array(1)
    crypto.getRandomValues(rand)
    const j = rand[0] % (i + 1)

    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  return arr.join('')
}
