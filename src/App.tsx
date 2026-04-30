import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '#/components/theme-provider'
import Footer from '#/components/Footer'
import Home from '#/pages/Home'
import Gen from '#/pages/Gen'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gen" element={<Gen />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  )
}
