export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')

  // If nothing usable remains, or the title is non-latin (e.g. Chinese),
  // fall back to a short unique id so URLs stay clean and unique.
  if (!base || /[\u4e00-\u9fa5]/.test(base)) {
    return 'post-' + Date.now().toString(36)
  }
  return base
}

export function readingTimeOf(content: string): number {
  const chars = content.replace(/\s+/g, '').length
  return Math.max(1, Math.ceil(chars / 400))
}
