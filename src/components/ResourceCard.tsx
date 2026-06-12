import { Link } from 'react-router-dom'
import { ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react'
import type { Resource } from '@/types'
import { useFavorites } from '@/store'
import { useT } from '@/i18n/LangProvider'
import { formatAuthors } from '@/utils/format'

interface ResourceCardProps {
  resource: Resource
  showSummary?: boolean
}

const typeBadgeClass: Record<Resource['type'], string> = {
  paper: 'border-rule text-ink-soft',
  dataset: 'border-rule text-ink-soft',
  book: 'border-rule text-ink-soft',
  tutorial: 'border-rule text-ink-soft',
}

export function ResourceCard({ resource, showSummary = false }: ResourceCardProps) {
  const isFav = useFavorites((s) => s.ids.includes(resource.id))
  const toggleFav = useFavorites((s) => s.toggle)
  const { t } = useT()

  const summary = t('card.summary', {
    type: t(`type.${resource.type}` as const),
    year: resource.year,
    tags: resource.tags.length,
  })

  return (
    <article className="group relative border hairline rounded-[2px] p-5 hover:border-ink-soft transition-colors">
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={`text-mono text-[10px] uppercase tracking-wider2 px-2 py-0.5 border rounded-[2px] ${typeBadgeClass[resource.type]}`}
        >
          {t(`type.${resource.type}` as const)} · {resource.year}
        </span>
        <button
          onClick={() => toggleFav(resource.id)}
          className="shrink-0 -m-2 p-2 text-ink-mute hover:text-moss transition-colors"
          aria-label={isFav ? t('card.fav.remove') : t('card.fav.add')}
          title={isFav ? t('card.fav.remove.title') : t('card.fav.add.title')}
        >
          {isFav ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      <h3 className="mt-3 text-display text-xl text-ink leading-snug">
        <Link
          to={`/resource/${resource.id}`}
          className="hover:text-moss transition-colors"
        >
          {resource.title}
        </Link>
      </h3>

      <p className="mt-2 text-[14px] text-ink-soft">
        {formatAuthors(resource.authors)} · <em className="not-italic">{resource.venue}</em>
      </p>

      {showSummary && (
        <p className="mt-3 text-[14px] leading-6 text-ink-mute line-clamp-2">
          {summary}
        </p>
      )}

      {resource.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-mono text-[9px] uppercase tracking-wider2 text-ink-mute"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-end">
        <Link
          to={`/resource/${resource.id}`}
          className="inline-flex items-center gap-1 text-mono text-[10px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors"
        >
          {t('card.details')} <ArrowRight size={11} />
        </Link>
      </div>
    </article>
  )
}
