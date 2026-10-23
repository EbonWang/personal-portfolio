import { useState } from 'react'
import Markdown from '../components/Markdown'

type Mode = 'edit' | 'split' | 'preview'

const MODES: { key: Mode; label: string }[] = [
  { key: 'edit', label: '编辑' },
  { key: 'split', label: '分屏' },
  { key: 'preview', label: '预览' },
]

export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [mode, setMode] = useState<Mode>('edit')

  return (
    <div className="rounded-xl border border-white/10 bg-ink-800/40">
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-1.5">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              mode === m.key ? 'bg-accent/20 text-accent-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'edit' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="支持 Markdown 语法…"
          className="min-h-[320px] w-full resize-y bg-transparent p-4 font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600"
        />
      )}

      {mode === 'split' && (
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="支持 Markdown 语法…"
            className="min-h-[320px] w-full resize-y bg-transparent p-4 font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600"
          />
          <div className="min-h-[320px] overflow-auto p-4">
            <Markdown>{value || '暂无内容'}</Markdown>
          </div>
        </div>
      )}

      {mode === 'preview' && (
        <div className="min-h-[320px] p-4">
          <Markdown>{value || '暂无内容'}</Markdown>
        </div>
      )}
    </div>
  )
}
