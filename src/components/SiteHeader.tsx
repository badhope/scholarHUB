import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, Languages } from 'lucide-react'
import { useUI } from '@/store'
import { useT } from '@/i18n/LangProvider'

export function SiteHeader() {
  const { pathname } = useLocation()
  const showToast = useUI((s) => s.showToast)
  const { t, lang, toggleLang } = useT()
  const [q, setQ] = useState('')

  // When arriving on /, sync search box with ?q=
  useEffect(() => {
    if (pathname === '/') {
      const params = new URLSearchParams(window.location.search)
      const v = params.get('q')
      if (v) setQ(v)
    }
  }, [pathname])

  const navItems: { to: string; key: 'nav.home' | 'nav.resources' | 'nav.favorites' | 'nav.settings' | 'nav.about' }[] = [
    { to: '/', key: 'nav.home' },
    { to: '/resources', key: 'nav.resources' },
    { to: '/favorites', key: 'nav.favorites' },
    { to: '/settings', key: 'nav.settings' },
    { to: '/about', key: 'nav.about' },
  ]

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    if (!term) {
      showToast(t('search.empty'))
      return
    }
    window.location.href = `${window.location.pathname}#/search?q=${encodeURIComponent(term)}`
  }

  return (
    <header className="border-b hairline">
      <div className="mx-auto max-w-column px-6 sm:px-8">
        <div className="flex items-center justify-between gap-6 py-5">
          <Link to="/" className="flex items-baseline gap-3 group">
            <span className="text-display text-2xl text-ink">ScholarHUB</span>
            <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
              {t('brand.volume')}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <form
              onSubmit={onSubmit}
              className="hidden sm:flex items-center gap-2 border hairline rounded-[2px] px-3 py-1.5 focus-within:border-moss transition-colors"
              style={{ minWidth: 240 }}
            >
              <Search size={14} className="text-ink-mute" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('search.placeholder')}
                className="bg-transparent text-sm flex-1 placeholder:text-ink-mute"
                aria-label={t('search.aria')}
              />
              <kbd className="text-mono text-[10px] text-ink-mute border border-rule rounded-[2px] px-1 py-0.5 leading-none">/</kbd>
            </form>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink border hairline rounded-[2px] px-2.5 py-1.5 transition-colors"
              aria-label={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
              title={lang === 'en' ? 'Switch to 中文' : 'Switch to English'}
            >
              <Languages size={13} />
              <span>{lang === 'en' ? 'EN' : '中'}</span>
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-4 sm:gap-7 pb-4 text-sm overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group relative pb-1 text-ink-soft hover:text-ink transition-colors whitespace-nowrap ${
                  isActive ? 'text-ink' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{t(item.key)}</span>
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px bg-moss transition-all ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
