import { useParams, Link, Navigate } from 'react-router-dom'
import { resources } from '@/data/resources'
import { disciplineMap } from '@/data/disciplines'
import { ResourceCard } from '@/components/ResourceCard'

export function DisciplinePage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const discipline = disciplineMap[slug]
  if (!discipline) return <Navigate to="/" replace />

  const list = resources.filter((r) => r.discipline === discipline.slug)
  const subdisciplines = Array.from(new Set(list.map((r) => r.subdiscipline).filter(Boolean))) as string[]

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-16">
      <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-3">
        Discipline · {String(discipline.order).padStart(2, '0')}
      </p>
      <h1 className="text-display text-[clamp(2.4rem,5vw,4rem)] text-ink">
        {discipline.name}
      </h1>
      <p className="text-mono text-[12px] uppercase tracking-wider2 text-ink-mute mt-2">
        / {discipline.nameEn}
      </p>
      <p className="text-cn mt-6 text-[18px] leading-8 text-ink-soft max-w-[680px]">
        {discipline.blurb}
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-y hairline py-6">
        <Stat label="Resources" value={list.length} />
        <Stat label="Subdisciplines" value={subdisciplines.length} />
        <Stat label="Year span" value={computeYearSpan(list.map((r) => r.year))} />
      </div>

      {subdisciplines.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {subdisciplines.map((s) => (
            <span
              key={s}
              className="text-mono text-[10px] uppercase tracking-wider2 px-2 py-0.5 border rounded-[2px]"
              style={{ borderColor: 'var(--ochre)', color: 'var(--ochre)' }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <h2 className="text-display text-2xl text-ink mt-16 mb-6 border-b hairline pb-3">
        All resources
      </h2>

      {list.length === 0 ? (
        <p className="text-mono text-[12px] text-ink-mute">本学科暂无收录资源。</p>
      ) : (
        <div className="space-y-8">
          {list.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              showPreview
              showSummary
              showActions={false}
            />
          ))}
        </div>
      )}

      <p className="mt-16 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
        <Link to="/resources" className="hover:text-ink">
          ← 全部资源
        </Link>
      </p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">{label}</p>
      <p className="text-display text-2xl text-ink mt-1">{value}</p>
    </div>
  )
}

function computeYearSpan(years: number[]): string {
  if (years.length === 0) return '—'
  const min = Math.min(...years)
  const max = Math.max(...years)
  return min === max ? String(min) : `${min} – ${max}`
}
