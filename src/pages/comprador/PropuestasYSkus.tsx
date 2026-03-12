import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'

const cards = [
  {
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Bandeja de solicitudes',
    description: 'Consulta el registro de prospectos y solicitudes recibidas',
    buttonLabel: 'Evaluar registros',
    to: '#',
  },
  {
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Catálogo de propuestas',
    description: 'Enviadas por los proveedores para evaluación',
    buttonLabel: 'Explorar propuestas',
    to: '/comprador/propuestas/sup-001',
  },

  {
    image: 'https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Propuestas en proceso de alta',
    description: 'Visualiza y gestiona las propuestas que están en proceso de alta de SKU',
    buttonLabel: 'Revisar SKU\'s',
    to: '/comprador/alta-skus',
    hasArrow: true,
  },
  {
    image: 'https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'SKU\'s',
    description: 'Visualiza y gestiona los SKUs dados de alta en el sistema',
    buttonLabel: 'Revisar SKU\'s',
    to: '/comprador/skus',
    hasArrow: true,
  },
]

export default function PropuestasYSkus() {
  const navigate = useNavigate()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/comprador' },
          { label: "Propuestas y SKU's" },
        ]}
      />

      <div className="px-6 pb-10">
        <h1 className="font-sans text-xl font-semibold text-text-primary mb-6">
          Propuestas y SKU's
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-bg-card rounded-lg overflow-hidden border border-border shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-sans text-base font-bold text-text-primary">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary mt-1 mb-4">
                  {card.description}
                </p>
                <button
                  onClick={() => navigate(card.to)}
                  className="w-full h-10 rounded-pill bg-coppel-navy text-white text-sm font-semibold hover:bg-coppel-blue transition-colors flex items-center justify-center gap-1"
                >
                  {card.buttonLabel}
                  {card.hasArrow && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
