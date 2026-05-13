import type { Separators, WordPasswordOptions } from '#/core/generator/wordGen'
import { Field, FieldContent, FieldLabel } from '../ui/field'
import { InputGroup, InputGroupInput } from '../ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'
import { Slider } from '../ui/slider'
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
        <Slider
          id="range-slider"
          min={2}
          max={10}
          defaultValue={[value.count]}
          onValueChange={(v) => onChange({ ...value, count: v[0] })}
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
      {langSwitches.map(({ name, key }) => {
        const isLast =
          value.langs[key] &&
          Object.values(value.langs).filter(Boolean).length === 1
        return (
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
              disabled={isLast}
              onCheckedChange={(v) =>
                onChange({ ...value, langs: { ...value.langs, [key]: v } })
              }
            />
          </Field>
        )
      })}
      <Separator />
      <FieldLabel>Separator</FieldLabel>
      <Field>
        <InputGroup>
          <InputGroupInput
            className="w-full"
            id="custom-separator"
            name="custom-separator"
            value={
              value.separator.type === 'custom' ? value.separator.value : ''
            }
            placeholder="custom separator"
            autoComplete="off"
            onChange={(v) => {
              onChange({
                ...value,
                separator: { type: 'custom', value: v.target.value },
              })
            }}
            type="text"
          />
        </InputGroup>
        <SeparatorSelect value={value} onChange={onChange} />
      </Field>
    </div>
  )
}

const SeparatorSelect = ({
  value,
  onChange,
}: {
  value: WordPasswordOptions
  onChange: (opts: WordPasswordOptions) => void
}) => {
  const separators: { separator: Separators; name: string }[] = [
    { separator: '-', name: 'Hyphen' },
    { separator: ' ', name: 'Space' },
    { separator: '.', name: 'Dot' },
    { separator: ',', name: 'Comma' },
    { separator: '_', name: 'Underscore' },
    { separator: '', name: 'None' },
  ]

  const handleSelect = (separatorName: string) => {
    const sep =
      separators.find((s) => s.name === separatorName)?.separator ?? '-'
    onChange({ ...value, separator: { type: 'default', value: sep } })
  }

  const selectedName =
    value.separator.type === 'default'
      ? (separators.find((s) => s.separator === value.separator.value)?.name ??
        'Hyphen')
      : undefined

  return (
    <div>
      <Field>
        <Select value={selectedName} onValueChange={(v) => handleSelect(v)}>
          <SelectTrigger>
            <SelectValue placeholder="select separator"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Separator</SelectLabel>
              {separators.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}
