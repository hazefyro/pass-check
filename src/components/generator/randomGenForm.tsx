import { defaultRandomPasswordValues } from '#/core/generator'

import { formOptions, useForm } from '@tanstack/react-form'
import * as z from 'zod'

export const flagsInputSchema = z.object({
  includeUppercase: z.boolean(),
  includeNumbers: z.boolean(),
  includeSpecialChars: z.boolean(),
})

const formSchema = z.object({
  length: z
    .number()
    .int()
    .positive()
    .min(4, 'Password length must be at least 4 characters')
    .max(64, 'Password length must be at most 64 characters'),
  // count: z
  //   .number()
  //   .int()
  //   .positive()
  //   .min(2, 'Password word count must be at least 4 characters')
  //   .max(10, 'Password word count must be at least 4 characters'),
  flags: flagsInputSchema,
  type: z.enum(['random', 'words']),
})

const formOpts = formOptions({
  defaultValues: defaultRandomPasswordValues,
  validators: {
    onSubmit: formSchema,
  },
})

export function PasswordGeneratorForm() {
  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <form
      id="password-generator-form"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    ></form>
  )
}
