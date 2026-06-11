import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { resources } from '@/data/resources'
import { disciplines } from '@/data/disciplines'
import { ResourceCard } from '@/components/ResourceCard'
import { DisciplineList } from '@/components/DisciplineCard'
import { useUI } from '@/store'

export function HomePage() {
  const [q, setQ] = useState('')
  const showToast = useUI((s) => s.showToast)

  const featured = useMemo(() => {
    return [...resources].sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0)).slice(0, 5)
  }, [])

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    if (!term) {
      showToast('请输入关键词')
      return
    }
    window.location.hash = `#/search?q=${encodeURIComponent(term)}`
  }

  return (
    <div className="page-fade">
      {/* 顶部 publication 风格横线 + 刊号 */}
      <div className="mx-auto max-w-column px-6 sm:px-8 pt-8">
        <div className="flex items-baseline justify-between border-b hairline pb-3">
          <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
            ScholarHUB · Open Academic Shelf
          </span>
          <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
            Vol. 1 · Issue 2026.06
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-column px-6 sm:px-8 pt-24 pb-32">
        <h1 className="text-display text-[clamp(2.4rem,6vw,4.5rem)] text-ink max-w-[760px]">
          An open shelf of papers, books, and datasets.
        </h1>
        <p className="text-cn mt-6 max-w-[640px] text-[18px] leading-8 text-ink-soft">
          面向学生与科研小白的开放学术资源聚合检索站,按学科与主题归类整理来自论文网站、出版社与公开数据平台的可下载资源,一键跳转或下载。
        </p>

        <form
          onSubmit={onSearch}
          className="mt-10 flex items-center gap-3 border-b-2 border-ink pb-3 focus-within:border-moss transition-colors"
        >
          <Search size={18} className="text-ink-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索论文标题、作者、关键词、学科..."
            className="flex-1 bg-transparent text-[18px] placeholder:text-ink-mute"
          />
          <button
            type="submit"
            className="text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors flex items-center gap-1"
          >
            Search <ArrowRight size={14} />
          </button>
        </form>

        <p className="mt-4 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          收录 {resources.length} 项资源 · 覆盖 {disciplines.length} 个一级学科 · 持续更新
        </p>
      </section>

      {/* 学科导航 */}
      <section className="mx-auto max-w-column px-6 sm:px-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-display text-2xl text-ink">Disciplines</h2>
          <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
            点击展开
          </span>
        </div>
        <DisciplineList />
      </section>

      {/* 精选资源 */}
      <section className="mx-auto max-w-column px-6 sm:px-8 mt-32">
        <div className="flex items-baseline justify-between mb-8 border-b hairline pb-3">
          <h2 className="text-display text-2xl text-ink">Featured Resources</h2>
          <Link
            to="/resources"
            className="text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((r) => (
            <ResourceCard key={r.id} resource={r} showSummary />
          ))}
        </div>
      </section>

      {/* 项目理念 */}
      <section className="mx-auto max-w-column px-6 sm:px-8 mt-32">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h3 className="text-display text-xl text-ink mb-3">What is this?</h3>
            <p className="text-[15px] leading-7 text-ink-soft">
              一个由社区维护的资源目录。所有数据保存在 GitHub 仓库的 JSON 文件中,既可作为阅读入口,也可作为可下载的离线档案。
            </p>
          </div>
          <div>
            <h3 className="text-display text-xl text-ink mb-3">How to cite?</h3>
            <p className="text-[15px] leading-7 text-ink-soft">
              每条资源详情页都提供 APA / MLA / GB/T 7714 / BibTeX 四种引用格式,点击即可复制。
            </p>
          </div>
          <div>
            <h3 className="text-display text-xl text-ink mb-3">How to contribute?</h3>
            <p className="text-[15px] leading-7 text-ink-soft">
              提交 PR,新增一条资源;或在 issue 中指出过期链接与错误信息。详情见
              <a
                className="ml-1 underline decoration-1 underline-offset-4 hover:text-moss"
                href="https://github.com/badhope/scholarHUB/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer"
              >
                贡献指南
              </a>
              。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
