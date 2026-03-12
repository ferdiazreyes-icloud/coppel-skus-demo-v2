import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Badge from '../../components/ui/Badge'
import { MOCK_SOLICITUDES } from '../../data/mockProducts'

export default function HistorialSolicitudes() {
  const navigate = useNavigate()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/proveedor' },
          { label: 'Mis solicitudes' },
        ]}
      />

      <div className="px-6 pb-10">
        <h1 className="font-sans text-xl font-bold text-text-primary mb-6">
          Historial de solicitudes
        </h1>

        <div className="space-y-4">
          {MOCK_SOLICITUDES.map((sol) => (
            <div
              key={sol.id}
              onClick={() => navigate(`/proveedor/solicitudes/${sol.id}`)}
              className="bg-bg-card rounded-md border border-border p-5 cursor-pointer hover:border-coppel-blue transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans text-base font-bold text-text-primary">
                    Solicitud {sol.code}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Comprador: Juanita Solis
                  </p>
                  <p className="text-sm text-text-muted mt-0.5">
                    Fecha: {sol.createdAt}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm text-text-muted">Productos:</span>{' '}
                    <span className="font-semibold text-text-primary">{sol.products.length}</span>
                  </div>
                  <Badge status={sol.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
