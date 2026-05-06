import {
  generateRandomPassword,
  defaultRandomPasswordValues,
} from '#/core/generator'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'
import { RefreshCcw } from 'lucide-react'

type Props = {
  setPassword: (password: string) => void
}

export default function Gen({ setPassword }: Props) {
  function handleGenerate() {
    setPassword(generateRandomPassword(defaultRandomPasswordValues))
  }

  return (
    <div className="m-10">
      <Button
        size="lg"
        className="group shadow-sm hover:shadow-md active:shadow-none hover:scale-[1.03] active:scale-[0.97] duration-150 ease-out"
        onClick={handleGenerate}
      >
        Generate
        <RefreshCcw
          aria-hidden="true"
          className={cn(
            'transition-transform duration-500 ease-out group-hover:rotate-180',
          )}
        />
      </Button>
    </div>
  )
}
