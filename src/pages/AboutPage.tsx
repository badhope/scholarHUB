import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="page-fade mx-auto max-w-column px-6 sm:px-8 py-16">
      <p className="text-mono text-[11px] uppercase tracking-wider2 text-ink-mute mb-3">
        About
      </p>
      <h1 className="text-display text-4xl text-ink">关于 ScholarHUB</h1>

      <Section title="项目理念">
        <p>
          ScholarHUB 是一个由社区维护的开放学术资源目录。我们聚合散落在各论文网站、出版社与公开数据平台的可下载资源,按学科与主题归类整理,提供一致的元数据与多格式引用。
        </p>
        <p className="mt-4">
          我们相信学术资源应当像图书馆的开放书架一样可被发现、可被引用、可被复用。
        </p>
      </Section>

      <Section title="数据格式">
        <p>
          所有资源以 JSON 文件形式存储在 GitHub 仓库的 <code className="text-mono text-[12px]">src/data/</code> 目录中。
          每条记录包含标题、作者、年份、期刊、DOI、摘要、标签、下载链接与四种引用格式。
        </p>
      </Section>

      <Section title="如何引用本项目">
        <pre className="text-[14px] leading-7 text-ink whitespace-pre-wrap break-words border hairline rounded-[2px] p-4">
{`APA:
ScholarHUB Contributors. (2026). ScholarHUB: An open shelf of papers, books, and datasets (Version 1.0) [Software]. https://github.com/badhope/scholarHUB

BibTeX:
@software{scholarhub2026,
  title = {ScholarHUB: An open shelf of papers, books, and datasets},
  author = {{ScholarHUB Contributors}},
  year = {2026},
  version = {1.0},
  url = {https://github.com/badhope/scholarHUB}
}`}
        </pre>
      </Section>

      <Section title="贡献">
        <p>
          欢迎通过 Pull Request 新增资源、修正错误或改进排版。提交前请阅读
          <a
            className="ml-1 underline decoration-1 underline-offset-4 hover:text-moss"
            href="https://github.com/badhope/scholarHUB/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
          >
            CONTRIBUTING.md
          </a>
          。
        </p>
        <p className="mt-4">
          <Link to="/resources" className="underline decoration-1 underline-offset-4 hover:text-moss">
            浏览全部资源 →
          </Link>
        </p>
      </Section>

      <Section title="致谢">
        <p>
          字体 <em className="italic">Cormorant Garamond</em>、<em className="italic">EB Garamond</em> 由 Christian Thalmann 等设计师开源提供;
          中文字体 <em className="italic">Noto Serif SC</em> 由 Google & Adobe 共同维护。
          图标采用 lucide-react,组件基于 React + Vite + Tailwind CSS 构建。
        </p>
      </Section>

      <p className="mt-16 text-mono text-[11px] uppercase tracking-wider2 text-ink-mute">
        Vol. 1 · 2026 · Last updated 2026.06.11
      </p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-display text-2xl text-ink mb-4 border-b hairline pb-3">{title}</h2>
      <div className="text-[16px] leading-8 text-ink-soft">{children}</div>
    </section>
  )
}
