import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useContent } from '../lib/content'
import { formatDate } from '../lib/format'
import Markdown from '../components/Markdown'
import { Container } from '../components/SectionHeading'

export default function BlogPost() {
  const { slug } = useParams()
  const { content } = useContent()
  const post = content.posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-bold text-white">文章不存在</h1>
        <p className="mt-3 text-slate-400">你访问的文章可能已被移动或删除。</p>
        <Link to="/blog" className="btn-primary mt-8">
          返回博客
        </Link>
      </div>
    )
  }

  return (
    <div className="py-24">
      <Container className="max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> 返回博客
        </Link>

        <header className="mt-6">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>阅读约 {post.readingTime} 分钟</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent-300">
                {t}
              </span>
            ))}
          </div>
        </header>

        <hr className="my-8 border-white/10" />

        <Markdown>{post.content}</Markdown>
      </Container>
    </div>
  )
}
