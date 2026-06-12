import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  Copy,
  Download,
} from 'lucide-react'
import { resources } from '@/data/resources'
import { useFavorites, useUI } from '@/store'
import { useT } from '@/i18n/LangProvider'
import { ResourceCard } from '@/components/ResourceCard'
import { formatAuthors, formatNumber } from '@/utils/format'
import type { ResourceType } from '@/types'

const typeLabelKeys: Record<ResourceType, 'type.paper' | 'type.dataset' | 'type.book' | 'type.tutorial'> = {
  paper: 'type.paper',
  dataset: 'type.dataset',
  book: 'type.book',
  tutorial: 'type.tutorial',
}

const citeKey: Record<'apa' | 'mla' | 'gbt' | 'bibtex', 'detail.cite.apa' | 'detail.cite.mla' | 'detail.cite.gbt' | 'detail.cite.bibtex'> = {
  apa: 'detail.cite.apa',
  mla: 'detail.cite.mla',
  gbt: 'detail.cite.gbt',
  bibtex: 'detail.cite.bibtex',
}

const citeDisplay: Record<'apa' | 'mla' | 'gbt' | 'bibtex', string> = {
  apa: 'APA',
  mla: 'MLA',
  gbt: 'GB/T 7714',
  bibtex: 'BibTeX',
}

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const showToast = useUI((s) => s.showToast)
  const isFav = useFavorites((s) => s.ids.includes(id ?? ''))
  const toggleFav = useFavorites((s) => s.toggle)
  const { t } = useT()
  const [showAbstract, setShowAbstract] = useState(true)
  const [showAllCites, setShowAllCites] = useState(false)

  const resource = resources.find((r) => r.id === id)

  if (!resource) {
    return (
      <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-32 text-center">
        <h1 className="text-display text-3xl text-ink">{t('detail.notFound.title')}</h1>
        <p className="mt-3 text-ink-soft">{t('detail.notFound.body')}</p>
        <Link
          to="/resources"
          className="mt-8 inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={14} /> {t('detail.back')}
        </Link>
      </div>
    )
  }

  const onFav = () => {
    if (!id) return
    const wasFav = isFav
    toggleFav(id)
    showToast(wasFav ? t('toast.fav.removed') : t('toast.fav.added'))
  }

  const copy = async (kind: 'apa' | 'mla' | 'gbt' | 'bibtex', text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast(t('toast.cite.copied', { format: citeDisplay[kind] }))
    } catch {
      showToast(t('toast.cite.failed'))
    }
  }

  const related = resources
    .filter((r) => r.id !== resource.id && (r.discipline === resource.discipline || r.tags.some((tag) => resource.tags.includes(tag))))
    .slice(0, 3)

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-12 pb-32">
      <Link
        to="/resources"
        className="inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={14} /> {t('detail.back')}
      </Link>

      <header className="mt-6 border-b hairline pb-8">
        <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {t(typeLabelKeys[resource.type])} · {resource.year}
        </p>
        <h1 className="mt-3 text-display text-3xl sm:text-4xl text-ink leading-tight">
          {resource.title}
        </h1>
        <p className="mt-3 text-[15px] text-ink-soft">
          {formatAuthors(resource.authors)} · <em>{resource.venue}</em>
        </p>
        {resource.citations !== undefined && (
          <p className="mt-2 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
            Cited by {formatNumber(resource.citations)}
          </p>
        )}
      </header>

      {/* 摘要折叠区 */}
      <section className="mt-12 border-y hairline">
        <button
          onClick={() => setShowAbstract((v) => !v)}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <span className="text-display text-xl text-ink">{t('detail.abstract.toggle')}</span>
          <ChevronDown
            size={16}
            className="text-ink-soft transition-transform"
            style={{ transform: showAbstract ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
        <div className={`collapse-panel ${showAbstract ? 'is-open' : ''}`}>
          <div>
            <p
              className="indent-2em text-[18px] leading-8 text-ink-soft pb-8"
              style={{ textAlign: 'justify' }}
            >
              {resource.abstract}
            </p>
          </div>
        </div>
        <div className="py-4 flex flex-wrap gap-2">
          <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute self-center mr-2">
            {t('detail.tags')}
          </span>
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="text-mono text-[10px] uppercase tracking-wider2 px-2 py-0.5 border rounded-[2px]"
              style={{ borderColor: 'var(--ochre)', color: 'var(--ochre)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 操作区 - 4 按钮 */}
      <section className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {resource.downloadUrl && (
          <a
            href={resource.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            <Download size={14} /> {t('detail.actions.download')}
          </a>
        )}
        {resource.doi ? (
          <a
            href={`https://doi.org/${resource.doi}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            <ArrowUpRight size={14} /> {t('detail.actions.doi')}
          </a>
        ) : resource.externalUrl ? (
          <a
            href={resource.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            <ArrowUpRight size={14} /> {t('detail.actions.source')}
          </a>
        ) : (
          <span
            className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-mute opacity-50 cursor-not-allowed"
            style={{ borderColor: 'var(--rule)' }}
          >
            <ArrowUpRight size={14} /> {t('detail.actions.nolink')}
          </span>
        )}
        <button
          onClick={() => copy('apa', resource.citation.apa)}
          className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
          style={{ borderColor: 'var(--rule)' }}
        >
          <Copy size={14} /> {t('detail.actions.copy')}
        </button>
        <button
          onClick={onFav}
          className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
          style={{ borderColor: 'var(--rule)' }}
        >
          {isFav ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {isFav ? t('detail.actions.saved') : t('detail.actions.save')}
        </button>
      </section>

      {/* 外部链接次要入口 */}
      {resource.externalUrl && resource.doi && resource.externalUrl !== resource.downloadUrl && (
        <p className="mt-3 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {t('detail.also')}{' '}
          <a
            href={resource.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-1 underline-offset-4 hover:text-moss"
          >
            {(() => { try { return new URL(resource.externalUrl).hostname } catch { return resource.externalUrl } })()}
          </a>
        </p>
      )}

      {/* 引用区 */}
      <section className="mt-12">
        <h2 className="text-display text-xl text-ink mb-4">{t('detail.cite.title')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['apa', 'mla', 'gbt', 'bibtex'] as const).map((kind) => (
            <button
              key={kind}
              onClick={() => copy(kind, resource.citation[kind])}
              className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
              style={{ borderColor: 'var(--rule)' }}
            >
              <Copy size={14} /> {t(citeKey[kind])}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAllCites((v) => !v)}
          className="mt-4 inline-flex items-center gap-1 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink border-b border-ink-soft hover:border-ink pb-0.5 transition-colors"
        >
          {t('detail.cite.previewAll')}
          <ChevronDown
            size={12}
            className="transition-transform"
            style={{ transform: showAllCites ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
        <div className={`collapse-panel ${showAllCites ? 'is-open' : ''}`}>
          <div>
            <div className="mt-4 space-y-3">
              {(['apa', 'mla', 'gbt', 'bibtex'] as const).map((kind) => (
                <pre
                  key={kind}
                  className="bg-transparent border hairline rounded-[2px] p-4 text-[13px] leading-6 text-ink-soft whitespace-pre-wrap break-words font-mono"
                >
                  <span className="text-mono text-[10px] uppercase tracking-wider2 text-ink-mute mr-2">
                    {citeDisplay[kind]}
                  </span>
                  {resource.citation[kind]}
                </pre>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 相关资源 */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-display text-xl text-ink mb-6 border-b hairline pb-3">
            {t('detail.related.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
