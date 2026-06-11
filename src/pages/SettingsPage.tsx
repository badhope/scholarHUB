import { useSettings, useUI } from '@/store'
import type { FontSize, Motion, Theme } from '@/types'

const themeOptions: { value: Theme; label: string; desc: string }[] = [
  { value: 'light', label: '浅色', desc: '纸白底,适合日间长时间阅读' },
  { value: 'dark', label: '深色', desc: '深色底,减少夜间屏幕眩光' },
  { value: 'system', label: '跟随系统', desc: '由操作系统偏好自动切换' },
]

const motionOptions: { value: Motion; label: string; desc: string }[] = [
  { value: 'full', label: '完整', desc: '全部 0.25–0.4s 缓动' },
  { value: 'reduced', label: '减弱', desc: '时长减半,无夸张效果' },
  { value: 'off', label: '关闭', desc: '无动效,适合极简或辅助阅读' },
]

const fontOptions: { value: FontSize; label: string; desc: string }[] = [
  { value: 'standard', label: '标准', desc: '正文 17px / 18px 摘要' },
  { value: 'large', label: '加大', desc: '全局字号上调 1 级' },
]

export function SettingsPage() {
  const { theme, motion, fontSize, setTheme, setMotion, setFontSize, reset } = useSettings()
  const showToast = useUI((s) => s.showToast)

  const onReset = () => {
    if (window.confirm('恢复所有设置为默认值?')) {
      reset()
      showToast('已恢复默认设置')
    }
  }

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-16">
      <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-3">
        Settings
      </p>
      <h1 className="text-display text-3xl text-ink">偏好设置</h1>
      <p className="text-cn text-ink-soft mt-3 max-w-[600px]">
        主题、动效与字号等设置仅保存在本机浏览器。修改后立即生效,刷新页面后仍会保留。
      </p>

      <Section title="主题 · Theme" options={themeOptions} value={theme} onChange={(v) => setTheme(v as Theme)} />
      <Section title="动效 · Motion" options={motionOptions} value={motion} onChange={(v) => setMotion(v as Motion)} />
      <Section title="字号 · Type" options={fontOptions} value={fontSize} onChange={(v) => setFontSize(v as FontSize)} />

      <div className="mt-16 border-t hairline pt-6">
        <button
          onClick={onReset}
          className="text-mono text-[11px] uppercase tracking-wider2 text-ink-soft hover:text-ink transition-colors underline decoration-1 underline-offset-4"
        >
          重置所有设置 →
        </button>
      </div>
    </div>
  )
}

interface SectionProps<T extends string> {
  title: string
  options: { value: T; label: string; desc: string }[]
  value: T
  onChange: (v: T) => void
}

function Section<T extends string>({ title, options, value, onChange }: SectionProps<T>) {
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
                className="w-full flex items-center gap-4 py-4 text-left group"
              >
                <span
                  className={`shrink-0 w-1 h-5 transition-colors ${
                    active ? 'bg-moss' : 'bg-transparent group-hover:bg-ink-mute'
                  }`}
                />
                <span className="flex-1">
                  <span className={`block text-[16px] ${active ? 'text-ink' : 'text-ink-soft'}`}>
                    {o.label}
                  </span>
                  <span className="block text-[13px] text-ink-mute mt-0.5">{o.desc}</span>
                </span>
                {active && (
                  <span className="text-mono text-[10px] uppercase tracking-wider2 text-moss">Selected</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
