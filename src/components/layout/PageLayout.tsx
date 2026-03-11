import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1440px] w-full mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
