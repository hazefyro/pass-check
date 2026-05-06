import type { RandomPasswordOptions } from '#/core/generator/randomGen'
import { Field, FieldContent, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'

export const RandomOptions = ({
  value,
  onChange,
}: {
  value: RandomPasswordOptions
  onChange: (opts: RandomPasswordOptions) => void
}) => {
  const switches = [
    { name: 'Include Uppercase', key: 'includeUppercase' },
    { name: 'Include Numbers', key: 'includeNumbers' },
    { name: 'Include Special Characters', key: 'includeSpecialChars' },
  ] as const

  return (
    <div className="grid gap-6">
      <Field className="w-full max-w-xs grid">
        <div className="grid items-center justify-between ">
          <FieldLabel htmlFor="range-slider">Length</FieldLabel>
          <span className="text-muted-foreground text-xs font-medium col-end-3">
            {value.length}
          </span>
        </div>
        <Input
          id="range-slider"
          type="range"
          min="4"
          max="256"
          value={value.length}
          onChange={(v) =>
            onChange({ ...value, length: parseInt(v.target.value) })
          }
          className="grid-cols-2 bg-muted accent-primary h-2 cursor-pointer appearance-none"
        />
      </Field>

      {switches.map(({ name, key }) => (
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
    </div>
  )
}
