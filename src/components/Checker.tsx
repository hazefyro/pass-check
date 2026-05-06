import { getPasswordEntropy } from '#/core/checker/entropy'
import {
  hasDatePattern,
  hasRepeatedSequence,
  hasWalks,
  isCommonPassword,
} from '#/core/checker/patterns'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, XIcon } from 'lucide-react'

type Props = {
  password: string
}

type Requirements = {
  name: string
  pass: boolean
}[]

export const Checker = ({ password }: Props) => {
  const entropy = Math.floor(getPasswordEntropy(password))

  const { data: commonEnglish } = useQuery({
    queryKey: ['englishCommon'],
    queryFn: () => fetchCommon('/files/english_top10k.txt'),
    staleTime: Infinity,
  })
  const { data: commonPolish } = useQuery({
    queryKey: ['polishCommon'],
    queryFn: () => fetchCommon('/files/polish_top10k.txt'),
    staleTime: Infinity,
  })
  const { data: walks } = useQuery({
    queryKey: ['walks'],
    queryFn: () => fetchWalks('/files/keyboard_walks.txt'),
    staleTime: Infinity,
  })

  const commonSet = new Set<string>([
    ...(commonEnglish ?? []),
    ...(commonPolish ?? []),
  ])

  const reqs: Requirements = [
    { name: 'Entropy ≥ 30 bits', pass: entropy >= 30 },
    { name: 'Entropy ≥ 50 bits', pass: entropy >= 50 },
    { name: 'Entropy ≥ 70 bits', pass: entropy >= 70 },
    { name: 'Entropy ≥ 90 bits', pass: entropy >= 90 },
    { name: '8+ characters', pass: password.length >= 8 },
    { name: '12+ characters', pass: password.length >= 12 },
    { name: '16+ characters', pass: password.length >= 16 },
    { name: '20+ characters', pass: password.length >= 20 },
    {
      name: 'Not on common list',
      pass: !isCommonPassword(password, commonSet) && password.length != 0,
    },
    {
      name: 'No keyboard walks',
      pass: !hasWalks(password, walks ?? []) && password.length != 0,
    },
    {
      name: 'No repeated sequences',
      pass: !hasRepeatedSequence(password) && password.length != 0,
    },
    {
      name: 'No date patterns',
      pass: !hasDatePattern(password) && password.length != 0,
    },
  ]

  const strengthLevel = reqs.filter((r) => r.pass).length

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2>Strength</h2>
        <span className="text-sm text-foreground/70">
          {strengthLevel}/12 requirements met
        </span>
      </div>
      <div
        aria-label="Password strength"
        aria-valuemax={12}
        aria-valuemin={0}
        aria-valuenow={strengthLevel}
        className="mt-3 mb-4 flex gap-1"
        role="progressbar"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full  ${
              i < strengthLevel ? getStrengthColor(strengthLevel) : 'bg-border'
            }`}
          />
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-x-4">
        {reqs.map(({ name, pass }) => (
          <li className="flex items-center gap-1" key={name}>
            {pass ? (
              <CheckIcon
                className="size-3.5 text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <XIcon
                className="text-muted-foreground/60 size-3.5"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-md transition-colors ${pass ? 'text-emerald-600' : 'text-muted-foreground'}`}
            >
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// function mapEntropy(label: StrengthLabel): string {
//   switch (label) {
//     case 'weak':
//       return 'weak'
//     case 'moderate':
//       return 'moderate'
//     case 'strong':
//       return 'strong'
//     case 'veryStrong':
//       return 'very strong'
//   }
// }

async function fetchCommon(href: string): Promise<Set<string>> {
  const res = await fetch(href)
  const text = await res.text()
  return new Set(
    text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
  )
}

async function fetchWalks(href: string): Promise<string[]> {
  const res = await fetch(href)
  const text = await res.text()
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

const getStrengthColor = (score: number) => {
  if (score === 0) return 'bg-border'
  if (score <= 2) return 'bg-red-500'
  if (score <= 4) return 'bg-orange-500'
  if (score <= 6) return 'bg-amber-500'
  if (score <= 8) return 'bg-yellow-500'
  if (score <= 10) return 'bg-green-500'
  return 'bg-emerald-500'
}
