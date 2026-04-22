import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: Exclude<Theme, 'system'>
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) {
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme
    }

    const storedTheme = window.localStorage.getItem(storageKey)

    if (
      storedTheme === 'light' ||
      storedTheme === 'dark' ||
      storedTheme === 'system'
    ) {
      return storedTheme
    }

    return defaultTheme
  })
  const [resolvedTheme, setResolvedTheme] = useState<Exclude<Theme, 'system'>>(
    () => {
      if (typeof window === 'undefined') {
        return defaultTheme === 'system' ? 'light' : defaultTheme
      }

      return theme === 'system' ? getSystemTheme() : theme
    },
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const root = window.document.documentElement
    const applyTheme = (nextTheme: Theme) => {
      const nextResolvedTheme =
        nextTheme === 'system' ? getSystemTheme() : nextTheme

      root.classList.remove('light', 'dark')
      root.classList.add(nextResolvedTheme)
      root.style.colorScheme = nextResolvedTheme
      setResolvedTheme(nextResolvedTheme)
    }

    applyTheme(theme)

    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme: Theme) => {
        setThemeState(nextTheme)
        if (typeof window === 'undefined') {
          return
        }

        if (nextTheme === defaultTheme) {
          window.localStorage.removeItem(storageKey)
          return
        }

        window.localStorage.setItem(storageKey, nextTheme)
      },
    }),
    [defaultTheme, resolvedTheme, storageKey, theme],
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
