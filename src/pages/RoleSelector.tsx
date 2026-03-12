import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayCircle } from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore'
import { useTourStore } from '../stores/useTourStore'
import CoppelLogo from '../components/ui/CoppelLogo'
import CrossRoleTour from '../components/tour/CrossRoleTour'

export default function RoleSelector() {
  const navigate = useNavigate()
  const setRole = useAuthStore((s) => s.setRole)
  const { startTour, endTour } = useTourStore()
  const [showCrossRoleTour, setShowCrossRoleTour] = useState(false)

  const handleSelect = (role: 'comprador' | 'proveedor') => {
    setRole(role)
    navigate(role === 'comprador' ? '/comprador' : '/proveedor')
  }

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-6">
      <div className="w-full max-w-[800px]">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <CoppelLogo variant="navy" />
        </div>

        <h1 className="font-sans text-2xl font-semibold text-coppel-navy text-center mb-2">
          Portal SGC — Gestión de SKU's
        </h1>
        <p className="text-text-muted text-center mb-10">
          Selecciona tu rol para acceder al portal
        </p>

        {/* Demo tour button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              startTour('crossRole')
              setShowCrossRoleTour(true)
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-pill bg-coppel-navy text-white text-sm font-semibold hover:bg-coppel-blue transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            Ver demo guiada del flujo completo
          </button>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Comprador */}
          <button
            onClick={() => handleSelect('comprador')}
            className="bg-bg-card rounded-md p-8 border-2 border-border hover:border-coppel-blue hover:shadow-lg transition-all cursor-pointer text-left group"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Juanita Solis"
                className="w-16 h-16 rounded-full object-cover border-3 border-coppel-blue-light group-hover:border-coppel-blue transition-colors"
              />
              <div>
                <h2 className="font-sans text-xl font-semibold text-coppel-navy">
                  Comprador
                </h2>
                <p className="text-text-muted text-xs">
                  Juanita Solis
                </p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Evalúa propuestas, solicita muestras, da de alta SKU's y gestiona proveedores.
            </p>
          </button>

          {/* Proveedor */}
          <button
            onClick={() => handleSelect('proveedor')}
            className="bg-bg-card rounded-md p-8 border-2 border-border hover:border-coppel-blue hover:shadow-lg transition-all cursor-pointer text-left group"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://images.pexels.com/photos/7841788/pexels-photo-7841788.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Felipe López"
                className="w-16 h-16 rounded-full object-cover border-3 border-coppel-blue-light group-hover:border-coppel-blue transition-colors"
              />
              <div>
                <h2 className="font-sans text-xl font-semibold text-coppel-navy">
                  Proveedor
                </h2>
                <p className="text-text-muted text-xs">
                  Felipe López — Mattel S.A. de C.V.
                </p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Envía propuestas de productos, llena fichas técnicas y complementa información de SKU's.
            </p>
          </button>
        </div>
      </div>

      <CrossRoleTour
        open={showCrossRoleTour}
        onClose={() => {
          setShowCrossRoleTour(false)
          endTour()
          // Navigate back to role selector
          navigate('/')
        }}
      />
    </div>
  )
}
