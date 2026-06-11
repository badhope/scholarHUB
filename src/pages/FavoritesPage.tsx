import { useFavorites, useUI } from '@/store'
import { resourceMap } from '@/data/resources'
import { ResourceCard } from '@/components/ResourceCard'
import { Link } from 'react-router-dom'
import { Download, Trash2 } from 'lucide-react'

export function FavoritesPage() {
  const ids = useFavorites((s) => s.ids)
  const remove = useFavorites((s) => s.remove)
  const clear = useFavorites((s) => s.clear)
  const exportJSON = useFavorites((s) => s.exportJSON)
  const showToast = useUI((s) => s.showToast)
  const list = ids.map((id) => resourceMap[id]).filter(Boolean)

  const onExport = () => {
    const blob = new Blob([exportJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scholarhub-favorites-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('收藏夹已导出')
  }

  const onClear = () => {
    if (ids.length === 0) return
    if (window.confirm('确定要清空全部收藏吗?此操作不可恢复。')) {
      clear()
      showToast('收藏夹已清空')
    }
  }

  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-16">
      <div className="border-b hairline pb-3 mb-4 flex items-baseline justify-between">
        <h1 className="text-display text-3xl text-ink">Favorites</h1>
        <span className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
          {ids.length} 项
        </span>
      </div>

      <p className="text-[14px] text-ink-soft mb-2">
        收藏仅保存在本地浏览器,清除浏览器数据将丢失。可随时导出为 JSON 文件。
      </p>

      <div className="flex items-center gap-2 mb-10">
        <button
          onClick={onExport}
          disabled={ids.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 hover:border-ink hover:text-ink transition-colors disabled:opacity-40 disabled:hover:border-rule disabled:hover:text-ink-soft"
          style={{ borderColor: 'var(--rule)' }}
        >
          <Download size={12} /> 导出 JSON
        </button>
        <button
          onClick={onClear}
          disabled={ids.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 border rounded-[2px] text-mono text-[11px] uppercase tracking-wider2 hover:border-ink hover:text-ink transition-colors disabled:opacity-40 disabled:hover:border-rule disabled:hover:text-ink-soft"
          style={{ borderColor: 'var(--rule)' }}
        >
          <Trash2 size={12} /> 清空全部
        </button>
      </div>

      {list.length === 0 ? (
        <div className="border hairline rounded-[2px] p-12 text-center">
          <p className="text-display text-xl text-ink mb-2">收藏夹是空的</p>
          <p className="text-[15px] text-ink-soft">
            浏览
            <Link to="/resources" className="mx-1 underline decoration-1 underline-offset-4 hover:text-moss">
              资源列表
            </Link>
            找到感兴趣的内容,点击书签图标加入收藏。
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {list.map((r) => (
            <div key={r.id} className="relative">
              <button
                onClick={() => remove(r.id)}
                className="absolute -left-2 top-2 p-1.5 text-ink-mute hover:text-ochre transition-colors z-10"
                aria-label="移除收藏"
                title="移除"
              >
                <Trash2 size={14} />
              </button>
              <ResourceCard resource={r} showPreview showSummary showActions={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
