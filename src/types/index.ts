export type ResourceType = 'paper' | 'dataset' | 'book' | 'tutorial'

export type Discipline =
  | 'computer-science'
  | 'physics'
  | 'biology'
  | 'mathematics'
  | 'economics'
  | 'humanities'

export interface Citation {
  apa: string
  mla: string
  gbt: string
  bibtex: string
}

export interface Resource {
  id: string
  type: ResourceType
  title: string
  authors: string[]
  year: number
  venue?: string
  doi?: string
  discipline: Discipline
  subdiscipline?: string
  tags: string[]
  abstract: string
  preview: string
  downloadUrl?: string
  externalUrl?: string
  citation: Citation
  addedAt: string
  // 详情页附加：引用次数、被引数（可选）
  citations?: number
}

export interface DisciplineInfo {
  slug: Discipline
  /** Display name in the current UI language. Always present in the data file. */
  name: string
  /** English counterpart, shown when UI is in English. */
  nameEn: string
  /** Short description in Chinese (used when UI is zh). */
  blurb: string
  /** Short description in English (used when UI is en). */
  blurbEn: string
  order: number
}

export type Theme = 'light' | 'dark' | 'auto'
export type Motion = 'full' | 'reduced' | 'off'
export type FontSize = 'standard' | 'large'
export type Lang = 'en' | 'zh'
