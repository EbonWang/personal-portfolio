export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function isImageFile(file: File): boolean {
  return /image\/(jpeg|png|svg\+xml|webp)/.test(file.type)
}

export function isValidImage(file: File): { ok: true } | { ok: false; error: string } {
  if (file.size > 2 * 1024 * 1024) {
    return { ok: false, error: '图片不能超过 2MB' }
  }
  if (!isImageFile(file)) {
    return { ok: false, error: '仅支持 jpg / png / svg / webp 格式' }
  }
  return { ok: true }
}
