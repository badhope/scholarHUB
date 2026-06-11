import type { Resource, ResourceType } from '@/types'

export const TYPE_LABELS: Record<ResourceType, string> = {
  paper: '论文',
  dataset: '数据集',
  book: '教材',
  tutorial: '教程',
}

export const TYPE_LABELS_EN: Record<ResourceType, string> = {
  paper: 'Paper',
  dataset: 'Dataset',
  book: 'Book',
  tutorial: 'Tutorial',
}

export function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return ''
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return `${authors[0]} · ${authors[1]}`
  return `${authors[0]} · ${authors[1]} et al.`
}

export function formatAuthorsFull(authors: string[]): string {
  if (authors.length === 0) return ''
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`
  return authors.slice(0, -1).join(', ') + ', & ' + authors[authors.length - 1]
}

export function formatNumber(n?: number): string | undefined {
  if (typeof n !== 'number') return undefined
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function resourceMetaLine(r: Resource): string {
  const parts: string[] = []
  parts.push(formatAuthors(r.authors))
  parts.push(String(r.year))
  if (r.venue) parts.push(r.venue)
  return parts.join(' · ')
}

export function resourceSummary(r: Resource): string {
  return `${TYPE_LABELS[r.type]} · ${r.year} · ${r.tags.length} 主题`
}
