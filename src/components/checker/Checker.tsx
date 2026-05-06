import type { StrengthLabel } from '#/core/checker/entropy'
import { getPasswordEntropy, getStrengthLabel } from '#/core/checker/entropy'
import { CheckIcon, XIcon } from 'lucide-react'
import { useMemo } from 'react'

type Props = {
  password: string
}

type Requirements = {
  name: string
  pass: (value: string) => boolean
}

export const Checker = ({ password }: Props) => {
  const entropy = Math.floor(
    useMemo(() => getPasswordEntropy(password), [password]),
  )

  const label = getStrengthLabel(entropy)
  const isStrong = isLabelEnough(label)

  // const reqs: Requirements = [
  //   {
  //     name: 'Not common',
  //     pass: (value: string) => isCommonPassword(value),
  //   },
  // ]

  return (
    <div>
      checker
      <div>
        <ul>
          <li className="flex items-center gap-1" key="entropy">
            {isStrong ? (
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
            <div className="flex flex-col">
              <span
                className={`text-md transition-colors ${isStrong ? 'text-emerald-600' : 'text-muted-foreground'}`}
              >
                <span>At least 80 bits of entropy</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
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

function isLabelEnough(label: StrengthLabel): boolean {
  switch (label) {
    case 'weak':
      return false
    case 'moderate':
      return false
    case 'strong':
      return true
    case 'veryStrong':
      return true
  }
}
