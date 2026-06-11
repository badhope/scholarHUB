import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useUI } from '@/store'

export function SiteHeader() {
  const { pathname } = useLocation()
  const showToast = useUI((s) => s.showToast)
  const [q, setQ] = useState('')

  // 路由变化时若停留在首页,把搜索词同步到 URL,便于分享
  useEffect(() => {
    if (pathname === '/') {
      const params = new URLSearchParams(window.location.search)
      const v = params.get('q')
      if (v) setQ(v)
    }
  }, [pathname])

  const navItems = [
    { to: '/', label: '首页', labelEn: 'Home' },
    { to: '/resources', label: '资源', labelEn: 'Resources' },
    { to: '/favorites', label: '收藏', labelEn: 'Favorites' },
    { to: '/settings', label: '设置', labelEn: 'Settings' },
    { to: '/about', label: '关于', labelEn: 'About' },
  ]

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    if (!term) {
      showToast('请输入关键词')
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
              Vol. 1 · 2026
            </span>
          </Link>

          <form
            onSubmit={onSubmit}
            className="hidden sm:flex items-center gap-2 border hairline rounded-[2px] px-3 py-1.5 focus-within:border-moss transition-colors"
            style={{ minWidth: 240 }}
          >
            <Search size={14} className="text-ink-mute" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索标题、作者、关键词"
              className="bg-transparent text-sm flex-1 placeholder:text-ink-mute"
              aria-label="搜索"
            />
            <kbd className="text-mono text-[10px] text-ink-mute border border-rule rounded-[2px] px-1 py-0.5 leading-none">/</kbd>
          </form>
        </div>

        <nav className="flex items-center gap-7 pb-4 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group relative pb-1 text-ink-soft hover:text-ink transition-colors ${
                  isActive ? 'text-ink' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span className="ml-2 text-mono text-[10px] uppercase tracking-wider2 text-ink-mute">
                    {item.labelEn}
                  </span>
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
