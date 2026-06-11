import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { resources } from '@/data/resources'
import { ResourceCard } from '@/components/ResourceCard'
import { useT } from '@/i18n/LangProvider'

const FIELDS_WEIGHT: Array<{ key: keyof (typeof resources)[number]; weight: number }> = [
  { key: 'title', weight: 8 },
  { key: 'venue', weight: 3 },
  { key: 'authors', weight: 2 },
  { key: 'tags', weight: 2 },
  { key: 'subdiscipline', weight: 2 },
  { key: 'abstract', weight: 1 },
  { key: 'preview', weight: 1 },
]

function scoreResource(r: ReturnType<typeof resources.find>, q: string): number {
  if (!r) return 0
  const lower = q.toLowerCase()
  let score = 0
  for (const f of FIELDS_WEIGHT) {
    const value = r[f.key]
    if (!value) continue
    const str = Array.isArray(value) ? value.join(' ') : String(value)
    if (str.toLowerCase().includes(lower)) score += f.weight
  }
  return score
}

export function SearchPage() {
  const { t } = useT()
  const [params] = useSearchParams()
  const q = params.get('q')?.trim() ?? ''

  const results = useMemo(() => {
    if (!q) return []
    return resources
      .map((r) => ({ r, s: scoreResource(r, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.r)
  }, [q])

  if (!q) {
    return (
      <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-16 pb-32">
        <h1 className="text-display text-3xl sm:text-4xl text-ink">{t('search.empty.title')}</h1>
        <p className="mt-2 text-[16px] leading-7 text-ink-soft">{t('search.empty.body')}</p>
      </div>
    )
  }

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-16 pb-32">
      <header className="border-b hairline pb-6">
        <h1 className="text-display text-3xl sm:text-4xl text-ink">
          {t('search.results.title', { q })}
        </h1>
        <p className="mt-2 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {t('search.results.count', { n: results.length })}
        </p>
      </header>

      {results.length === 0 ? (
        <p className="mt-10 text-ink-soft">{t('search.noResults', { q })}</p>
      ) : (
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </section>
      )}
    </div>
  )
}
