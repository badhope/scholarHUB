// UI string dictionary.
// English is the source of truth; Chinese is the alternate.
// Use useT().t('key') to look up, falls back to English if a key is missing in zh.

export type Dict = {
  // ── Brand / chrome ──────────────────────────────────────────
  'brand.tagline': string
  'brand.volume': string

  // ── Header / nav ────────────────────────────────────────────
  'nav.home': string
  'nav.resources': string
  'nav.favorites': string
  'nav.settings': string
  'nav.about': string
  'search.placeholder': string
  'search.aria': string
  'search.empty': string            // toast: "Please enter a keyword"

  // ── Footer ──────────────────────────────────────────────────
  'footer.section.brand': string
  'footer.section.navigation': string
  'footer.section.contribute': string
  'footer.link.resources': string
  'footer.link.favorites': string
  'footer.link.settings': string
  'footer.link.contributing': string
  'footer.link.submit': string
  'footer.link.github': string
  'footer.copyright': string        // accepts {year}

  // ── Home ────────────────────────────────────────────────────
  'home.kicker': string             // top publication header
  'home.hero.eyebrow': string
  'home.hero.title': string
  'home.hero.subtitle': string
  'home.hero.search.placeholder': string
  'home.hero.search.submit': string
  'home.hero.meta': string          // "{n} resources · {d} disciplines · …"
  'home.disciplines.title': string
  'home.disciplines.hint': string
  'home.featured.title': string
  'home.featured.viewAll': string
  'home.featured.scrollHint': string
  'home.intro.what.title': string
  'home.intro.what.body': string
  'home.intro.cite.title': string
  'home.intro.cite.body': string
  'home.intro.contrib.title': string
  'home.intro.contrib.body': string

  // ── Resources list ──────────────────────────────────────────
  'resources.title': string
  'resources.subtitle': string
  'resources.filter.type': string
  'resources.filter.discipline': string
  'resources.filter.all': string
  'resources.empty': string
  'resources.summary': string        // accepts {n} — "Showing 8 resources"
  'resources.countLabel': string     // small label above the count

  // ── Resource types ──────────────────────────────────────────
  'type.paper': string
  'type.dataset': string
  'type.book': string
  'type.tutorial': string
  'type.all': string

  // ── Detail page ─────────────────────────────────────────────
  'detail.back': string
  'detail.tags': string
  'detail.abstract.toggle': string
  'detail.actions.download': string
  'detail.actions.doi': string
  'detail.actions.source': string
  'detail.actions.nolink': string
  'detail.actions.copy': string
  'detail.actions.save': string
  'detail.actions.saved': string
  'detail.also': string              // "Also:"
  'detail.cite.title': string
  'detail.cite.apa': string
  'detail.cite.mla': string
  'detail.cite.gbt': string
  'detail.cite.bibtex': string
  'detail.cite.previewAll': string
  'detail.related.title': string
  'detail.notFound.title': string
  'detail.notFound.body': string

  // ── Discipline page ─────────────────────────────────────────
  'discipline.subdisciplines': string
  'discipline.yearSpan': string
  'discipline.viewAll': string       // accepts {name}
  'discipline.empty': string
  'discipline.notFound.title': string

  // ── Search ──────────────────────────────────────────────────
  'search.title': string
  'search.empty.title': string
  'search.empty.body': string
  'search.results.title': string     // accepts {q}
  'search.results.count': string     // accepts {n}
  'search.noResults': string

  // ── Favorites ───────────────────────────────────────────────
  'favorites.title': string
  'favorites.subtitle': string
  'favorites.export': string
  'favorites.clearAll': string
  'favorites.empty.title': string
  'favorites.empty.body': string
  'favorites.confirm.clear': string

  // ── Settings ────────────────────────────────────────────────
  'settings.title': string
  'settings.subtitle': string
  'settings.theme.title': string
  'settings.theme.light': { label: string; desc: string }
  'settings.theme.dark': { label: string; desc: string }
  'settings.theme.auto': { label: string; desc: string }
  'settings.font.title': string
  'settings.font.standard': { label: string; desc: string }
  'settings.font.large': { label: string; desc: string }
  'settings.motion.title': string
  'settings.motion.full': { label: string; desc: string }
  'settings.motion.reduced': { label: string; desc: string }
  'settings.motion.off': { label: string; desc: string }
  'settings.lang.title': string
  'settings.lang.en': { label: string; desc: string }
  'settings.lang.zh': { label: string; desc: string }
  'settings.reset': string
  'settings.confirm.reset': string
  'settings.selected': string

  // ── About ───────────────────────────────────────────────────
  'about.title': string
  'about.subtitle': string
  'about.mission.title': string
  'about.mission.body': string
  'about.scope.title': string
  'about.scope.body': string
  'about.data.title': string
  'about.data.body': string
  'about.contribute.title': string
  'about.contribute.body': string
  'about.license.title': string
  'about.license.body': string

  // ── Resource card ───────────────────────────────────────────
  'card.details': string
  'card.fav.add': string             // aria-label
  'card.fav.remove': string          // aria-label
  'card.fav.add.title': string
  'card.fav.remove.title': string
  'card.summary': string             // accepts {type}, {year}, {tags}

  // ── Discipline card ─────────────────────────────────────────
  'disciplineCard.count': string     // accepts {n}
  'disciplineCard.viewAll': string   // accepts {name}
  'disciplineCard.empty': string

  // ── Toast messages ──────────────────────────────────────────
  'toast.fav.added': string
  'toast.fav.removed': string
  'toast.cite.copied': string        // accepts {format}
  'toast.cite.failed': string

  // ── Misc ────────────────────────────────────────────────────
  'common.yes': string
  'common.no': string
  'common.cancel': string
  'common.ok': string
}

