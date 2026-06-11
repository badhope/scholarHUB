import { Link } from 'react-router-dom'
import { useT } from '@/i18n/LangProvider'

export function SiteFooter() {
  const { t } = useT()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-column px-6 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          <div>
            <p className="text-ink mb-3">ScholarHUB</p>
            <p>{t('brand.volume')}</p>
            <p>{t('brand.tagline')}</p>
          </div>
          <div>
            <p className="text-ink mb-3">{t('footer.section.navigation')}</p>
            <ul className="space-y-1.5 normal-case tracking-normal text-ink-soft">
              <li>
                <Link to="/resources" className="hover:text-ink">
                  {t('footer.link.resources')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-ink">
                  {t('footer.link.favorites')}
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-ink">
                  {t('footer.link.settings')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-ink mb-3">{t('footer.section.contribute')}</p>
            <ul className="space-y-1.5 normal-case tracking-normal text-ink-soft">
              <li>
                <a
                  className="hover:text-ink"
                  href="https://github.com/badhope/scholarHUB/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('footer.link.contributing')}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink"
                  href="https://github.com/badhope/scholarHUB/issues"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('footer.link.submit')}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink"
                  href="https://github.com/badhope/scholarHUB"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('footer.link.github')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-mono text-[12px] uppercase tracking-wider2 text-ink-mute">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  )
}
