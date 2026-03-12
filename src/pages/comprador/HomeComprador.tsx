import { useNavigate } from 'react-router-dom'
import { Lock, Truck, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import Breadcrumb from '../../components/layout/Breadcrumb'

const bannerImages = [
  'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200',
]

const quickActions = [
  { icon: Lock, label: 'Propuestas de\nSKU\'s', to: '/comprador/propuestas-skus' },
  { icon: Truck, label: 'Alta de\nproveedores', to: '/comprador/alta-skus' },
]

const featureCards = [
  {
    image: 'https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Generar Invitación',
    description: 'Invita prospectos a registrarse',
    buttonLabel: 'Generar QR',
    to: '#',
  },
  {
    image: 'https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Alta prospectos',
    description: 'Gestión completa de prospectos',
    buttonLabel: 'Ir a listado de prospectos',
    to: '#',
  },
  {
    image: 'https://images.pexels.com/photos/7163395/pexels-photo-7163395.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Propuestas y SKU\'s',
    description: 'Revisa y gestiona tus propuestas...',
    buttonLabel: 'Ver propuestas y SKU\'s',
    to: '/comprador/propuestas-skus',
  },
]

export default function HomeComprador() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  return (
    <div>
      <Breadcrumb items={[{ label: 'Inicio' }]} />

      <div className="px-6 pb-10">
        {/* Greeting */}
        <h1 data-tour="greeting" className="font-sans text-xl font-semibold text-text-primary italic mb-6">
          Bienvenida, {user?.name}
        </h1>

        {/* Banner Carousel */}
        <div data-tour="banner" className="relative rounded-lg overflow-hidden mb-4">
          <img
            src={bannerImages[0]}
            alt="Banner Coppel"
            className="w-full h-[250px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coppel-blue/70 to-transparent flex items-center px-12">
            <div>
              <h2 className="font-sans text-2xl font-bold text-white leading-tight">
                Portal de Proveedores
              </h2>
              <p className="text-white/90 text-sm mt-2 max-w-sm">
                Gestiona propuestas, SKU&apos;s y proveedores en un solo lugar
              </p>
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-coppel-blue" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-dark" />
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
              <span className="text-xs text-text-primary text-center font-medium whitespace-pre-line">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Feature Cards */}
        <div data-tour="feature-cards" className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((card) => (
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
                    className="mt-4 w-full h-10 rounded-pill border-2 border-coppel-blue text-coppel-blue text-sm font-semibold hover:bg-coppel-blue hover:text-white transition-colors"
                  >
                    {card.buttonLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nav arrows */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-card border border-border shadow flex items-center justify-center hover:bg-bg-hover transition-colors">
            <ChevronLeft className="w-5 h-5 text-text-primary" />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-card border border-border shadow flex items-center justify-center hover:bg-bg-hover transition-colors">
            <ChevronRight className="w-5 h-5 text-text-primary" />
          </button>
        </div>
      </div>
    </div>
  )
}
