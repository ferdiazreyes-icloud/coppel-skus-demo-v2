import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Truck } from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore'

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
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="flex gap-1">
            <span className="w-3 h-3 rounded-full bg-coppel-yellow" />
            <span className="w-3 h-3 rounded-full bg-coppel-yellow" />
            <span className="w-3 h-3 rounded-full bg-coppel-yellow" />
          </div>
          <span className="font-sans text-4xl font-bold text-coppel-navy">Coppel</span>
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
            <div className="w-16 h-16 rounded-lg bg-coppel-blue-light flex items-center justify-center mb-6 group-hover:bg-coppel-blue transition-colors">
              <ShoppingCart className="w-8 h-8 text-coppel-blue group-hover:text-white transition-colors" />
            </div>
            <h2 className="font-sans text-xl font-semibold text-coppel-navy mb-2">
              Comprador
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Evalúa propuestas, solicita muestras, da de alta SKU's y gestiona proveedores.
            </p>
            <p className="text-text-muted text-xs mt-4">
              Usuario: Juanita Solis
            </p>
          </button>

          {/* Proveedor */}
          <button
            onClick={() => handleSelect('proveedor')}
            className="bg-bg-card rounded-md p-8 border-2 border-border hover:border-coppel-blue hover:shadow-lg transition-all cursor-pointer text-left group"
          >
            <div className="w-16 h-16 rounded-lg bg-coppel-blue-light flex items-center justify-center mb-6 group-hover:bg-coppel-blue transition-colors">
              <Truck className="w-8 h-8 text-coppel-blue group-hover:text-white transition-colors" />
            </div>
            <h2 className="font-sans text-xl font-semibold text-coppel-navy mb-2">
              Proveedor
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Envía propuestas de productos, llena fichas técnicas y complementa información de SKU's.
            </p>
            <p className="text-text-muted text-xs mt-4">
              Usuario: Felipe López — Mattel S.A. de C.V.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
