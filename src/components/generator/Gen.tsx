import { Button } from '#/components/ui/button'

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '#/components/ui/popover.tsx'
import type { PasswordGeneratorType } from '#/core/generator/genType'
import {
  defaultRandomPasswordValues,
  generateRandomPassword,
} from '#/core/generator/randomGen'
import {
  defaultWordPasswordValues,
  generateWordPassword,
} from '#/core/generator/wordGen'
import { Cog, RefreshCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { ButtonGroup, ButtonGroupSeparator } from '../ui/button-group'

import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { RandomOptions } from './RandomOpts'
import { WordOptions } from './WordOpts'

type Props = {
  setPassword: (password: string) => void
}

export default function Gen({ setPassword }: Props) {
  const [type, setType] = useState<PasswordGeneratorType>('random')
  const [randomOpts, setRandomOpts] = useState(defaultRandomPasswordValues)
  const [wordOpts, setWordOpts] = useState(defaultWordPasswordValues)

  const iconRef = useRef<SVGSVGElement>(null)

  const handleClick = () => {
    handleGenerate(type)
    const el = iconRef.current
    if (el) {
      el.classList.remove('animate-spin-once')
      void el.getBoundingClientRect() // force reflow
      el.classList.add('animate-spin-once')
    }
  }

  function handleGenerate(genType: PasswordGeneratorType) {
    let password = ''
    if (genType === 'random') {
      password = generateRandomPassword(randomOpts)
    } else {
      const words = ['test', 'xD', 'lol']
      password = generateWordPassword(wordOpts, words)
    }

    setPassword(password)
  }

  return (
    <div>
      <ButtonGroup>
        <Button size="lg" className="cursor-pointer" onClick={handleClick}>
          Generate
          <RefreshCcw ref={iconRef} aria-hidden="true" />
        </Button>
        <ButtonGroupSeparator />
        <Popover>
          <PopoverTrigger asChild>
            <Button size="lg" className="cursor-pointer">
              <Cog />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Generator Settings</PopoverTitle>
              <PopoverDescription>
                Choose your preferred password.
              </PopoverDescription>
            </PopoverHeader>
            <div className="grid gap-4 mt-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="generator type">Type</Label>
                <Select
                  value={type}
                  onValueChange={(value) =>
                    setType(value as PasswordGeneratorType)
                  }
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectItem value="random">random</SelectItem>
                      <SelectItem value="word">word</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                {type === 'random' ? (
                  <RandomOptions value={randomOpts} onChange={setRandomOpts} />
                ) : (
                  <WordOptions value={wordOpts} onChange={setWordOpts} />
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    </div>
  )
}
