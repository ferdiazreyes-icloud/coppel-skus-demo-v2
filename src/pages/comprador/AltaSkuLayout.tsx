import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProductHeader from '../../components/shared/ProductHeader'
import Tabs from '../../components/ui/Tabs'
import { useSkuFormStore } from '../../stores/useSkuFormStore'
import { MOCK_PRODUCTS } from '../../data/mockProducts'
import { SKU_TABS, type SkuTabId } from '../../types/product'

import Tab1InfoGeneral from './tabs/Tab1InfoGeneral'
import Tab2EstrategiaComercial from './tabs/Tab2EstrategiaComercial'
import Tab3Color from './tabs/Tab3Color'
import Tab4Atributos from './tabs/Tab4Atributos'
import Tab5DatosLogisticos from './tabs/Tab5DatosLogisticos'
import Tab6CostosPrecios from './tabs/Tab6CostosPrecios'
import Tab7AdminStock from './tabs/Tab7AdminStock'
import Tab8Configuracion from './tabs/Tab8Configuracion'

const tabComponents: Record<SkuTabId, React.ComponentType> = {
  'informacion-general': Tab1InfoGeneral,
  'estrategia-comercial': Tab2EstrategiaComercial,
  'datos-por-color': Tab3Color,
  atributos: Tab4Atributos,
  'datos-logisticos': Tab5DatosLogisticos,
  'costos-precios': Tab6CostosPrecios,
  'admin-stock': Tab7AdminStock,
  configuracion: Tab8Configuracion,
}

export default function AltaSkuLayout() {
  const { productoId, tab } = useParams()
  const navigate = useNavigate()
  const { completedTabs } = useSkuFormStore()

  const product = MOCK_PRODUCTS.find((p) => p.id === productoId)
  const activeTab = (tab || 'informacion-general') as SkuTabId
  const TabContent = tabComponents[activeTab] || Tab1InfoGeneral

  if (!product) {
    return (
      <div className="px-6 py-10">
        <p className="text-text-secondary">Producto no encontrado.</p>
      </div>
    )
  }

  const allComplete = SKU_TABS.every((t) => completedTabs.has(t.id))

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/comprador' },
          { label: "Propuestas y SKU's", to: '/comprador' },
          { label: 'Propuestas en proceso de alta', to: '/comprador/alta-skus' },
          { label: product.name },
        ]}
      />

      <div className="px-6 pb-10 space-y-5">
        {/* Product header */}
        <ProductHeader
          name={product.name}
          lineCode={product.classCode}
          lineName="Productos Infantiles Selectos"
          proposalId={product.id.replace('prod-', '')}
          category={product.category}
          subCategory={product.subCategory}
          productType={product.productType}
          classCode={product.classCode}
          family={product.family}
          brand={product.brand}
          model={product.model}
          images={[product.imageUrl]}
          canSubmit={allComplete}
          onCancel={() => navigate('/comprador/alta-skus')}
          onSubmit={() => navigate('/comprador/alta-skus')}
        />

        {/* Tab navigation */}
        <Tabs
          tabs={SKU_TABS.map((t) => ({ id: t.id, label: t.label }))}
          activeTab={activeTab}
          onTabChange={(tabId) =>
            navigate(`/comprador/alta-skus/${productoId}/${tabId}`)
          }
          completedTabs={completedTabs as unknown as Set<string>}
        />

        {/* Tab content */}
        <TabContent />
      </div>
    </div>
  )
}
