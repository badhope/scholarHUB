import type { DisciplineInfo } from '@/types'

export const disciplines: DisciplineInfo[] = [
  {
    slug: 'computer-science',
    name: '计算机科学',
    nameEn: 'Computer Science',
    blurb: '机器学习、系统、算法与编程语言。',
    order: 1,
  },
  {
    slug: 'physics',
    name: '物理学',
    nameEn: 'Physics',
    blurb: '经典力学、统计物理、量子场论与凝聚态。',
    order: 2,
  },
  {
    slug: 'biology',
    name: '生命科学',
    nameEn: 'Life Sciences',
    blurb: '分子生物、神经科学、生态与医学数据。',
    order: 3,
  },
  {
    slug: 'mathematics',
    name: '数学',
    nameEn: 'Mathematics',
    blurb: '分析、代数、几何、概率与统计推断。',
    order: 4,
  },
  {
    slug: 'economics',
    name: '经济学',
    nameEn: 'Economics',
    blurb: '微观、宏观、计量与行为经济。',
    order: 5,
  },
  {
    slug: 'humanities',
    name: '人文社科',
    nameEn: 'Humanities & Social Sciences',
    blurb: '历史、哲学、社会学与传播研究。',
    order: 6,
  },
]

export const disciplineMap: Record<string, DisciplineInfo> = Object.fromEntries(
  disciplines.map((d) => [d.slug, d])
)
