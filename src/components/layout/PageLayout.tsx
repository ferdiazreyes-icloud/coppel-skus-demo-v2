import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import TourLauncher from '../tour/TourLauncher'
import TourAutoStart from '../tour/TourAutoStart'
import CrossRoleTour from '../tour/CrossRoleTour'
import { useTourStore } from '../../stores/useTourStore'

export default function PageLayout() {
  const { activeTour, endTour } = useTourStore()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1440px] w-full mx-auto">
        <Outlet />
      </main>
      <Footer />
      <TourAutoStart />
      <CrossRoleTour
        open={activeTour === 'crossRole'}
        onClose={endTour}
      />
      <TourLauncher />
    </div>
  )
}
