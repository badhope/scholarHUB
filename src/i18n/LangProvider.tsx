import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useSettings } from '@/store'
import { dicts, type Lang, type Dict } from './dict'

type Vars = Record<string, string | number>
type DictValue = string | { label: string; desc: string }

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  /** Look up a key, optionally with interpolation variables. */
  t: (key: keyof Dict, vars?: Vars) => string
  /** Look up a settings-style {label, desc} value. */
  opt: (key: keyof Dict) => { label: string; desc: string }
}

const LangContext = createContext<LangCtx | null>(null)

function format(template: string, vars?: Vars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSettings((s) => s.lang)
  const setSettingsLang = useSettings((s) => s.setLang)

  // Sync to <html lang> for accessibility
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const t = useCallback(
    (key: keyof Dict, vars?: Vars): string => {
      const value: DictValue = dicts[lang][key]
      if (typeof value === 'string') return format(value, vars)
      // Fall back to English if zh dict is missing this key
      const fallback: DictValue = dicts.en[key]
      if (typeof fallback === 'string') return format(fallback, vars)
      return String(key)
    },
    [lang],
  )

  const opt = useCallback(
    (key: keyof Dict): { label: string; desc: string } => {
      const value: DictValue = dicts[lang][key]
      if (typeof value === 'object') return value
      const fallback: DictValue = dicts.en[key]
      if (typeof fallback === 'object') return fallback
      return { label: String(key), desc: '' }
    },
    [lang],
  )

  const setLang = useCallback(
    (l: Lang) => setSettingsLang(l),
    [setSettingsLang],
  )

  const toggleLang = useCallback(
    () => setSettingsLang(lang === 'en' ? 'zh' : 'en'),
    [lang, setSettingsLang],
  )

  const value = useMemo<LangCtx>(
    () => ({ lang, setLang, toggleLang, t, opt }),
    [lang, setLang, toggleLang, t, opt],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useT(): LangCtx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useT must be used within <LangProvider>')
  return ctx
}

export type { Lang }
