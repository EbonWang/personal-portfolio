import { useRef, useState, type ChangeEvent } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { fileToDataUrl, isValidImage } from '../lib/file'

export default function ImageUpload({
  value,
  onChange,
  hint,
}: {
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const check = isValidImage(file)
    if (!check.ok) {
      setError(check.error)
      return
    }
    setError('')
    const url = await fileToDataUrl(file)
    onChange(url)
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative">
            <img src={value} alt="预览" className="h-16 w-16 rounded-lg border border-white/10 object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white"
              aria-label="移除"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-white/15 text-slate-500 transition hover:border-accent/50 hover:text-accent-300"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-white/25"
        >
          上传图片
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
      {hint && !error && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}
