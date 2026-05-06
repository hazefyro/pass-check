import { getPasswordEntropy } from '#/core/checker/entropy'
import { ChevronDownIcon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'

type Props = {
  password: string
}

type Stat = {
  name: string
  value: string | number
}[]

export const Stats = ({ password }: Props) => {
  const entropy = Math.floor(getPasswordEntropy(password) * 100) / 100
  const length = password.length
  const unique = uniqueChars(password)

  const stats: Stat = [
    { name: 'Entropy', value: `${entropy} bits` },
    { name: 'Length', value: length },
    { name: 'Unique chars', value: unique },
    { name: 'Crack time', value: crackTime(entropy) },
  ]

  return (
    <Card className="rounded-xl col-span-1 md:col-span-2 self-start p-6">
      <Collapsible>
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between">
          <h2>Stats</h2>
          <ChevronDownIcon
            aria-hidden="true"
            className="text-muted-foreground size-4 shrink-0 transition-transform in-data-[state=open]:rotate-180"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <CardContent className="px-0 pt-2">
            <ul className="divide-y divide-border">
              {stats.map(({ name, value }) => (
                <li
                  key={name}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="text-muted-foreground">{name}</span>
                  <span className="font-medium tabular-nums">{value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

function uniqueChars(password: string): number {
  return new Set<string>(password.split('')).size
}

function crackTime(entropy: number): string {
  if (entropy === 0) return 'instantly'
  const seconds = Math.pow(2, entropy) / 1e10
  if (seconds < 1) return 'instantly'
  if (seconds < 60) return `${Math.round(seconds)} s`
  if (seconds < 3600) return `${Math.round(seconds / 60)} m`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} h`
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} d`
  const years = seconds / 31536000
  if (years < 1e6) return `${Math.round(years).toLocaleString()} y`
  return 'centuries'
}
