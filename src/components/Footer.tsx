import { ModeToggle } from './mode-toggle'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 w-full p-5 flex flex-row">
      <div className="mr-auto">
        <ModeToggle />
      </div>
      <span className=" flex justify-center items-center text-secondary-foreground">
        MIT License © {year} Haze
      </span>
      <div className="ml-auto" /> {/* spacer */}
    </footer>
  )
}
