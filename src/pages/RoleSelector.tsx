import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import CoppelLogo from '../components/ui/CoppelLogo'

export default function RoleSelector() {
  const navigate = useNavigate()
  const setRole = useAuthStore((s) => s.setRole)

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
    </div>
  )
}
