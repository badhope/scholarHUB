import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AxiosError } from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 把外部传入的跳转地址收敛成"仅站内相对路径"。
 *
 * 背景：`?redirect=` 完全由 URL 控制，直接喂给 router 会造成开放重定向——
 * 攻击者推送 `/login?redirect=https://evil.example/phish`，受害者输入真实
 * 凭据后"登录成功"被静默送到钓鱼站，可信度极高。
 *
 * 规则：必须以单个 `/` 开头且第二个字符不是 `/` 或 `\`（否则 `//evil.com`
 * 会被浏览器当作协议相对 URL、`/\evil.com` 在部分浏览器同样外跳）。
 * 其余一律回退到 fallback。
 */
export function safeInternalPath(
  redirect: string | null | undefined,
  fallback = '/dashboard',
): string {
  if (!redirect) return fallback
  if (!redirect.startsWith('/')) return fallback
  if (redirect.length > 1 && (redirect[1] === '/' || redirect[1] === '\\')) {
    return fallback
  }
  return redirect
}

/**
 * 后端返回的时间是原始 ISO 字符串（如 `2026-09-14T14:21:51.181237Z`），
 * 直接渲染既难读又会撑破卡片布局，统一格式化后再展示。
 * 空值 / 非法值回退到 fallback，避免页面出现 "Invalid Date"。
 */
export function formatDateTime(iso: string | null | undefined, fallback = '—'): string {
  if (!iso) return fallback
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return fallback
  return date.toLocaleString()
}

// Single source of truth for converting a thrown value (axios + unknown)
// into a user-facing toast message. Used by every mutation catch block.
export function extractError(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const detail = (err.response?.data as { detail?: string } | undefined)?.detail
    if (detail) return detail
  }
  return fallback
}

// Parse a comma-separated list field (authors / tags / keywords / jel_codes)
// into a trimmed, empty-filtered string array. Replaces the repeated inline
// `.split(',').map(s => s.trim()).filter(Boolean)` pattern across the app.
export function parseListField(s: string): string[] {
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
}

// 作者名展示统一入口：
// 1) 把 "Last, First" 规范成 "First Last"（BibTeX/RIS 导入常带逗号格式，
//    直接 join 会让人误以为拆成多个作者）；
// 2) 超过 2 位作者时截断为 "前两位 et al."。
export function formatAuthors(authors: string[], limit = 2): string {
  const names = authors.map((a) => {
    const parts = a
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    return parts.length >= 2 ? `${parts.slice(1).join(' ')} ${parts[0]}` : a
  })
  if (names.length > limit) {
    return `${names.slice(0, limit).join('、')} 等`
  }
  return names.join('、')
}

// Trigger a browser download from a Blob response (export / file download).
// Filename is parsed from Content-Disposition, falling back to fallbackName.
// Deduplicates the blob-download logic previously hand-rolled in
// exportResources() and downloadSubmissionFile().
export function downloadBlob(data: Blob, disposition: string, fallbackName: string): void {
  const match = /filename="?([^";]+)"?/.exec(disposition)
  const filename = match?.[1] ?? fallbackName
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

// Backend list endpoints return a bare array with no meta; the total page
// count is inferred from whether the current page came back full. Extracted
// from the identical logic in admin/users.tsx and admin/audit-logs.tsx.
export function inferTotalPagesFromFullPage(
  items: unknown[],
  pageSize: number,
  page: number,
): number {
  return items.length >= pageSize ? page + 1 : page
}
