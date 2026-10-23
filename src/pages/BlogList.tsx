import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useContent } from '../lib/content'
import { formatDate } from '../lib/format'
import { Container } from '../components/SectionHeading'

export default function BlogList() {
  const { content } = useContent()
  const [params, setParams] = useSearchParams()
  const activeTag = params.get('tag') ?? ''

  const posts = [...content.posts].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  const allTags = [...new Set(content.posts.flatMap((p) => p.tags))]
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts

  return (
    <div className="py-24">
      <Container className="max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">博客</h1>
          <p className="mt-3 text-slate-400">共 {filtered.length} 篇文章</p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setParams({})}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              !activeTag ? 'bg-accent text-white' : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]'
            }`}
          >
            全部
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setParams({ tag: t })}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                activeTag === t ? 'bg-accent text-white' : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card group block p-6 transition hover:border-accent/40"
            >
              <div className="text-xs text-slate-500">
                {formatDate(post.date)} · {post.readingTime} 分钟
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white transition group-hover:text-accent-300">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent-300">
                    {t}
                  </span>
                ))}
                <ArrowRight className="ml-auto h-4 w-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-accent-300" />
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-slate-400">
              该标签下暂无文章。
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}
