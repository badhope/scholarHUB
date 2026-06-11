import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useFavorites } from '@/store'
import { useT } from '@/i18n/LangProvider'
import { ResourceCard } from '@/components/ResourceCard'
import { resources } from '@/data/resources'

export function FavoritesPage() {
  const { ids, remove, clear } = useFavorites()
  const { t } = useT()
  const [busy, setBusy] = useState(false)

  const list = resources.filter((r) => ids.includes(r.id))

  const onExport = () => {
    if (ids.length === 0) return
    const payload = {
      exportedAt: new Date().toISOString(),
      count: list.length,
      resources: list,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scholarhub-favorites-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const onClear = () => {
    if (!window.confirm(t('favorites.confirm.clear'))) return
    setBusy(true)
    clear()
    setBusy(false)
  }

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-16 pb-32">
      <header className="border-b hairline pb-6 flex items-baseline justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-display text-3xl sm:text-4xl text-ink">{t('favorites.title')}</h1>
          <p className="mt-2 text-[16px] leading-7 text-ink-soft">{t('favorites.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onExport}
            disabled={ids.length === 0}
            className="text-mono text-[11px] uppercase tracking-wider2 px-3 py-2 border rounded-[2px] text-ink-soft hover:text-ink hover:border-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            {t('favorites.export')}
          </button>
          <button
            onClick={onClear}
            disabled={busy || ids.length === 0}
            className="text-mono text-[11px] uppercase tracking-wider2 px-3 py-2 border rounded-[2px] text-ink-soft hover:text-ochre hover:border-ochre disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            {t('favorites.clearAll')}
          </button>
        </div>
      </header>

      {list.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-display text-2xl text-ink-mute">{t('favorites.empty.title')}</p>
          <p className="mt-2 text-ink-soft">{t('favorites.empty.body')}</p>
        </div>
      ) : (
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {list.map((r) => (
            <div key={r.id} className="relative">
              <button
                onClick={() => remove(r.id)}
                className="absolute -left-1 -top-1 sm:left-2 sm:top-2 p-2 text-ink-mute hover:text-ochre transition-colors z-10"
                aria-label={t('card.fav.remove')}
                title={t('card.fav.remove.title')}
              >
                <Trash2 size={14} />
              </button>
              <ResourceCard resource={r} />
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
