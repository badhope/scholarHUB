import { useMemo, useState } from 'react'
import { ResourceCard } from '@/components/ResourceCard'
import { FilterChips } from '@/components/FilterChips'
import { resources } from '@/data/resources'
import { disciplines } from '@/data/disciplines'
import { useT } from '@/i18n/LangProvider'
import type { ResourceType } from '@/types'

type TypeFilter = ResourceType | 'all'
type DisciplineFilter = string // 'all' or Discipline

const typeOrder: ResourceType[] = ['paper', 'dataset', 'book', 'tutorial']

export function ResourcesPage() {
  const { t, lang } = useT()
  const [type, setType] = useState<TypeFilter>('all')
  const [discipline, setDiscipline] = useState<DisciplineFilter>('all')

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (type !== 'all' && r.type !== type) return false
      if (discipline !== 'all' && r.discipline !== discipline) return false
      return true
    })
  }, [type, discipline])

  const typeOptions = [
    { value: 'all' as const, label: t('type.all') },
    ...typeOrder.map((tp) => ({ value: tp, label: t(`type.${tp}` as const) })),
  ]
  const disciplineOptions = [
    { value: 'all', label: t('type.all') },
    ...disciplines.map((d) => ({
      value: d.slug,
      label: lang === 'en' ? d.nameEn : d.name,
    })),
  ]

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-16 pb-32">
      <header className="border-b hairline pb-6">
        <h1 className="text-display text-3xl sm:text-4xl text-ink">{t('resources.title')}</h1>
        <p className="mt-2 text-[16px] leading-7 text-ink-soft">{t('resources.subtitle')}</p>
        <p className="mt-3 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {t('resources.summary', { n: filtered.length })}
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <FilterChips
          label={t('resources.filter.type')}
          options={typeOptions}
          value={type}
          onChange={(v) => setType(v as TypeFilter)}
        />
        <FilterChips
          label={t('resources.filter.discipline')}
          options={disciplineOptions}
          value={discipline}
          onChange={(v) => setDiscipline(v)}
        />
      </div>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <p className="text-ink-mute col-span-2 py-10 text-center text-mono text-[11px] uppercase tracking-wider2">
            {t('resources.empty')}
          </p>
        ) : (
          filtered.map((r) => <ResourceCard key={r.id} resource={r} />)
        )}
      </section>
    </div>
  )
}
