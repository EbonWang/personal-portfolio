export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string // ISO string
  tags: string[]
  readingTime: number
  content: string
  cover?: string
}

export interface ProjectLinks {
  demo?: string
  github?: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  cover: string
  tags: string[]
  links: ProjectLinks
  featured: boolean
  date: string // ISO string
  content: string
}

export interface Skill {
  category: string
  name: string
  level: number // 1 - 5
  icon: string
  years: number
}

export interface TimelineItem {
  period: string
  role: string
  org: string
  description: string
}

export interface EducationItem {
  period: string
  school: string
  degree: string
  description: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  avatar: string
  email: string
  location: string
  resume: string
  bio: string
  timeline: TimelineItem[]
  education: EducationItem[]
}

export type SocialIcon = 'github' | 'blog' | 'mail'

export interface Social {
  label: string
  url: string
  icon: SocialIcon
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
}

export interface SiteContent {
  posts: Post[]
  projects: Project[]
  skills: Skill[]
  profile: Profile
  socials: Social[]
  settings: SiteSettings
}

export interface AuthUser {
  username: string
  name: string
}
