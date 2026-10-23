import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { useContent } from '../lib/content'
import { formatDate } from '../lib/format'
import Markdown from '../components/Markdown'
import { Container } from '../components/SectionHeading'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { content } = useContent()
  const project = content.projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-bold text-white">项目不存在</h1>
        <p className="mt-3 text-slate-400">你访问的项目可能已被移动或删除。</p>
        <Link to="/#projects" className="btn-primary mt-8">
          返回项目
        </Link>
      </div>
    )
  }

  return (
    <div className="py-24">
      <Container className="max-w-3xl">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> 返回项目
        </Link>

        <header className="mt-6">
          <div className="mb-5 overflow-hidden rounded-2xl border border-white/[0.06]">
            <img src={project.cover} alt={project.title} className="aspect-[16/7] w-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{project.title}</h1>
          <p className="mt-3 text-slate-400">{project.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                在线演示 <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500">{formatDate(project.date)}</span>
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent-300">
                {t}
              </span>
            ))}
          </div>
        </header>

        <hr className="my-8 border-white/10" />

        <Markdown>{project.content}</Markdown>
      </Container>
    </div>
  )
}
