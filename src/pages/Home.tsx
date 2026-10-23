import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { useContent } from '../lib/content'
import { formatDate } from '../lib/format'
import SectionHeading, { Container } from '../components/SectionHeading'
import { SocialIcon } from '../components/SocialIcon'
import Reveal from '../components/Reveal'

export default function Home() {
  const { content } = useContent()
  const { profile, skills, projects, posts, socials } = content

  const skillCategories = [...new Set(skills.map((s) => s.category))]

  return (
    <>
      <Hero profile={profile} socials={socials} />
      <About profile={profile} />
      <SkillsSection skills={skills} categories={skillCategories} />
      <ProjectsSection projects={projects} />
      <BlogSection posts={posts} />
      <ContactSection email={profile.email} socials={socials} />
    </>
  )
}

function Hero({
  profile,
  socials,
}: {
  profile: ReturnType<typeof useContent>['content']['profile']
  socials: ReturnType<typeof useContent>['content']['socials']
}) {
  return (
    <section id="home" className="relative flex min-h-screen items-center">
      <Container className="py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mb-8 inline-flex">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-28 w-28 rounded-full object-cover ring-2 ring-accent/60 ring-offset-4 ring-offset-ink-900"
            />
          </div>
          <h1
            className="animate-fade-up text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
            style={{ animationDelay: '0.05s' }}
          >
            {profile.name}
          </h1>
          <p
            className="animate-fade-up mt-3 text-gradient text-xl font-semibold sm:text-2xl"
            style={{ animationDelay: '0.1s' }}
          >
            {profile.title}
          </p>
          <p className="animate-fade-up mt-4 text-lg text-slate-400" style={{ animationDelay: '0.15s' }}>
            {profile.tagline}
          </p>

          <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '0.2s' }}>
            <Link to="/#projects" className="btn-primary">
              看项目 <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              下载简历
            </a>
            <Link
              to="/#contact"
              className="btn-secondary"
            >
              联系我
            </Link>
          </div>

          <div className="animate-fade-up mt-14 flex items-center justify-center gap-5" style={{ animationDelay: '0.28s' }}>
            {socials.map((s) => (
              <a
                key={s.label + s.url}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-accent/50 hover:text-white"
                title={s.label}
              >
                <SocialIcon icon={s.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <Link
        to="/#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-slate-200"
        aria-label="向下滚动"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </Link>
    </section>
  )
}

function About({ profile }: { profile: ReturnType<typeof useContent>['content']['profile'] }) {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading title="关于我" subtitle="简单介绍一下自己" eyebrow="About" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:contents">
            <div className="card p-7">
              <p className="text-slate-300 leading-relaxed">{profile.bio}</p>
              <div className="mt-6 space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-accent-300" />
                  {profile.email}
                </div>
                {profile.location && (
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-accent-300" />
                    {profile.location}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-10">
            {profile.timeline.length > 0 && (
              <div>
                <h3 className="mb-5 text-lg font-semibold text-white">工作经历</h3>
                <ol className="relative space-y-7 border-l border-white/10 pl-6">
                  {profile.timeline.map((item, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/20" />
                      <span className="text-xs font-medium text-accent-300">{item.period}</span>
                      <h4 className="mt-1 font-semibold text-white">
                        {item.role} · {item.org}
                      </h4>
                      {item.description && <p className="mt-1 text-sm text-slate-400">{item.description}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {profile.education.length > 0 && (
              <div>
                <h3 className="mb-5 text-lg font-semibold text-white">教育背景</h3>
                <ol className="relative space-y-7 border-l border-white/10 pl-6">
                  {profile.education.map((item, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan2 ring-4 ring-cyan2/20" />
                      <span className="text-xs font-medium text-cyan2">{item.period}</span>
                      <h4 className="mt-1 font-semibold text-white">
                        {item.school}
                      </h4>
                      <p className="text-sm text-slate-300">{item.degree}</p>
                      {item.description && <p className="mt-1 text-sm text-slate-400">{item.description}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function SkillsSection({
  skills,
  categories,
}: {
  skills: ReturnType<typeof useContent>['content']['skills']
  categories: string[]
}) {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading title="技能" subtitle="我常用的技术栈" eyebrow="Skills" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat} delay={i * 60} className="h-full">
              <div className="card h-full p-6">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-accent-300">{cat}</h3>
              <ul className="space-y-4">
                {skills
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <li key={s.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-200">
                          {s.icon && <span aria-hidden>{s.icon}</span>}
                          {s.name}
                        </span>
                        <span className="text-xs text-slate-500">{s.years} 年</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-cyan2"
                          style={{ width: `${(s.level / 5) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProjectsSection({ projects }: { projects: ReturnType<typeof useContent>['content']['projects'] }) {
  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading title="项目" subtitle="我做过的部分项目" eyebrow="Projects" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70} className="h-full">
            <Link
              to={`/projects/${p.slug}`}
              className="card group block h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-ink-700 to-ink-900">
                <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                {p.featured && (
                  <span className="absolute right-3 top-3 rounded-full bg-accent/90 px-2.5 py-0.5 text-xs font-medium text-white">
                    精选
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white transition group-hover:text-accent-300">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function BlogSection({ posts }: { posts: ReturnType<typeof useContent>['content']['posts'] }) {
  const recent = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3)

  return (
    <section id="blog" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading title="博客" subtitle="最近的几篇文章" eyebrow="Blog" />
        <div className="space-y-4">
          {recent.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
            <Link
              to={`/blog/${post.slug}`}
              className="card group flex flex-col gap-2 p-6 transition hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white transition group-hover:text-accent-300">{post.title}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-slate-400">{post.excerpt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-xs text-slate-500">
                <span>{formatDate(post.date)}</span>
                <span className="text-slate-600">·</span>
                <span>{post.readingTime} 分钟</span>
                <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-accent-300" />
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/blog" className="btn-primary">
            查看全部文章 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

function ContactSection({
  email,
  socials,
}: {
  email: string
  socials: ReturnType<typeof useContent>['content']['socials']
}) {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // clipboard API may be unavailable; ignore
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading
          title="联系我"
          subtitle="有合作意向或想聊一聊？"
          eyebrow="Contact"
        />
        <p className="-mt-6 mb-10 text-center text-sm text-slate-400">欢迎通过邮箱或社交平台与我联系，我会尽快回复。</p>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal className="h-full">
          <div className="card flex h-full flex-col justify-between p-7">
            <div className="space-y-4">
              <button
                type="button"
                onClick={copyEmail}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-left transition hover:border-accent/50"
              >
                <span className="flex items-center gap-3 text-sm text-slate-200">
                  <Mail className="h-4 w-4 text-accent-300" />
                  {email}
                </span>
                {copied ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
                    <Check className="h-4 w-4" /> 已复制
                  </span>
                ) : (
                  <Copy className="h-4 w-4 text-slate-500" />
                )}
              </button>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label + s.url}
                    href={s.url}
                    target={s.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-accent/50 hover:text-white"
                    title={s.label}
                  >
                    <SocialIcon icon={s.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          </Reveal>

          <Reveal delay={100} className="h-full">
          <form className="card h-full space-y-4 p-7" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-slate-300">
                姓名
              </label>
              <input id="name" name="name" required placeholder="你的姓名" className="input" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-slate-300">
                邮箱
              </label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className="input" />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-slate-300">
                消息
              </label>
              <textarea id="message" name="message" required rows={4} placeholder="想说的话…" className="input resize-none" />
            </div>
            {sent && <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">消息已发送，我会尽快回复你！</p>}
            <button type="submit" className="btn-primary w-full">
              发送消息
            </button>
          </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
