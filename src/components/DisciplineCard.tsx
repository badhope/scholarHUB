import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { DisciplineInfo, Resource } from '@/types'
import { disciplineMap } from '@/data/disciplines'
import { resources } from '@/data/resources'
import { ResourceCard } from './ResourceCard'

interface DisciplineCardProps {
  discipline: DisciplineInfo
}

export function DisciplineCard({ discipline }: DisciplineCardProps) {
  const [open, setOpen] = useState(false)
  const list = resources.filter((r) => r.discipline === discipline.slug).slice(0, 6)
  const total = resources.filter((r) => r.discipline === discipline.slug).length

  return (
    <section className="border-b hairline">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-baseline justify-between gap-6 py-7 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-5 min-w-0">
          <span className="text-mono text-[12px] uppercase tracking-wider2 text-ink-mute w-7 shrink-0">
            {String(discipline.order).padStart(2, '0')}
          </span>
          <h3 className="text-display text-2xl sm:text-3xl text-ink group-hover:text-moss transition-colors">
            {discipline.name}
          </h3>
          <span className="hidden sm:inline text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
            / {discipline.nameEn}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
            {total} 项资源
          </span>
          <ChevronDown
            size={16}
            className="text-ink-soft transition-transform"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>

      <p className="text-[15px] leading-7 text-ink-soft pb-2">{discipline.blurb}</p>

      <div className={`collapse-panel ${open ? 'is-open' : ''}`}>
        <div>
          <div className="pt-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.length === 0 ? (
              <p className="text-mono text-[11px] text-ink-mute">本学科暂无收录资源。</p>
            ) : (
              list.map((r: Resource) => <ResourceCard key={r.id} resource={r} showSummary />)
            )}
          </div>
          <Link
            to={`/discipline/${discipline.slug}`}
            className="inline-block pb-10 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors border-b border-ink-soft hover:border-ink"
          >
            View all {discipline.name} resources →
          </Link>
        </div>
      </div>
    </section>
  )
}

export function DisciplineList() {
  return (
    <div>
      {Object.values(disciplineMap)
        .sort((a, b) => a.order - b.order)
        .map((d) => (
          <DisciplineCard key={d.slug} discipline={d} />
        ))}
    </div>
  )
}
