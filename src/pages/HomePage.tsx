import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { resources } from '@/data/resources'
import { disciplines } from '@/data/disciplines'
import { useUI } from '@/store'
import { DisciplineList } from '@/components/DisciplineCard'
import { ResourceCard } from '@/components/ResourceCard'
import { useT } from '@/i18n/LangProvider'

const featuredIds = [
  'attention-is-all-you-need',
  'goodfellow-deep-learning-2016',
  'einstein-1905',
  'rudin-principles-mathematical-analysis',
  'numpy-tutorial-2023',
]

export function HomePage() {
  const navigate = useNavigate()
  const showToast = useUI((s) => s.showToast)
  const { t } = useT()
  const [q, setQ] = useState('')

  const featured = featuredIds
    .map((id) => resources.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    if (!term) {
      showToast(t('search.empty'))
      return
    }
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <div className="page-fade">
      {/* 顶部 publication 风格横线 + 刊号 */}
      <div className="mx-auto max-w-column px-6 sm:px-8 pt-10">
        <div className="flex items-baseline justify-between border-b hairline pb-3">
          <span className="text-mono text-[12px] uppercase tracking-wider2 text-ink-mute">
            ScholarHUB · {t('brand.tagline')}
          </span>
          <span className="text-mono text-[12px] uppercase tracking-wider2 text-ink-mute">
            {t('brand.volume')}
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-column px-6 sm:px-8 pt-24 pb-32">
        <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {t('home.hero.eyebrow')}
        </p>
        <h1 className="mt-4 text-display text-4xl sm:text-5xl text-ink whitespace-pre-line">
          {t('home.hero.title')}
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-7 text-ink-soft">
          {t('home.hero.subtitle')}
        </p>

        <form
          onSubmit={onSearch}
          className="mt-10 flex items-center gap-3 border-b border-ink pb-3 focus-within:border-moss transition-colors"
        >
          <Search size={18} className="text-ink-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('home.hero.search.placeholder')}
            className="flex-1 bg-transparent text-[18px] placeholder:text-ink-mute"
            aria-label={t('search.aria')}
          />
          <button
            type="submit"
            className="text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors flex items-center gap-1"
          >
            {t('home.hero.search.submit')} <ArrowRight size={14} />
          </button>
        </form>

        <p className="mt-4 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {t('home.hero.meta', { n: resources.length, d: disciplines.length })}
        </p>
      </section>

      {/* 学科导航 */}
      <section className="mx-auto max-w-column px-6 sm:px-8">
        <div className="flex items-baseline justify-between mb-4 border-b hairline pb-3">
          <h2 className="text-display text-2xl text-ink">{t('home.disciplines.title')}</h2>
          <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
            {t('home.disciplines.hint')}
          </span>
        </div>
        <DisciplineList />
      </section>

      {/* 精选资源 - 横向滚动列 */}
      <section className="mx-auto max-w-column px-6 sm:px-8 mt-32">
        <div className="flex items-baseline justify-between mb-6 border-b hairline pb-3">
          <h2 className="text-display text-2xl text-ink">{t('home.featured.title')}</h2>
          <Link
            to="/resources"
            className="text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors flex items-center gap-1"
          >
            {t('home.featured.viewAll')} <ArrowRight size={12} />
          </Link>
        </div>

        <div className="-mx-6 sm:-mx-8 overflow-x-auto pb-2">
          <div className="flex gap-6 px-6 sm:px-8 snap-x snap-mandatory">
            {featured.map((r) => (
              <div key={r.id} className="w-[300px] sm:w-[340px] shrink-0 snap-start">
                <ResourceCard resource={r} showSummary />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-mono text-[10px] uppercase tracking-wider2 text-ink-mute text-right">
          {t('home.featured.scrollHint')}
        </p>
      </section>

      {/* 项目理念 */}
      <section className="mx-auto max-w-column px-6 sm:px-8 mt-32">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h3 className="text-display text-xl text-ink mb-3">{t('home.intro.what.title')}</h3>
            <p className="text-[16px] leading-7 text-ink-soft">
              {t('home.intro.what.body')}
            </p>
          </div>
          <div>
            <h3 className="text-display text-xl text-ink mb-3">{t('home.intro.cite.title')}</h3>
            <p className="text-[16px] leading-7 text-ink-soft">
              {t('home.intro.cite.body')}
            </p>
          </div>
          <div>
            <h3 className="text-display text-xl text-ink mb-3">{t('home.intro.contrib.title')}</h3>
            <p className="text-[16px] leading-7 text-ink-soft">
              {t('home.intro.contrib.body')}{' '}
              <a
                className="underline decoration-1 underline-offset-4 hover:text-moss"
                href="https://github.com/badhope/scholarHUB/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.link.contributing')}
              </a>
              {'.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
