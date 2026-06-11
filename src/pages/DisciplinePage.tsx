import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { resources } from '@/data/resources'
import { disciplineMap } from '@/data/disciplines'
import { useT } from '@/i18n/LangProvider'
import { ResourceCard } from '@/components/ResourceCard'
import { formatNumber } from '@/utils/format'
import type { Discipline } from '@/types'

export function DisciplinePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useT()

  const discipline = disciplineMap[slug as Discipline]
  if (!discipline) {
    return (
      <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-32 text-center">
        <h1 className="text-display text-3xl text-ink">{t('discipline.notFound.title')}</h1>
        <p className="mt-3 text-ink-soft">{t('discipline.empty')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={14} /> {t('nav.home')}
        </Link>
      </div>
    )
  }

  const list = resources.filter((r) => r.discipline === discipline.slug)
  const years = list.map((r) => r.year)
  const yearSpan = years.length ? `${Math.min(...years)} – ${Math.max(...years)}` : '—'
  const subdisciplines = Array.from(new Set(list.map((r) => r.subdiscipline).filter(Boolean)))

  const name = lang === 'en' ? discipline.nameEn : discipline.name
  const blurb = lang === 'en' ? discipline.blurbEn : discipline.blurb

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-12 pb-32">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={14} /> {t('nav.home')}
      </Link>

      <header className="mt-6 border-b hairline pb-8">
        <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {String(discipline.order).padStart(2, '0')} · {t('nav.resources')}
        </p>
        <h1 className="mt-3 text-display text-4xl sm:text-5xl text-ink">{name}</h1>
        <p className="mt-3 text-[16px] leading-7 text-ink-soft">{blurb}</p>
      </header>

      <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 border-b hairline pb-8">
        <div>
          <p className="text-mono text-[10px] uppercase tracking-wider2 text-ink-mute">
            {t('resources.title')}
          </p>
          <p className="mt-1 text-display text-2xl text-ink">{formatNumber(list.length)}</p>
        </div>
        <div>
          <p className="text-mono text-[10px] uppercase tracking-wider2 text-ink-mute">
            {t('discipline.subdisciplines')}
          </p>
          <p className="mt-1 text-display text-2xl text-ink">{formatNumber(subdisciplines.length)}</p>
        </div>
        <div>
          <p className="text-mono text-[10px] uppercase tracking-wider2 text-ink-mute">
            {t('discipline.yearSpan')}
          </p>
          <p className="mt-1 text-display text-2xl text-ink">{yearSpan}</p>
        </div>
      </section>

      {list.length === 0 ? (
        <p className="mt-10 text-ink-mute text-mono text-[11px] uppercase tracking-wider2">
          {t('discipline.empty')}
        </p>
      ) : (
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((r) => (
            <ResourceCard key={r.id} resource={r} showSummary />
          ))}
        </section>
      )}
    </div>
  )
}
