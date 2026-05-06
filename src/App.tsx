import Footer from '#/components/Footer'
import { ThemeProvider } from '#/components/theme-provider'
import { useState } from 'react'
import { Checker } from './components/Checker'
import Gen from './components/generator/Gen'
import { PasswordForm } from './components/PasswordForm'
import { Stats } from './components/Stats'
import { Card } from './components/ui/card'

export default function App() {
  const [password, setPassword] = useState('')

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="page-wrap px-4 flex flex-col items-center justify-center gap-4 min-h-screen md:-translate-y-20">
        <div className="flex flex-col justify-center items-center gap-1 text-center ">
          <h1 className="text-4xl font-bold">PassCheck</h1>
          <p className="text-sm text-foreground/60">
            Generate and check the strength of your passwords.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 w-full max-w-4xl gap-2 md:gap-4">
          <Card className="rounded-xl col-span-1 grid-cols-1 md:col-span-5 grid md:grid-cols-5 items-center gap-4">
            <div className="col-span-1 md:col-span-3 w-full px-4 md:pl-6">
              <PasswordForm password={password} onChange={setPassword} />
            </div>
            <div className="col-span-1 md:col-span-2 md:px-auto">
              <Gen password={password} setPassword={setPassword} />
            </div>
          </Card>
          <Card className="rounded-xl p-6 col-span-1 md:col-span-3 h-full">
            <Checker password={password} />
          </Card>
          <Stats password={password} />
        </div>
      </main>

      <Footer />
    </ThemeProvider>
  )
}
