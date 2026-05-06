import type { WordPasswordOptions } from '#/core/generator/wordGen'
import { Field, FieldContent, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'

export const WordOptions = ({
  value,
  onChange,
}: {
  value: WordPasswordOptions
  onChange: (opts: WordPasswordOptions) => void
}) => {
  const flagSwitches = [
    { name: 'Include Uppercase', key: 'includeUppercase' },
    { name: 'Include Numbers', key: 'includeNumber' },
  ] as const

  const langSwitches = [
    { name: 'Include English Words', key: 'includeEnglish' },
    { name: 'Include Polish Words', key: 'includePolish' },
  ] as const

  return (
    <div className="grid gap-6">
      <Field className="w-full max-w-xs grid">
        <div className="grid items-center justify-between ">
          <FieldLabel htmlFor="range-slider">Word count</FieldLabel>
          <span className="text-muted-foreground text-xs font-medium col-end-3">
            {value.count}
          </span>
        </div>
        <Input
          id="range-slider"
          type="range"
          min="2"
          max="10"
          value={value.count}
          onChange={(v) =>
            onChange({ ...value, count: parseInt(v.target.value) })
          }
          className="grid-cols-2 bg-muted accent-primary h-2 cursor-pointer appearance-none"
        />
      </Field>
      {flagSwitches.map(({ name, key }) => (
        <Field
          orientation="horizontal"
          className="max-w-sm grid-cols-3"
          key={key}
        >
          <FieldContent className="grid">
            <FieldLabel htmlFor="switch-focus-mode" className="grid">
              {name}
            </FieldLabel>
          </FieldContent>
          <Switch
            id="switch-focus-mode"
            className="grid-cols-2"
            checked={value.flags[key]}
            onCheckedChange={(v) =>
              onChange({ ...value, flags: { ...value.flags, [key]: v } })
            }
          />
        </Field>
      ))}
      <Separator />
      <FieldLabel>Words language</FieldLabel>
      {langSwitches.map(({ name, key }) => (
        <Field
          orientation="horizontal"
          className="max-w-sm grid-cols-3"
          key={key}
        >
          <FieldContent className="grid">
            <FieldLabel htmlFor="switch-focus-mode" className="grid">
              {name}
            </FieldLabel>
          </FieldContent>
          <Switch
            id="switch-focus-mode"
            className="grid-cols-2"
            checked={value.langs[key]}
            onCheckedChange={(v) =>
              onChange({ ...value, langs: { ...value.langs, [key]: v } })
            }
          />
        </Field>
      ))}
    </div>
  )
}
