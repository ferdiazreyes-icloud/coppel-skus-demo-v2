import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import RoleSelector from './pages/RoleSelector'
import HomeComprador from './pages/comprador/HomeComprador'
import HomeProveedor from './pages/proveedor/HomeProveedor'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Role Selection */}
        <Route path="/" element={<RoleSelector />} />

        {/* Comprador Routes */}
        <Route element={<PageLayout />}>
          <Route path="/comprador" element={<HomeComprador />} />
          {/* Sprint 3 */}
          {/* <Route path="/comprador/propuestas/:proveedorId" element={<ListadoPropuestas />} /> */}
          {/* <Route path="/comprador/propuestas/:proveedorId/:productoId/evaluar" element={<EvaluacionPropuesta />} /> */}
          {/* Sprint 4 */}
          {/* <Route path="/comprador/alta-skus" element={<PropuestasEnAlta />} /> */}
          {/* <Route path="/comprador/alta-skus/:productoId/:tab" element={<AltaSkuLayout />} /> */}
        </Route>

        {/* Proveedor Routes */}
        <Route element={<PageLayout />}>
          <Route path="/proveedor" element={<HomeProveedor />} />
          {/* Sprint 5 */}
          {/* <Route path="/proveedor/solicitudes" element={<HistorialSolicitudes />} /> */}
          {/* <Route path="/proveedor/solicitudes/:solicitudId" element={<SolicitudDetalle />} /> */}
          {/* <Route path="/proveedor/solicitudes/:solicitudId/carga-individual" element={<CargaIndividual />} /> */}
          {/* <Route path="/proveedor/solicitudes/:solicitudId/carga-masiva" element={<CargaMasiva />} /> */}
          {/* <Route path="/proveedor/propuestas" element={<VistaRapidaPropuestas />} /> */}
          {/* <Route path="/proveedor/propuestas/:propuestaId" element={<FichaTecnica />} /> */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
