import { Link } from 'react-router-dom'
import type { Resource } from '@/types'
import {
  TYPE_LABELS,
  formatAuthors,
  formatNumber,
  resourceSummary,
} from '@/utils/format'
import { useFavorites, useUI } from '@/store'
import { Bookmark, BookmarkCheck, ArrowUpRight, Download } from 'lucide-react'

interface ResourceCardProps {
  resource: Resource
  showPreview?: boolean
  showSummary?: boolean
  showActions?: boolean
}

export function ResourceCard({
  resource,
  showPreview = true,
  showSummary = false,
  showActions = true,
}: ResourceCardProps) {
  const isFav = useFavorites((s) => s.ids.includes(resource.id))
  const toggleFav = useFavorites((s) => s.toggle)
  const showToast = useUI((s) => s.showToast)
  const citations = formatNumber(resource.citations)

  const onFav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFav(resource.id)
    showToast(isFav ? '已移除收藏' : '已加入收藏')
  }

  return (
    <article
      className="group border hairline rounded-[2px] p-6 hover:border-ink transition-colors"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <Link to={`/resource/${resource.id}`} className="flex-1 min-w-0">
          <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-2">
            {TYPE_LABELS[resource.type]} · {resource.year}
          </p>
          <h3 className="text-display text-[1.5rem] text-ink leading-snug group-hover:text-moss transition-colors">
            {resource.title}
          </h3>
        </Link>
        <button
          onClick={onFav}
          className="shrink-0 -m-2 p-2 text-ink-mute hover:text-moss transition-colors"
          aria-label={isFav ? '取消收藏' : '加入收藏'}
          title={isFav ? '已收藏 · 点击移除' : '收藏'}
        >
          {isFav ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      <p className="mt-3 text-mono text-[12px] text-ink-soft">
        {formatAuthors(resource.authors)}
        {resource.venue ? ` · ${resource.venue}` : ''}
      </p>

      {showPreview && (
        <p
          className="mt-4 text-[15px] leading-7 text-ink-soft"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {resource.preview}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {resource.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-mono text-[10px] uppercase tracking-wider2 px-2 py-0.5 border rounded-[2px]"
            style={{ borderColor: 'var(--ochre)', color: 'var(--ochre)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {showSummary && (
        <p className="mt-4 text-mono text-[11px] text-ink-mute">
          {resourceSummary(resource)}
          {citations ? ` · ${citations} 引用` : ''}
        </p>
      )}

      {showActions && (
        <div className="mt-5 flex items-center gap-2">
          {resource.downloadUrl && (
            <a
              href={resource.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-mono text-[11px] uppercase tracking-wider2 border rounded-[2px] hover:border-ink hover:text-ink transition-colors"
              style={{ borderColor: 'var(--rule)' }}
            >
              <Download size={12} /> 下载
            </a>
          )}
          {resource.externalUrl && (
            <a
              href={resource.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-mono text-[11px] uppercase tracking-wider2 border rounded-[2px] hover:border-ink hover:text-ink transition-colors"
              style={{ borderColor: 'var(--rule)' }}
            >
              <ArrowUpRight size={12} /> 跳转
            </a>
          )}
          <Link
            to={`/resource/${resource.id}`}
            className="ml-auto text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors"
          >
            详情 →
          </Link>
        </div>
      )}
    </article>
  )
}
