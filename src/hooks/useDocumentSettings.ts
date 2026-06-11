import { useEffect } from 'react'
import { useSettings } from '@/store'

function resolveTheme(theme: 'light' | 'dark' | 'auto'): 'light' | 'dark' {
  if (theme === 'auto') {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }
  return theme
}

export function useDocumentSettings() {
  const { theme, motion, fontSize } = useSettings()

  useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const resolved = resolveTheme(theme)
      root.setAttribute('data-theme', resolved)
    }
    apply()
    if (theme === 'auto') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-motion', motion)
  }, [motion])

  useEffect(() => {
    document.documentElement.setAttribute('data-font', fontSize)
  }, [fontSize])
}
