import { useState, useLayoutEffect } from 'react'

const LS_THEME = 'meshcore-theme'

export function useTheme() {
  const [theme, setThemeState] = useState<'dark' | 'light'>(
    () => (localStorage.getItem(LS_THEME) as 'dark' | 'light') || 'dark'
  )

  useLayoutEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem(LS_THEME, theme)
  }, [theme])

  function toggle() {
    setThemeState(t => (t === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggle }
}
