import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FontSize, Motion, Theme } from '@/types'

interface SettingsState {
  theme: Theme
  motion: Motion
  fontSize: FontSize
  setTheme: (t: Theme) => void
  setMotion: (m: Motion) => void
  setFontSize: (f: FontSize) => void
  reset: () => void
}

const DEFAULTS = {
  theme: 'light' as Theme,
  motion: 'full' as Motion,
  fontSize: 'standard' as FontSize,
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTheme: (theme) => set({ theme }),
      setMotion: (motion) => set({ motion }),
      setFontSize: (fontSize) => set({ fontSize }),
      reset: () => set(DEFAULTS),
    }),
    {
      name: 'scholarhub:settings',
      version: 1,
    }
  )
)

interface FavoritesState {
  ids: string[]
  toggle: (id: string) => void
  remove: (id: string) => void
  has: (id: string) => boolean
  clear: () => void
  exportJSON: () => string
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
      exportJSON: () => JSON.stringify({ favorites: get().ids, exportedAt: new Date().toISOString() }, null, 2),
    }),
    {
      name: 'scholarhub:favorites',
      version: 1,
    }
  )
)

interface UIState {
  toast: string | null
  toastTimer: number | null
  showToast: (msg: string) => void
}

export const useUI = create<UIState>((set, get) => ({
  toast: null,
  toastTimer: null,
  showToast: (msg) => {
    if (get().toastTimer) window.clearTimeout(get().toastTimer!)
    set({ toast: msg })
    const id = window.setTimeout(() => set({ toast: null, toastTimer: null }), 1500)
    set({ toastTimer: id })
  },
}))
