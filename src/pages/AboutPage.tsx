import { useT } from '@/i18n/LangProvider'

const sections: { titleKey: 'about.mission.title' | 'about.scope.title' | 'about.data.title' | 'about.contribute.title' | 'about.license.title'; bodyKey: 'about.mission.body' | 'about.scope.body' | 'about.data.body' | 'about.contribute.body' | 'about.license.body' }[] = [
  { titleKey: 'about.mission.title', bodyKey: 'about.mission.body' },
  { titleKey: 'about.scope.title', bodyKey: 'about.scope.body' },
  { titleKey: 'about.data.title', bodyKey: 'about.data.body' },
  { titleKey: 'about.contribute.title', bodyKey: 'about.contribute.body' },
  { titleKey: 'about.license.title', bodyKey: 'about.license.body' },
]

export function AboutPage() {
  const { t } = useT()
  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-16 pb-32">
      <header className="border-b hairline pb-6">
        <h1 className="text-display text-3xl sm:text-4xl text-ink">{t('about.title')}</h1>
        <p className="mt-2 text-[16px] leading-7 text-ink-soft">{t('about.subtitle')}</p>
      </header>
      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.titleKey}>
            <h2 className="text-display text-xl text-ink mb-3">{t(s.titleKey)}</h2>
            <p className="text-[16px] leading-7 text-ink-soft">{t(s.bodyKey)}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
