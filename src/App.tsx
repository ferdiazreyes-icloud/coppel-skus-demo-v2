import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import RoleSelector from './pages/RoleSelector'
import HomeComprador from './pages/comprador/HomeComprador'
import ListadoPropuestas from './pages/comprador/ListadoPropuestas'
import EvaluacionPropuesta from './pages/comprador/EvaluacionPropuesta'
import PropuestasEnAlta from './pages/comprador/PropuestasEnAlta'
import AltaSkuLayout from './pages/comprador/AltaSkuLayout'
import HomeProveedor from './pages/proveedor/HomeProveedor'
import HistorialSolicitudes from './pages/proveedor/HistorialSolicitudes'
import SolicitudDetalle from './pages/proveedor/SolicitudDetalle'
import CargaIndividual from './pages/proveedor/CargaIndividual'
import CargaMasiva from './pages/proveedor/CargaMasiva'
import FichaTecnica from './pages/proveedor/FichaTecnica'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Role Selection */}
        <Route path="/" element={<RoleSelector />} />

        {/* Comprador Routes */}
        <Route element={<PageLayout />}>
          <Route path="/comprador" element={<HomeComprador />} />
          <Route path="/comprador/propuestas/:proveedorId" element={<ListadoPropuestas />} />
          <Route path="/comprador/propuestas/:proveedorId/:productoId/evaluar" element={<EvaluacionPropuesta />} />
          <Route path="/comprador/alta-skus" element={<PropuestasEnAlta />} />
          <Route path="/comprador/alta-skus/:productoId/:tab" element={<AltaSkuLayout />} />
        </Route>

        {/* Proveedor Routes */}
        <Route element={<PageLayout />}>
          <Route path="/proveedor" element={<HomeProveedor />} />
          <Route path="/proveedor/solicitudes" element={<HistorialSolicitudes />} />
          <Route path="/proveedor/solicitudes/:solicitudId" element={<SolicitudDetalle />} />
          <Route path="/proveedor/solicitudes/:solicitudId/carga-individual" element={<CargaIndividual />} />
          <Route path="/proveedor/solicitudes/:solicitudId/carga-masiva" element={<CargaMasiva />} />
          <Route path="/proveedor/propuestas/:propuestaId" element={<FichaTecnica />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
