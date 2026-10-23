import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useContent } from '../lib/content'
import { formatDate } from '../lib/format'
import { PageHeader } from './ui'

export default function Posts() {
  const { content, update } = useContent()
  const posts = [...content.posts].sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const remove = (slug: string) => {
    if (!window.confirm('确定要删除这篇文章吗？此操作不可撤销。')) return
    update((prev) => ({ ...prev, posts: prev.posts.filter((p) => p.slug !== slug) }))
  }

  return (
    <div>
      <PageHeader
        title="博客管理"
        description="管理博客文章"
        actions={
          <Link to="/admin/posts/new" className="btn-primary">
            <Plus className="h-4 w-4" /> 新建文章
          </Link>
        }
      />

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.slug} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-white">{post.title}</h3>
              <p className="mt-1 line-clamp-1 text-sm text-slate-400">{post.excerpt}</p>
              <p className="mt-1 text-xs text-slate-500">
                {formatDate(post.date)} · {post.readingTime} 分钟
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to={`/admin/posts/${post.slug}/edit`}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 transition hover:border-white/25"
              >
                编辑
              </Link>
              <button
                type="button"
                onClick={() => remove(post.slug)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:border-rose-500/50 hover:text-rose-400"
              >
                删除
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-slate-400">
            暂无文章，点击「新建文章」开始创作。
          </p>
        )}
      </div>
    </div>
  )
}
