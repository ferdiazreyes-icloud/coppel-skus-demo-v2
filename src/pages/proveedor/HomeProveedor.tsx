import { useNavigate } from 'react-router-dom'
import {
  User, BookOpen, FileText, FolderOpen,
  MapPin, Building2, Factory,
  ChevronRight, Globe, Lock,
} from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import Breadcrumb from '../../components/layout/Breadcrumb'

const quickActions = [
  { icon: User, label: 'Mi cuenta', to: '#' },
  { icon: BookOpen, label: 'Catálogos', to: '#' },
  { icon: FileText, label: 'Mis solicitudes', to: '/proveedor/solicitudes' },
  { icon: FolderOpen, label: 'Documentos', to: '#' },
]

const solicitudCards = [
  {
    image: 'https://images.pexels.com/photos/5156696/pexels-photo-5156696.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Nueva solicitud',
    description: 'Envía tus propuestas al comprador',
    buttonLabel: 'Enviar solicitud',
    to: '/proveedor/solicitudes',
  },
  {
    image: 'https://images.pexels.com/photos/6248988/pexels-photo-6248988.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Historial de solicitudes',
    description: 'Verifica el estatus de tus registros',
    buttonLabel: 'Ver historial',
    to: '/proveedor/solicitudes',
  },
]

const accountCards = [
  { icon: User, title: 'Mi perfil', buttonLabel: 'Editar perfil', to: '#' },
  { icon: MapPin, title: 'Direcciones', buttonLabel: 'Administrar direcciones', to: '#' },
  { icon: Factory, title: 'Información de fábrica', buttonLabel: 'Configurar información de fábrica', to: '#' },
  { icon: Globe, title: 'Redes sociales', buttonLabel: 'Vincular cuentas', to: '#' },
  { icon: Building2, title: 'Información de la empresa', buttonLabel: 'Administrar perfil de empresa', to: '#' },
  { icon: Lock, title: 'Propuestas y operaciones', buttonLabel: 'Ver mis propuestas', to: '/proveedor/solicitudes' },
]

export default function HomeProveedor() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  return (
    <div>
      <Breadcrumb items={[{ label: 'Inicio' }]} />

      <div className="px-6 pb-10">
        {/* Greeting */}
        <h1 data-tour="greeting" className="font-sans text-xl font-semibold text-text-primary italic mb-6">
          Bienvenido, {user?.name}
        </h1>

        {/* Banner */}
        <div data-tour="banner" className="relative rounded-lg overflow-hidden mb-4">
          <img
            src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Banner Proveedor"
            className="w-full h-[220px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coppel-navy/80 to-transparent flex items-center px-12">
            <div>
              <h2 className="font-sans text-2xl font-bold text-white leading-tight">
                Bienvenido al Sistema de<br />Gestión de Categorías
              </h2>
              <p className="text-white/90 text-sm mt-2 max-w-sm">
                Descubre los beneficios de ser proveedor Coppel
              </p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-coppel-blue" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-dark" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-dark" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-dark" />
        </div>

        {/* Quick Actions */}
        <div data-tour="quick-actions" className="flex justify-center gap-8 mb-10">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-coppel-blue flex items-center justify-center group-hover:bg-coppel-blue-hover transition-colors">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-text-primary text-center font-medium">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Solicitudes */}
        <h2 className="font-sans text-lg font-bold text-text-primary mb-4">Solicitudes</h2>
        <div data-tour="solicitudes" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {solicitudCards.map((card) => (
            <div
              key={card.title}
              className="bg-bg-card rounded-lg overflow-hidden border border-border shadow-sm"
            >
              <div className="h-40 overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-sans text-base font-bold text-text-primary">{card.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{card.description}</p>
                <button
                  onClick={() => navigate(card.to)}
                  className="mt-4 w-full h-10 rounded-pill bg-coppel-blue text-white text-sm font-semibold hover:bg-coppel-blue-hover transition-colors"
                >
                  {card.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mi cuenta */}
        <h2 className="font-sans text-lg font-bold text-text-primary mb-4">Mi cuenta</h2>
        <div data-tour="mi-cuenta" className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {accountCards.map((card) => (
            <div
              key={card.title}
              className="bg-bg-card rounded-lg border border-border p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-coppel-blue-light flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-coppel-blue" />
                </div>
                <h3 className="font-sans text-sm font-semibold text-text-primary">{card.title}</h3>
              </div>
              <button
                onClick={() => navigate(card.to)}
                className="w-full h-9 rounded-pill bg-coppel-yellow text-coppel-navy text-sm font-semibold hover:bg-coppel-yellow-hover transition-colors flex items-center justify-center gap-1"
              >
                {card.buttonLabel}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
