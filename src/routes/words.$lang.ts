import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/words/$lang')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { lang } = params
        let path

        if (lang === 'en') {
          path = '/files/words.json'
        } else if (lang === 'pl') {
          path = '/files/words-pl.json'
        } else {
          return new Response('Not found', { status: 404 })
        }

        const res = await fetch(new URL(path, request.url))
        const data = await res.json()

        return Response.json(data)
      },
    },
  },
})
