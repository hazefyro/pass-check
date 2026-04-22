import { useState } from 'react'
import { Button } from '../ui/button'

export const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState('')

  return (
    <>
      <Button>Generate</Button>
      {generatedPassword.length != 0 ? generatedPassword : ''}
    </>
  )
}
