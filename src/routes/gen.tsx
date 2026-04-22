import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { RefreshCcw } from 'lucide-react'

export const Route = createFileRoute('/gen')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="m-10">
      <Button
        size="lg"
        className="group hover:scale-110 active:scale-90 transition-all"
      >
        Generate
        <RefreshCcw aria-hidden="true" />
      </Button>
    </div>
  )
}
