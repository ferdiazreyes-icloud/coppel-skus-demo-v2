import { useNavigate } from 'react-router-dom'
import {
  User, BookOpen, FileText, FolderOpen,
  MapPin, Building2, Share2, Package,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import Breadcrumb from '../../components/layout/Breadcrumb'

const quickActions = [
  { icon: User, label: 'Mi perfil', to: '#' },
  { icon: BookOpen, label: 'Catálogos', to: '#' },
  { icon: FileText, label: 'Mis solicitudes', to: '/proveedor/solicitudes' },
  { icon: FolderOpen, label: 'Documentos', to: '#' },
]

const solicitudCards = [
  {
    image: 'https://placehold.co/400x200/e8edfa/1A3C9E?text=Solicitud',
    title: 'Nueva solicitud',
    description: 'Envía tus propuestas al compra...',
    buttonLabel: 'Enviar solicitud',
    to: '/proveedor/solicitudes',
  },
  {
    image: 'https://placehold.co/400x200/e8edfa/1A3C9E?text=Historial',
    title: 'Historial de solicitudes',
    description: 'Verifica el estatus de tus registr...',
    buttonLabel: 'Ver historial',
    to: '/proveedor/solicitudes',
  },
]

const accountCards = [
  { icon: User, title: 'Mi perfil', buttonLabel: 'Editar perfil', to: '#' },
  { icon: MapPin, title: 'Direcciones', buttonLabel: 'Administrar direcciones', to: '#' },
  { icon: Building2, title: 'Información de la empresa', buttonLabel: 'Configurar perfil comercial', to: '#' },
  { icon: Share2, title: 'Redes sociales', buttonLabel: 'Vincular redes', to: '#' },
  { icon: FolderOpen, title: 'Documentos', buttonLabel: 'Gestionar documentos', to: '#' },
  { icon: Package, title: 'Productos y catálogos', buttonLabel: 'Ver mis productos', to: '#' },
]

export default function HomeProveedor() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  return (
    <div>
      <Breadcrumb items={[{ label: 'Inicio' }]} />

      <div className="px-6 pb-10">
        {/* Greeting */}
        <h1 className="font-sans text-xl font-semibold text-text-primary italic mb-6">
          Bienvenido, {user?.name}
        </h1>

        {/* Banner */}
        <div className="relative rounded-lg overflow-hidden mb-4">
          <img
            src="https://placehold.co/900x250/1A3C9E/ffffff?text=Descubre+los+beneficios+de+ser+proveedor+Coppel"
            alt="Banner Proveedor"
            className="w-full h-[220px] object-cover"
          />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-coppel-blue" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-dark" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-dark" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-dark" />
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-8 mb-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
