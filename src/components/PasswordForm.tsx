import { useForm } from '@tanstack/react-form'
import { debounce } from 'lodash'
import { Eye, EyeClosed } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Field, FieldGroup } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'

type Props = {
  password: string
  onChange: (value: string) => void
}

export function PasswordForm({ password, onChange }: Props) {
  const [isHidden, setHidden] = useState(true)
  const inputType = isHidden ? 'password' : 'text'

  const form = useForm({
    defaultValues: {
      password: password,
    },

    onSubmit: ({ value }) => {
      onChange(value.password)
    },
  })

  useEffect(() => {
    if (password) {
      form.setFieldValue('password', password)
      form.handleSubmit()
    }
  }, [password])

  const debouncedSubmit = useMemo(
    () => debounce(() => form.handleSubmit(), 300),
    [form],
  )

  return (
    <form
      id="password-form"
      onSubmit={(e) => {
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="password"
          children={(field) => {
            return (
              <Field className="flex flex-row">
                <InputGroup>
                  <InputGroupInput
                    className="w-full"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                      debouncedSubmit()
                    }}
                    placeholder="Enter your password or generate one"
                    autoComplete="off"
                    type={inputType}
                  />
                  <InputGroupAddon
                    align="inline-end"
                    className="cursor-pointer"
                  >
                    {!isHidden ? (
                      <Eye onClick={() => setHidden(true)} />
                    ) : (
                      <EyeClosed onClick={() => setHidden(false)} />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )
          }}
        />
      </FieldGroup>
    </form>
  )
}
