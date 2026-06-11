import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { resources } from '@/data/resources'
import { ResourceCard } from '@/components/ResourceCard'

export function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q')?.trim() ?? ''

  const results = useMemo(() => {
    if (!q) return []
    const t = q.toLowerCase()
    const score = (r: typeof resources[number]) => {
      let s = 0
      if (r.title.toLowerCase().includes(t)) s += 8
      if (r.abstract.toLowerCase().includes(t)) s += 3
      if (r.preview.toLowerCase().includes(t)) s += 4
      if (r.tags.some((tag) => tag.toLowerCase().includes(t))) s += 5
      if (r.authors.some((a) => a.toLowerCase().includes(t))) s += 6
      if (r.venue?.toLowerCase().includes(t)) s += 2
      if (r.subdiscipline?.toLowerCase().includes(t)) s += 4
      return s
    }
    return resources
      .map((r) => ({ r, s: score(r) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || b.r.year - a.r.year)
      .map((x) => x.r)
  }, [q])

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-16">
      <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-3">
        Search
      </p>
      <h1 className="text-display text-3xl text-ink">
        {q ? <>Results for &ldquo;{q}&rdquo;</> : '请输入关键词'}
      </h1>
      <p className="text-mono text-[12px] text-ink-mute mt-2">
        {q ? `${results.length} 项结果` : '回到首页使用搜索框开始检索。'}
      </p>

      <div className="mt-10 space-y-8">
        {results.length === 0 && q && (
          <div className="border hairline rounded-[2px] p-8 text-center">
            <p className="text-display text-xl text-ink mb-2">未找到相关资源</p>
            <p className="text-[15px] text-ink-soft">
              试试更通用的关键词,或浏览{' '}
              <Link to="/resources" className="underline decoration-1 underline-offset-4 hover:text-moss">
                全部资源
              </Link>
              。
            </p>
          </div>
        )}
        {results.map((r) => (
          <ResourceCard key={r.id} resource={r} showPreview showSummary showActions={false} />
        ))}
      </div>
    </div>
  )
}
