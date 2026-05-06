import { Button } from '#/components/ui/button'

import type { PasswordGeneratorType } from '#/core/generator/genType'
import {
  defaultRandomPasswordValues,
  generateRandomPassword,
} from '#/core/generator/randomGen'
import {
  defaultWordPasswordValues,
  generateWordPassword,
} from '#/core/generator/wordGen'
import { CheckIcon, Cog, CopyIcon, RefreshCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { ButtonGroup, ButtonGroupSeparator } from '../ui/button-group'

import { useCopyToClipboard } from '#/hook/use-copy-to-clipboard'
import { useQuery } from '@tanstack/react-query'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
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
  password: string
  setPassword: (password: string) => void
}

export default function Gen({ password, setPassword }: Props) {
  const [type, setType] = useState<PasswordGeneratorType>('random')
  const [randomOpts, setRandomOpts] = useState(defaultRandomPasswordValues)
  const [wordOpts, setWordOpts] = useState(defaultWordPasswordValues)
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 1500 })

  const { data: englishWords } = useQuery({
    queryKey: ['englishWords'],
    queryFn: () => fetchWords('/files/words.json'),
    enabled: wordOpts.langs.includeEnglish,
    staleTime: Infinity,
  })
  const { data: polishWords } = useQuery({
    queryKey: ['polishWords'],
    queryFn: () => fetchWords('/files/words-pl.json'),
    enabled: wordOpts.langs.includePolish,
    staleTime: Infinity,
  })

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
    let newPassword = ''
    if (genType === 'random') {
      newPassword = generateRandomPassword(randomOpts)
    } else {
      const words: string[] = []
      if (wordOpts.langs.includeEnglish) words.push(...(englishWords ?? []))
      if (wordOpts.langs.includePolish) words.push(...(polishWords ?? []))
      newPassword = generateWordPassword(wordOpts, words)
    }

    setPassword(newPassword)
  }

  return (
    <div>
      <ButtonGroup className="mx-auto">
        <Button size="lg" className="cursor-pointer" onClick={handleClick}>
          Generate
          <RefreshCcw ref={iconRef} aria-hidden="true" />
        </Button>
        <ButtonGroupSeparator />
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button size="lg" className="cursor-pointer">
              Settings
              <Cog />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Generator Settings</DrawerTitle>
              <DrawerDescription>
                Choose your preferred password.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-6 px-4 pb-6 pt-4">
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
                      <SelectItem value="random">Random</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                {type === 'random' ? (
                  <RandomOptions value={randomOpts} onChange={setRandomOpts} />
                ) : (
                  <WordOptions value={wordOpts} onChange={setWordOpts} />
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <ButtonGroupSeparator />
        <Button
          size={'lg'}
          aria-label={isCopied ? 'Copied' : 'Copy'}
          onClick={() => copyToClipboard(password)}
        >
          Copy
          {isCopied ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </Button>
      </ButtonGroup>
    </div>
  )
}

export async function fetchWords(href: string): Promise<string[]> {
  const res = await fetch(href)
  const json = await res.json()
  return json
}
