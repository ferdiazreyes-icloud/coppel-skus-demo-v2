import { Globe, Bell, Menu } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, clearRole } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearRole()
    navigate('/')
  }

  return (
    <header className="h-[112px] bg-coppel-blue flex items-center px-8 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-[250px]">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-coppel-yellow" />
          <span className="w-2.5 h-2.5 rounded-full bg-coppel-yellow" />
          <span className="w-2.5 h-2.5 rounded-full bg-coppel-yellow" />
        </div>
        <span className="font-sans text-3xl font-bold text-white">Coppel</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Menu (mobile) */}
        <button className="text-white hover:text-coppel-yellow transition-colors lg:hidden">
          <Menu className="w-6 h-6" />
        </button>

        {/* Language */}
        <button className="flex items-center gap-2 text-white hover:text-coppel-yellow transition-colors">
          <Globe className="w-6 h-6" />
          <span className="text-sm hidden sm:inline">English</span>
        </button>

        {/* Notifications */}
        <button className="flex items-center gap-2 text-white hover:text-coppel-yellow transition-colors relative">
          <Bell className="w-6 h-6" />
          <span className="text-sm hidden sm:inline">Notificaciones</span>
        </button>

        {/* User */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-coppel-yellow transition-colors"
        >
          {user && (
            <>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-medium text-white">{user.initials}</span>
              </div>
              <span className="text-sm hidden sm:inline">{user.name}</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
