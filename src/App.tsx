import Footer from '#/components/Footer'
import { ThemeProvider } from '#/components/theme-provider'
import { useState } from 'react'
import { Checker } from './components/checker/Checker'
import Gen from './components/generator/Gen'
import { PasswordForm } from './components/PasswordForm'
import { Card } from './components/ui/card'

export default function App() {
  const [password, setPassword] = useState('')

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="page-wrap px-4 flex flex-col items-center justify-center gap-4 min-h-screen">
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-4xl font-bold">PassCheck</h1>
          <p className="text-sm text-foreground/60">
            Generate and check the strength of your passwords.
          </p>
        </div>
        <div className="grid grid-cols-4 w-full max-w-3xl gap-4">
          <Card className="rounded-xl col-span-4 grid grid-cols-4 items-center gap-0">
            <div className="col-span-3 w-full px-8 mx-auto">
              <PasswordForm password={password} onChange={setPassword} />
            </div>
            <div className="col-span-1">
              <Gen setPassword={setPassword} />
            </div>
          </Card>
          <Card className="rounded-xl p-6 col-span-3">
            <Checker password={password} />
          </Card>
          <Card className="rounded-xl p-6 col-span-1">Stats</Card>
        </div>
      </main>

      <Footer />
    </ThemeProvider>
  )
}
