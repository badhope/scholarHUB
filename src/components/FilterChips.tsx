interface FilterChipsProps {
  options: { value: string; label: string }[]
  active: string
  onChange: (v: string) => void
  allLabel?: string
}

export function FilterChips({ options, active, onChange, allLabel = '全部' }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
      <Chip active={active === ''} onClick={() => onChange('')} label={allLabel} />
      {options.map((o) => (
        <Chip key={o.value} active={active === o.value} onClick={() => onChange(o.value)} label={o.label} />
      ))}
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
