import { Outlet } from 'react-router-dom'
import Starfield from '../components/Starfield'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollManager from '../components/ScrollManager'

export default function FrontLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Starfield />
      <ScrollManager />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
