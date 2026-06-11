import { useUI } from '@/store'

export function Toast() {
  const toast = useUI((s) => s.toast)
  if (!toast) return null
  return <div className="toast" role="status">{toast}</div>
}
