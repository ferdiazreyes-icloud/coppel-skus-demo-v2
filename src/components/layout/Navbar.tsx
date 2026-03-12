import { useState, useRef, useEffect } from 'react'
import { Globe, Bell, Menu } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNotificationStore } from '../../stores/useNotificationStore'
import { useNavigate } from 'react-router-dom'
import CoppelLogo from '../ui/CoppelLogo'

export default function Navbar() {
  const { role, user, clearRole } = useAuthStore()
  const { getUnreadCount, getForRole, markAsRead, markAllAsRead } = useNotificationStore()
  const navigate = useNavigate()
  const [showNotifs, setShowNotifs] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const unreadCount = role ? getUnreadCount(role) : 0
  const notifications = role ? getForRole(role) : []

  const handleLogout = () => {
    clearRole()
    navigate('/')
  }

  const handleNotifClick = (notifId: string, link?: string) => {
    markAsRead(notifId)
    setShowNotifs(false)
    if (link) navigate(link)
  }

  // Close panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowNotifs(false)
      }
    }
    if (showNotifs) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showNotifs])

  return (
    <header className="h-[112px] bg-coppel-blue flex items-center px-8 shrink-0">
      {/* Logo */}
      <div className="min-w-[250px]">
        <CoppelLogo variant="white" />
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
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="flex items-center gap-2 text-white hover:text-coppel-yellow transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <span className="text-sm hidden sm:inline">Notificaciones</span>
          </button>

          {/* Dropdown panel */}
          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-bg-card rounded-md border border-border shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-sans text-sm font-semibold text-text-primary">
                  Notificaciones
                </h3>
                {unreadCount > 0 && role && (
                  <button
                    onClick={() => markAllAsRead(role)}
                    className="text-xs text-coppel-blue font-medium hover:underline"
                  >
                    Marcar todas como leídas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-text-muted text-center">
                    No hay notificaciones
                  </p>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => handleNotifClick(notif.id, notif.link)}
                      className={`w-full text-left px-4 py-3 border-b border-border last:border-b-0 hover:bg-bg-light transition-colors ${
                        !notif.read ? 'bg-coppel-blue-light/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-coppel-blue shrink-0 mt-1.5" />
                        )}
                        <div className={!notif.read ? '' : 'pl-4'}>
                          <p className="text-sm font-semibold text-text-primary">
                            {notif.title}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                            {notif.message}
                          </p>
                          <p className="text-[10px] text-text-muted mt-1">
                            {new Date(notif.createdAt).toLocaleDateString('es-MX', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-coppel-yellow transition-colors"
        >
          {user && (
            <>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{user.initials}</span>
                </div>
              )}
              <span className="text-sm hidden sm:inline">{user.name}</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
