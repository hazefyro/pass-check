import { ModeToggle } from './mode-toggle'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full p-5 flex flex-col items-center gap-2 md:flex-row md:fixed md:bottom-0">
      <div className="md:pl-3 md:mr-auto">
        <ModeToggle />
      </div>
      <span className="text-secondary-foreground">MIT License © {year} haze</span>
      <div className="md:ml-auto">
        <a href="https://haze.fyro.dev" className="hover:underline">
          website
        </a>
      </div>
    </footer>
  )
}