const en: Dict = {
  // Brand
  'brand.tagline': 'Open Academic Shelf',
  'brand.volume': 'Vol. 1 · 2026',

  // Header
  'nav.home': 'Home',
  'nav.resources': 'Resources',
  'nav.favorites': 'Favorites',
  'nav.settings': 'Settings',
  'nav.about': 'About',
  'search.placeholder': 'Search title, author, keyword',
  'search.aria': 'Search',
  'search.empty': 'Please enter a keyword',

  // Footer
  'footer.section.brand': 'ScholarHUB',
  'footer.section.navigation': 'Navigation',
  'footer.section.contribute': 'Contribute',
  'footer.link.resources': 'All resources',
  'footer.link.favorites': 'Favorites',
  'footer.link.settings': 'Settings',
  'footer.link.contributing': 'Contributing guide',
  'footer.link.submit': 'Submit a resource',
  'footer.link.github': 'GitHub',
  'footer.copyright': '© {year} ScholarHUB · Content licensed under CC BY 4.0 unless otherwise noted.',

  // Home
  'home.kicker': 'ScholarHUB · Open Academic Shelf · Vol. 1 · Issue 2026.06',
  'home.hero.eyebrow': 'A community-curated shelf',
  'home.hero.title': 'Papers, books, and datasets\n— gathered for students.',
  'home.hero.subtitle': 'A community-curated index of open academic resources, organized by discipline and topic. No login, no paywall, no tracking.',
  'home.hero.search.placeholder': 'Search title, author, keyword, discipline…',
  'home.hero.search.submit': 'Search',
  'home.hero.meta': '{n} resources · {d} disciplines · continuously updated',
  'home.disciplines.title': 'Disciplines',
  'home.disciplines.hint': 'Click to expand',
  'home.featured.title': 'Featured Resources',
  'home.featured.viewAll': 'View all',
  'home.featured.scrollHint': '← scroll horizontally →',
  'home.intro.what.title': 'What is this?',
  'home.intro.what.body':
    'A community-maintained catalogue of open academic resources. All data lives as JSON in the GitHub repository — readable in the browser, downloadable as an offline archive.',
  'home.intro.cite.title': 'How to cite?',
  'home.intro.cite.body':
    'Each detail page provides APA / MLA / GB/T 7714 / BibTeX formats. One click to copy.',
  'home.intro.contrib.title': 'How to contribute?',
  'home.intro.contrib.body':
    'Open a PR to add a resource, or file an issue for stale links and corrections. See the',

  // Resources list
  'resources.title': 'All Resources',
  'resources.subtitle': 'Browse the catalogue by type, discipline, or keyword.',
  'resources.filter.type': 'Type',
  'resources.filter.discipline': 'Discipline',
  'resources.filter.all': 'All',
  'resources.empty': 'No resources match the current filters.',
  'resources.summary': 'Showing {n} resources',
  'resources.countLabel': 'Resources',

  // Types
  'type.paper': 'Papers',
  'type.dataset': 'Datasets',
  'type.book': 'Books',
  'type.tutorial': 'Tutorials',
  'type.all': 'All',

  // Detail
  'detail.back': 'Back to all resources',
  'detail.tags': 'Tags',
  'detail.abstract.toggle': 'Abstract',
  'detail.actions.download': 'Download',
  'detail.actions.doi': 'View DOI',
  'detail.actions.source': 'View Source',
  'detail.actions.nolink': 'No Link',
  'detail.actions.copy': 'Copy Cite',
  'detail.actions.save': 'Save',
  'detail.actions.saved': 'Saved',
  'detail.also': 'Also:',
  'detail.cite.title': 'Cite this resource',
  'detail.cite.apa': 'APA',
  'detail.cite.mla': 'MLA',
  'detail.cite.gbt': 'GB/T 7714',
  'detail.cite.bibtex': 'BibTeX',
  'detail.cite.previewAll': 'Preview all citation formats',
  'detail.related.title': 'You may also like',
  'detail.notFound.title': 'Resource not found',
  'detail.notFound.body': 'The resource you requested does not exist in the catalogue.',

  // Discipline
  'discipline.subdisciplines': 'Subdisciplines',
  'discipline.yearSpan': 'Year span',
  'discipline.viewAll': 'View all resources in {name}',
  'discipline.empty': 'No resources in this discipline yet.',

  // Search
  'search.title': 'Search',
  'search.empty.title': 'Type a keyword to begin',
  'search.empty.body': 'Search runs across title, authors, abstract, tags, discipline and venue.',
  'search.results.title': 'Results for “{q}”',
  'search.results.count': '{n} matches',
  'search.noResults': 'No resources match “{q}”. Try a broader term.',

  // Favorites
  'favorites.title': 'Favorites',
  'favorites.subtitle': 'Resources you have saved for later reading.',
  'favorites.export': 'Export JSON',
  'favorites.clearAll': 'Clear all',
  'favorites.empty.title': 'No favorites yet',
  'favorites.empty.body': 'Tap the bookmark icon on any resource card to save it here.',
  'favorites.confirm.clear': 'Clear all favorites? This cannot be undone.',

  // Settings
  'settings.title': 'Settings',
  'settings.subtitle': 'Personalise the reading experience.',
  'settings.theme.title': 'Theme',
  'settings.theme.light': { label: 'Light', desc: 'Cream paper, dark ink — printed journal feel.' },
  'settings.theme.dark': { label: 'Dark', desc: 'Ink-black background, easy on the eyes at night.' },
  'settings.theme.auto': { label: 'Auto', desc: 'Follow your operating system preference.' },
  'settings.font.title': 'Font size',
  'settings.font.standard': { label: 'Standard', desc: '17px base — the editorial default.' },
  'settings.font.large': { label: 'Large', desc: '18px base — for slower, careful reading.' },
  'settings.motion.title': 'Animation',
  'settings.motion.full': { label: 'Full', desc: 'All transitions, 0.3s ease.' },
  'settings.motion.reduced': { label: 'Reduced', desc: 'Shorter transitions, easier on the vestibular system.' },
  'settings.motion.off': { label: 'Off', desc: 'No animation. Snap transitions only.' },
  'settings.lang.title': 'Language',
  'settings.lang.en': { label: 'English', desc: 'Primary language of the interface.' },
  'settings.lang.zh': { label: '中文', desc: '界面切到中文(资源元数据保持原语种)。' },
  'settings.reset': 'Reset all settings',
  'settings.confirm.reset': 'Reset all settings to defaults?',
  'settings.selected': 'Selected',

  // About
  'about.title': 'About',
  'about.subtitle': 'What this is, what it is not.',
  'about.mission.title': 'Mission',
  'about.mission.body':
    'ScholarHUB indexes open academic resources — papers, books, datasets, tutorials — that are useful to undergraduate and early-stage researchers. We do not host files; we curate links to free, legal copies.',
  'about.scope.title': 'Scope',
  'about.scope.body':
    'Resources are accepted if they are: (a) free to access without institutional login, (b) attributable to a known author or organisation, and (c) appropriate for a student audience.',
  'about.data.title': 'Data format',
  'about.data.body':
    'The catalogue lives as a typed JSON-like TypeScript module in src/data/. Each entry carries title, authors, year, type, abstract, link(s), tags, and pre-formatted citations in APA, MLA, GB/T 7714 and BibTeX.',
  'about.contribute.title': 'Contribute',
  'about.contribute.body':
    'The fastest way to help is to file an issue for a broken link or a missing resource. To add a resource, open a pull request that edits src/data/resources.ts.',
  'about.license.title': 'License',
  'about.license.body':
    'Code: MIT. Resource metadata: CC BY 4.0. Underlying resources remain under their original licenses — see each detail page for the source.',

  // Card
  'card.details': 'Details',
  'card.fav.add': 'Add to favorites',
  'card.fav.remove': 'Remove from favorites',
  'card.fav.add.title': 'Save',
  'card.fav.remove.title': 'Saved — click to remove',
  'card.summary': '{type} · {year} · {tags} tags',

  // Discipline card
  'disciplineCard.count': '{n} resources',
  'disciplineCard.viewAll': 'View all {name} resources',
  'disciplineCard.empty': 'No resources indexed in this discipline yet.',
  'discipline.notFound.title': 'Discipline not found',

  // Toasts
  'toast.fav.added': 'Added to favorites',
  'toast.fav.removed': 'Removed from favorites',
  'toast.cite.copied': '{format} citation copied to clipboard',
  'toast.cite.failed': 'Could not copy — please copy manually',

  // Common
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.cancel': 'Cancel',
  'common.ok': 'OK',
}

