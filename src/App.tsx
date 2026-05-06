import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '#/components/theme-provider'
import Footer from '#/components/Footer'
import Home from '#/pages/Home'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  )
}
