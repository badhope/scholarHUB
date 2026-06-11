import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Copy, Check, Bookmark, BookmarkCheck, ArrowUpRight, Download, ChevronDown } from 'lucide-react'
import { resourceMap, resources } from '@/data/resources'
import { disciplineMap } from '@/data/disciplines'
import {
  TYPE_LABELS,
  TYPE_LABELS_EN,
  formatAuthorsFull,
  formatNumber,
} from '@/utils/format'
import { useFavorites, useUI } from '@/store'
import { ResourceCard } from '@/components/ResourceCard'

const CITATION_FORMATS = [
  { key: 'apa', label: 'APA' },
  { key: 'mla', label: 'MLA' },
  { key: 'gbt', label: 'GB/T 7714' },
  { key: 'bibtex', label: 'BibTeX' },
] as const

export function ResourceDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const resource = resourceMap[id]
  const [showAbstract, setShowAbstract] = useState(true)
  const [openCite, setOpenCite] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const isFav = useFavorites((s) => s.ids.includes(resource?.id ?? ''))
  const toggleFav = useFavorites((s) => s.toggle)
  const showToast = useUI((s) => s.showToast)

  if (!resource) return <Navigate to="/resources" replace />

  const discipline = disciplineMap[resource.discipline]

  const copy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value).catch(() => {})
    setCopied(key)
    showToast(`已复制 ${key.toUpperCase()} 引用`)
    setTimeout(() => setCopied(null), 1500)
  }

  const onFav = () => {
    toggleFav(resource.id)
    showToast(isFav ? '已移除收藏' : '已加入收藏')
  }

  const related = resources
    .filter((r) => r.id !== resource.id && (r.discipline === resource.discipline || r.authors.some((a) => resource.authors.includes(a))))
    .slice(0, 3)

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-12">
      {/* 面包屑 */}
      <nav className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-8">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-ink">Resources</Link>
        {discipline && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/discipline/${discipline.slug}`} className="hover:text-ink">
              {discipline.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-ink-soft">No. {String(resources.indexOf(resource) + 1).padStart(3, '0')}</span>
      </nav>

      {/* 标题与元数据 */}
      <header>
        <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-3">
          {TYPE_LABELS[resource.type]} · {TYPE_LABELS_EN[resource.type]} · {resource.year}
        </p>
        <h1 className="text-display text-[clamp(2rem,5vw,3.5rem)] text-ink leading-tight">
          {resource.title}
        </h1>
        <p className="mt-4 text-[16px] text-ink-soft">
          <span className="text-mono text-[12px] uppercase tracking-wider2 text-ink-mute mr-2">
            Authors
          </span>
          {formatAuthorsFull(resource.authors)}
        </p>
        <p className="mt-2 text-mono text-[12px] text-ink-soft">
          {resource.venue ? `${resource.venue} · ` : ''}
          {resource.year}
          {resource.doi && (
            <>
              {' · DOI: '}
              <a
                className="underline decoration-1 underline-offset-4 hover:text-moss"
                href={`https://doi.org/${resource.doi}`}
                target="_blank"
                rel="noreferrer"
              >
                {resource.doi}
              </a>
            </>
          )}
          {resource.citations !== undefined && (
            <>
              {' · '}
              <span className="text-ochre">{formatNumber(resource.citations)} citations</span>
            </>
          )}
        </p>
      </header>

      {/* 摘要折叠区(预览功能核心) */}
      <section className="mt-12 border-y hairline">
        <button
          onClick={() => setShowAbstract((v) => !v)}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <span className="text-display text-xl text-ink">Abstract · 摘要预览</span>
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
            Tags
          </span>
          {resource.tags.map((t) => (
            <span
              key={t}
              className="text-mono text-[10px] uppercase tracking-wider2 px-2 py-0.5 border rounded-[2px]"
              style={{ borderColor: 'var(--ochre)', color: 'var(--ochre)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* 操作区 - 4 个等宽按钮:跳转下载 / 跳转 DOI / 复制引用 / 加入收藏 */}
      <section className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {resource.downloadUrl && (
          <a
            href={resource.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            <Download size={14} /> Download
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
            <ArrowUpRight size={14} /> View DOI
          </a>
        ) : resource.externalUrl ? (
          <a
            href={resource.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            <ArrowUpRight size={14} /> View Source
          </a>
        ) : (
          <span
            className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-mute opacity-50 cursor-not-allowed"
            style={{ borderColor: 'var(--rule)' }}
          >
            <ArrowUpRight size={14} /> No Link
          </span>
        )}
        <button
          onClick={() => copy('apa', resource.citation.apa)}
          className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
          style={{ borderColor: 'var(--rule)' }}
        >
          <Copy size={14} /> Copy Cite
        </button>
        <button
          onClick={onFav}
          className="flex items-center justify-center gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
          style={{ borderColor: 'var(--rule)' }}
        >
          {isFav ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {isFav ? 'Saved' : 'Save'}
        </button>
      </section>

      {/* 外部链接(非主要资源时可作为额外入口) */}
      {resource.externalUrl && resource.doi && resource.externalUrl !== resource.downloadUrl && (
        <p className="mt-3 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          Also:{' '}
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

      {/* 引用生成 */}
      <section className="mt-12">
        <h2 className="text-display text-2xl text-ink mb-4">Cite this resource</h2>
        <p className="text-[15px] text-ink-soft mb-6">
          选择一种引用格式,点击复制即可粘贴到论文、报告或课程作业。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CITATION_FORMATS.map((f) => (
            <button
              key={f.key}
              onClick={() => copy(f.key, resource.citation[f.key])}
              className="group flex items-center justify-between gap-2 py-3 px-4 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 text-ink hover:border-moss hover:text-moss transition-colors"
              style={{ borderColor: 'var(--rule)' }}
            >
              <span>{f.label}</span>
              {copied === f.key ? (
                <Check size={14} className="text-moss" />
              ) : (
                <Copy size={14} className="text-ink-mute group-hover:text-moss transition-colors" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpenCite((v) => !v)}
          className="mt-6 inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors"
        >
          <ChevronDown
            size={14}
            className="transition-transform"
            style={{ transform: openCite ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
          预览所有引用格式
        </button>
        <div className={`collapse-panel ${openCite ? 'is-open' : ''}`}>
          <div>
            <div className="mt-6 space-y-4">
              {CITATION_FORMATS.map((f) => (
                <div key={f.key} className="border hairline rounded-[2px] p-4">
                  <p className="text-mono text-[10px] uppercase tracking-wider2 text-ink-mute mb-2">
                    {f.label}
                  </p>
                  <pre className="text-[14px] leading-7 text-ink whitespace-pre-wrap break-words font-serif">
                    {resource.citation[f.key]}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 相关推荐 */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-display text-2xl text-ink mb-6 border-b hairline pb-3">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((r) => (
              <ResourceCard key={r.id} resource={r} showSummary />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
