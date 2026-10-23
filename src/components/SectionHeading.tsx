import type { ReactNode } from 'react'

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
}: {
  title: string
  subtitle?: string
  eyebrow?: string
}) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-slate-400">{subtitle}</p>}
    </div>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>
}
