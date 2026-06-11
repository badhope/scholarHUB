import { useSettings } from '@/store'
import { useT } from '@/i18n/LangProvider'
import type { Lang } from '@/i18n/dict'

interface SectionProps<T extends string> {
  title: string
  options: { value: T; label: string; desc: string }[]
  value: T
  onChange: (v: T) => void
  selectedLabel: string
}

function Section<T extends string>({ title, options, value, onChange, selectedLabel }: SectionProps<T>) {
  return (
    <section className="mt-12 border-b hairline pb-6">
      <h2 className="text-display text-xl text-ink mb-5">{title}</h2>
      <ul className="divide-y" style={{ borderColor: 'var(--rule)' }}>
        {options.map((o) => {
          const active = o.value === value
          return (
            <li key={o.value}>
              <button
                onClick={() => onChange(o.value)}
                className="w-full flex items-baseline gap-4 py-4 text-left group"
                aria-pressed={active}
              >
                <span
                  className={`shrink-0 self-center h-px transition-all ${
                    active
                      ? 'w-7 bg-moss'
                      : 'w-0 bg-transparent group-hover:w-5 group-hover:bg-ink-mute'
                  }`}
                  style={active ? { height: '1.5px' } : undefined}
                  aria-hidden
                />
                <span className="flex-1">
                  <span className={`block text-[16px] ${active ? 'text-ink' : 'text-ink-soft'}`}>
                    {o.label}
                  </span>
                  <span className="block text-[13px] text-ink-mute mt-0.5">{o.desc}</span>
                </span>
                {active && (
                  <span className="text-mono text-[10px] uppercase tracking-wider2 text-moss">{selectedLabel}</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function SettingsPage() {
  const { theme, fontSize, motion, lang, setTheme, setFontSize, setMotion, setLang, reset } = useSettings()
  const { t, opt } = useT()

  const themeOptions = [
    { value: 'light' as const, ...opt('settings.theme.light') },
    { value: 'dark' as const, ...opt('settings.theme.dark') },
    { value: 'auto' as const, ...opt('settings.theme.auto') },
  ]
  const fontOptions = [
    { value: 'standard' as const, ...opt('settings.font.standard') },
    { value: 'large' as const, ...opt('settings.font.large') },
  ]
  const motionOptions = [
    { value: 'full' as const, ...opt('settings.motion.full') },
    { value: 'reduced' as const, ...opt('settings.motion.reduced') },
    { value: 'off' as const, ...opt('settings.motion.off') },
  ]
  const langOptions = [
    { value: 'en' as const, ...opt('settings.lang.en') },
    { value: 'zh' as const, ...opt('settings.lang.zh') },
  ]

  const onReset = () => {
    if (!window.confirm(t('settings.confirm.reset'))) return
    reset()
  }

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 pt-16 pb-32">
      <header className="border-b hairline pb-6">
        <h1 className="text-display text-3xl sm:text-4xl text-ink">{t('settings.title')}</h1>
        <p className="mt-2 text-[16px] leading-7 text-ink-soft">{t('settings.subtitle')}</p>
      </header>

      <Section
        title={t('settings.lang.title')}
        options={langOptions}
        value={lang}
        onChange={(v) => setLang(v as Lang)}
        selectedLabel={t('settings.selected')}
      />
      <Section
        title={t('settings.theme.title')}
        options={themeOptions}
        value={theme}
        onChange={setTheme}
        selectedLabel={t('settings.selected')}
      />
      <Section
        title={t('settings.font.title')}
        options={fontOptions}
        value={fontSize}
        onChange={setFontSize}
        selectedLabel={t('settings.selected')}
      />
      <Section
        title={t('settings.motion.title')}
        options={motionOptions}
        value={motion}
        onChange={setMotion}
        selectedLabel={t('settings.selected')}
      />

      <section className="mt-12 border-b hairline pb-6">
        <button
          onClick={onReset}
          className="text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ochre transition-colors"
        >
          {t('settings.reset')}
        </button>
      </section>
    </div>
  )
}