const zh: Dict = {
  'brand.tagline': '开放学术书架',
  'brand.volume': '第 1 卷 · 2026',

  'nav.home': '首页',
  'nav.resources': '资源',
  'nav.favorites': '收藏',
  'nav.settings': '设置',
  'nav.about': '关于',
  'search.placeholder': '搜索标题、作者、关键词',
  'search.aria': '搜索',
  'search.empty': '请输入关键词',

  'footer.section.brand': 'ScholarHUB',
  'footer.section.navigation': '导航',
  'footer.section.contribute': '参与',
  'footer.link.resources': '资源列表',
  'footer.link.favorites': '收藏夹',
  'footer.link.settings': '设置',
  'footer.link.contributing': '贡献指南',
  'footer.link.submit': '提交资源',
  'footer.link.github': 'GitHub 仓库',
  'footer.copyright': '© {year} ScholarHUB · 内容除特别说明外采用 CC BY 4.0 许可。',

  'home.kicker': 'ScholarHUB · 开放学术书架 · 第 1 卷 · 2026.06',
  'home.hero.eyebrow': '社区维护的开放书架',
  'home.hero.title': '论文、教材与数据集\n— 整理给学生与初学者。',
  'home.hero.subtitle': '由社区维护的开放学术资源索引,按学科与主题整理。无需登录,无墙,无追踪。',
  'home.hero.search.placeholder': '搜索论文标题、作者、关键词、学科...',
  'home.hero.search.submit': '搜索',
  'home.hero.meta': '收录 {n} 项资源 · 覆盖 {d} 个一级学科 · 持续更新',
  'home.disciplines.title': '学科导航',
  'home.disciplines.hint': '点击展开',
  'home.featured.title': '精选资源',
  'home.featured.viewAll': '查看全部',
  'home.featured.scrollHint': '← 横向滑动浏览更多 →',
  'home.intro.what.title': '这是什么?',
  'home.intro.what.body':
    '由社区维护的开放学术资源目录。所有数据以 JSON 形式保存在 GitHub 仓库中,既是阅读入口,也可作为可下载的离线档案。',
  'home.intro.cite.title': '如何引用?',
  'home.intro.cite.body':
    '每条资源详情页都提供 APA / MLA / GB/T 7714 / BibTeX 四种引用格式,点击即可复制。',
  'home.intro.contrib.title': '如何参与?',
  'home.intro.contrib.body': '提交 PR 新增一条资源,或在 issue 中指出过期链接与错误。详见',

  'resources.title': '全部资源',
  'resources.subtitle': '按类型、学科、关键词浏览整个目录。',
  'resources.filter.type': '类型',
  'resources.filter.discipline': '学科',
  'resources.filter.all': '全部',
  'resources.empty': '当前筛选下没有匹配的资源。',
  'resources.summary': '共 {n} 项',
  'resources.countLabel': '资源',

  'type.paper': '论文',
  'type.dataset': '数据集',
  'type.book': '教材',
  'type.tutorial': '教程',
  'type.all': '全部',

  'detail.back': '返回资源列表',
  'detail.tags': '标签',
  'detail.abstract.toggle': '摘要',
  'detail.actions.download': '下载',
  'detail.actions.doi': '查看 DOI',
  'detail.actions.source': '查看来源',
  'detail.actions.nolink': '无链接',
  'detail.actions.copy': '复制引用',
  'detail.actions.save': '收藏',
  'detail.actions.saved': '已收藏',
  'detail.also': '另见:',
  'detail.cite.title': '引用此资源',
  'detail.cite.apa': 'APA',
  'detail.cite.mla': 'MLA',
  'detail.cite.gbt': 'GB/T 7714',
  'detail.cite.bibtex': 'BibTeX',
  'detail.cite.previewAll': '预览所有引用格式',
  'detail.related.title': '你可能也会喜欢',
  'detail.notFound.title': '资源未找到',
  'detail.notFound.body': '请求的资源不在目录中。',

  'discipline.subdisciplines': '子学科',
  'discipline.yearSpan': '时间跨度',
  'discipline.viewAll': '查看 {name} 全部资源',
  'discipline.empty': '本学科暂无收录资源。',

  'search.title': '搜索',
  'search.empty.title': '输入关键词开始搜索',
  'search.empty.body': '搜索会扫描标题、作者、摘要、标签、学科与会议/期刊名。',
  'search.results.title': '“{q}” 的搜索结果',
  'search.results.count': '共 {n} 条',
  'search.noResults': '未找到与 “{q}” 相关的资源。换一个更宽泛的词试试。',

  'favorites.title': '收藏夹',
  'favorites.subtitle': '你保存下来方便以后阅读的资源。',
  'favorites.export': '导出 JSON',
  'favorites.clearAll': '清空全部',
  'favorites.empty.title': '暂无收藏',
  'favorites.empty.body': '在资源卡片上点击书签图标即可加入收藏。',
  'favorites.confirm.clear': '确定要清空全部收藏吗?该操作不可撤销。',

  'settings.title': '设置',
  'settings.subtitle': '调整阅读体验。',
  'settings.theme.title': '主题',
  'settings.theme.light': { label: '浅色', desc: '纸白底、墨黑字 — 印刷期刊质感。' },
  'settings.theme.dark': { label: '深色', desc: '墨黑底,夜间阅读更舒适。' },
  'settings.theme.auto': { label: '跟随系统', desc: '自动适配操作系统的明暗设置。' },
  'settings.font.title': '字号',
  'settings.font.standard': { label: '标准', desc: '17px 基础字号,编辑部默认。' },
  'settings.font.large': { label: '加大', desc: '18px 基础字号,适合慢速精读。' },
  'settings.motion.title': '动效',
  'settings.motion.full': { label: '完整', desc: '保留所有过渡动画,0.3s。' },
  'settings.motion.reduced': { label: '减弱', desc: '过渡更短,减少视觉负担。' },
  'settings.motion.off': { label: '关闭', desc: '无动画,瞬时切换。' },
  'settings.lang.title': '语言',
  'settings.lang.en': { label: 'English', desc: '界面主语言。' },
  'settings.lang.zh': { label: '中文', desc: '将界面切到中文(资源元数据保留原语种)。' },
  'settings.reset': '重置所有设置',
  'settings.confirm.reset': '确定要重置所有设置到默认值吗?',
  'settings.selected': '已选择',

  'about.title': '关于',
  'about.subtitle': '它是什么,以及不是什么。',
  'about.mission.title': '宗旨',
  'about.mission.body':
    'ScholarHUB 索引对本科生与初阶科研者有用的开放学术资源 — 论文、教材、数据集、教程。我们不托管文件,只整理可免费、合法获取的链接。',
  'about.scope.title': '收录范围',
  'about.scope.body':
    '资源需满足: (a) 无需机构登录即可访问; (b) 来源可追溯到已知作者或机构; (c) 适合学生群体。',
  'about.data.title': '数据格式',
  'about.data.body':
    '目录以强类型 TypeScript 模块形式存放在 src/data/。每条记录包含标题、作者、年份、类型、摘要、链接、标签,以及 APA / MLA / GB/T 7714 / BibTeX 四种预格式化引用。',
  'about.contribute.title': '参与',
  'about.contribute.body':
    '最快的帮助方式是提交一个 issue 报告失效链接或缺失资源。要新增资源,请提交修改 src/data/resources.ts 的 PR。',
  'about.license.title': '许可',
  'about.license.body':
    '代码: MIT 协议。资源元数据: CC BY 4.0。原始资源保留各自许可,详见每条资源详情页。',

  'card.details': '详情',
  'card.fav.add': '加入收藏',
  'card.fav.remove': '取消收藏',
  'card.fav.add.title': '收藏',
  'card.fav.remove.title': '已收藏 · 点击移除',
  'card.summary': '{type} · {year} · {tags} 个主题',

  'disciplineCard.count': '{n} 项资源',
  'disciplineCard.viewAll': '查看 {name} 全部资源',
  'disciplineCard.empty': '本学科暂无收录资源。',
  'discipline.notFound.title': '学科未找到',

  'toast.fav.added': '已加入收藏',
  'toast.fav.removed': '已移出收藏',
  'toast.cite.copied': '{format} 引用已复制到剪贴板',
  'toast.cite.failed': '复制失败 — 请手动复制',

  'common.yes': '是',
  'common.no': '否',
  'common.cancel': '取消',
  'common.ok': '好',
}

export const dicts = { en, zh } as const
export type Lang = keyof typeof dicts
