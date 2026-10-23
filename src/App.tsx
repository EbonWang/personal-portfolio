import { Link, Route, Routes } from 'react-router-dom'
import FrontLayout from './layouts/FrontLayout'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'
import Login from './admin/Login'
import RequireAuth from './admin/RequireAuth'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import Posts from './admin/Posts'
import PostEdit from './admin/PostEdit'
import Projects from './admin/Projects'
import ProjectEdit from './admin/ProjectEdit'
import Skills from './admin/Skills'
import ProfilePage from './admin/Profile'
import SettingsPage from './admin/Settings'

function AdminNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-extrabold text-white/10">404</p>
      <h1 className="mt-2 text-2xl font-bold text-white">页面不存在</h1>
      <p className="mt-2 text-sm text-slate-400">你访问的页面可能已被移动或删除。</p>
      <Link to="/admin" className="btn-primary mt-6">
        返回仪表盘
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<FrontLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/new" element={<PostEdit />} />
        <Route path="posts/:slug/edit" element={<PostEdit />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<ProjectEdit />} />
        <Route path="projects/:slug/edit" element={<ProjectEdit />} />
        <Route path="skills" element={<Skills />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<AdminNotFound />} />
      </Route>
    </Routes>
  )
}
