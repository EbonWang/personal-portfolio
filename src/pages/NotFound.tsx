import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-6xl font-extrabold text-white/10">404</p>
      <h1 className="mt-2 text-3xl font-bold text-white">页面不存在</h1>
      <p className="mt-3 text-slate-400">你访问的页面可能已被移动或删除。</p>
      <Link to="/" className="btn-primary mt-8">
        返回首页
      </Link>
    </div>
  )
}
