import { useT } from '@/i18n/LangProvider'

interface FilterChipsProps {
  /** Small uppercase group label, rendered above the chips on wider screens. */
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}

/**
 * Horizontal chip group for filter rows. The first option is treated as the
 * "show all" reset and uses the translated `type.all` label.
 */
export function FilterChips({ label, options, value, onChange }: FilterChipsProps) {
  const { t } = useT()
  const allOption = { value: 'all', label: t('type.all') }
  const all = [allOption, ...options]

  return (
    <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2">
      <span className="text-mono text-[10px] uppercase tracking-wider2 text-ink-mute w-14 shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {all.map((o) => (
          <Chip
            key={o.value}
            active={value === o.value}
            onClick={() => onChange(o.value)}
            label={o.label}
          />
        ))}
      </div>
    </div>
  )
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 text-mono text-[11px] uppercase tracking-wider2 px-3 py-1.5 border rounded-[2px] transition-colors ${
        active ? 'border-moss text-moss' : 'border-rule text-ink-soft hover:border-ink hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}
