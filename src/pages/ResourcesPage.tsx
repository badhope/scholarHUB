import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { resources } from '@/data/resources'
import { disciplines, disciplineMap } from '@/data/disciplines'
import { ResourceCard } from '@/components/ResourceCard'
import { FilterChips } from '@/components/FilterChips'
import { typeOptions } from '@/data/filterOptions'
import type { ResourceType } from '@/types'

export function ResourcesPage() {
  const [params] = useSearchParams()
  const initialType = (params.get('type') as ResourceType) || ''
  const [type, setType] = useState<ResourceType | ''>(initialType)
  const [discipline, setDiscipline] = useState<string>(params.get('discipline') || '')

  const filtered = useMemo(() => {
    return resources
      .filter((r) => (type ? r.type === type : true))
      .filter((r) => (discipline ? r.discipline === discipline : true))
      .sort((a, b) => b.year - a.year)
  }, [type, discipline])

  const disciplineOptions = disciplines.map((d) => ({ value: d.slug, label: d.name }))

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-16">
      <div className="border-b hairline pb-3 mb-8 flex items-baseline justify-between">
        <h1 className="text-display text-3xl text-ink">Resources</h1>
        <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {filtered.length} / {resources.length}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-2">
            Type
          </p>
          <FilterChips
            options={typeOptions}
            active={type}
            onChange={(v) => setType(v as ResourceType | '')}
          />
        </div>

        <div>
          <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-2">
            Discipline
          </p>
          <FilterChips
            options={disciplineOptions}
            active={discipline}
            onChange={setDiscipline}
          />
        </div>
      </div>

      <div className="mt-12 space-y-8">
        {filtered.length === 0 ? (
          <p className="text-mono text-[12px] text-ink-mute py-12 text-center">
            未找到符合条件的资源,试试清除筛选?
          </p>
        ) : (
          filtered.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              showPreview
              showSummary
              showActions={false}
            />
          ))
        )}
      </div>

      {discipline && disciplineMap[discipline] && (
        <p className="mt-12 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          当前过滤:{disciplineMap[discipline].name} ·{' '}
          <button onClick={() => setDiscipline('')} className="underline hover:text-ink">
            清除
          </button>
        </p>
      )}
    </div>
  )
}
