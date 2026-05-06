import Gen from '#/components/Gen'
import { useState } from 'react'

export default function Home() {
  const [password, setPassword] = useState('')

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <div className="flex flex-row items-center justify-center">
        <div>{password} </div>

        <Gen setPassword={setPassword} />
      </div>
    </main>
  )
}
