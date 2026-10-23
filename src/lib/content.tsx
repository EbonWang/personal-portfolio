import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { DEFAULT_CONTENT } from './defaultData'
import type { SiteContent } from './types'

const STORAGE_KEY = 'myshow.content.v1'

function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_CONTENT
    const parsed = JSON.parse(raw) as Partial<SiteContent>
    // Merge with defaults so a partial/missing shape never crashes the site.
    return {
      ...DEFAULT_CONTENT,
      ...parsed,
      profile: { ...DEFAULT_CONTENT.profile, ...(parsed.profile ?? {}) },
      settings: { ...DEFAULT_CONTENT.settings, ...(parsed.settings ?? {}) },
    }
  } catch {
    return DEFAULT_CONTENT
  }
}

interface ContentContextValue {
  content: SiteContent
  update: (updater: (prev: SiteContent) => SiteContent) => void
  reset: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent)
  const contentRef = useRef(content)
  contentRef.current = content

  const update = (updater: (prev: SiteContent) => SiteContent) => {
    const next = updater(contentRef.current)
    contentRef.current = next
    setContent(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore quota / privacy errors
    }
  }

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    contentRef.current = DEFAULT_CONTENT
    setContent(DEFAULT_CONTENT)
  }

  return <ContentContext.Provider value={{ content, update, reset }}>{children}</ContentContext.Provider>
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
