import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-column px-6 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          <div>
            <p className="text-ink mb-3">ScholarHUB</p>
            <p>Vol. 1 · 2026</p>
            <p>Open academic shelf</p>
          </div>
          <div>
            <p className="text-ink mb-3">Navigation</p>
            <ul className="space-y-1.5 normal-case tracking-normal text-ink-soft">
              <li>
                <Link to="/resources" className="hover:text-ink">
                  资源列表
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-ink">
                  收藏夹
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-ink">
                  设置
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-ink mb-3">Contribute</p>
            <ul className="space-y-1.5 normal-case tracking-normal text-ink-soft">
              <li>
                <a
                  className="hover:text-ink"
                  href="https://github.com/badhope/scholarHUB/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  贡献指南
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink"
                  href="https://github.com/badhope/scholarHUB/issues"
                  target="_blank"
                  rel="noreferrer"
                >
                  提交资源
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink"
                  href="https://github.com/badhope/scholarHUB"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-mono text-[12px] uppercase tracking-wider2 text-ink-mute">
          © 2026 ScholarHUB · Content licensed under CC BY 4.0 unless otherwise noted.
        </p>
      </div>
    </footer>
  )
}
