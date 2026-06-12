/**
 * Pure formatting helpers shared by cards and detail views.
 * No localisation here — pass already-translated strings from the caller.
 */

export function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return ''
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return `${authors[0]} · ${authors[1]}`
  return `${authors[0]} · ${authors[1]} et al.`
}

export function formatNumber(n?: number): string | undefined {
  if (typeof n !== 'number') return undefined
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
