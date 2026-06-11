import type { ResourceType } from '@/types'
import { TYPE_LABELS } from '@/utils/format'

export const typeOptions: { value: ResourceType; label: string }[] = [
  { value: 'paper', label: TYPE_LABELS.paper },
  { value: 'book', label: TYPE_LABELS.book },
  { value: 'dataset', label: TYPE_LABELS.dataset },
  { value: 'tutorial', label: TYPE_LABELS.tutorial },
]
