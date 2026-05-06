import { ModeToggle } from './mode-toggle'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 w-full p-5 flex flex-row">
      <div className="pl-3 mr-auto">
        <ModeToggle />
      </div>
      <span className="flex justify-center items-center text-secondary-foreground">
        MIT License © {year} Haze
      </span>
      <div className="flex ml-auto justify-center items-center">
        <a href="https://haze.fyro.dev" className="hover:underline">
          website
        </a>
      </div>
    </footer>
  )
}
