import { Button } from './ui/button'
import { ButtonGroup, ButtonGroupSeparator } from './ui/button-group'

// NavButtons.tsx
type Site = 'check' | 'gen'

type Props = {
  site: Site
  setSite: (site: Site) => void
}

export const NavButtons = ({ setSite }: Props) => {
  return (
    <div className="flex justify-center">
      <ButtonGroup>
        <Button className="cursor-pointer" onClick={() => setSite('check')}>
          checker
        </Button>
        <ButtonGroupSeparator className="bg-accent" />
        <Button className="cursor-pointer" onClick={() => setSite('gen')}>
          generator
        </Button>
      </ButtonGroup>
    </div>
  )
}
