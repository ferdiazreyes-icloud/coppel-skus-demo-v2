import type { SpotlightStep } from '../components/tour/SpotlightTour'

export interface CrossRoleStep extends SpotlightStep {
  /** Route to navigate to before highlighting */
  route: string
  /** Role to switch to before navigating */
  role?: 'comprador' | 'proveedor'
}

export const CROSS_ROLE_STEPS: CrossRoleStep[] = [
  // ── COMPRADOR FLOW ──
  {
    route: '/comprador',
    role: 'comprador',
    target: 'quick-actions',
    title: '1. Inicio del comprador',
    description:
      'Juanita Solis es la compradora. Desde aquí accede a "Propuestas de SKU\'s" para revisar los productos que los proveedores le envían.',
    position: 'bottom',
  },
  {
    route: '/comprador/propuestas/sup-001',
    target: 'filter-sidebar',
    title: '2. Catálogo de propuestas',
    description:
      'El catálogo muestra todas las propuestas del proveedor. En el sidebar izquierdo puede filtrar por categoría, precio, margen y marca.',
    position: 'right',
  },
  {
    route: '/comprador/propuestas/sup-001',
    target: 'product-list',
    title: '3. Tarjetas de producto',
    description:
      'Cada tarjeta muestra imagen, marca, modelo, precio, costo y margen. Juanita puede seleccionar productos y solicitar muestras.',
    position: 'top',
  },
  {
    route: '/comprador/propuestas/sup-001/prod-001/evaluar',
    target: 'product-summary',
    title: '4. Evaluación de propuesta',
    description:
      'Al hacer clic en "Solicitar muestra", Juanita ve el detalle del producto: datos, cantidad, especificaciones, dirección y fechas de entrega.',
    position: 'bottom',
  },
  {
    route: '/comprador/propuestas/sup-001/prod-001/evaluar',
    target: 'sample-request-btn',
    title: '5. Solicitar muestra',
    description:
      'Al dar clic en "Continuar", se envía la solicitud al proveedor Felipe López. Él recibirá una notificación automática.',
    position: 'top',
  },
  {
    route: '/comprador/alta-skus',
    target: 'category-tabs',
    title: '6. Propuestas en alta',
    description:
      'Aquí Juanita ve los SKU\'s en proceso de alta, organizados por categoría: Juguetes, Bebés, Consolas. Puede agregar nuevos productos.',
    position: 'bottom',
  },
  {
    route: '/comprador/alta-skus',
    target: 'products-table',
    title: '7. Tabla de SKU\'s',
    description:
      'La tabla muestra imagen, artículo, marca, modelo, proveedor, estatus y clase. Al hacer clic en una fila se abre el formulario de alta.',
    position: 'top',
  },
  {
    route: '/comprador/alta-skus/prod-001/informacion-general',
    target: 'product-header',
    title: '8. Formulario de alta SKU',
    description:
      'El encabezado muestra los datos del producto, clasificación y los botones de "Cancelar" y "Dar de alta". Aquí se completa toda la información del SKU.',
    position: 'bottom',
  },
  {
    route: '/comprador/alta-skus/prod-001/informacion-general',
    target: 'sku-tabs',
    title: '9. Las 8 pestañas del SKU',
    description:
      'El formulario tiene 8 tabs: Info General, Estrategia Comercial, Color, Atributos, Datos Logísticos, Costos, Stock y Configuración. Cada indicador muestra el progreso.',
    position: 'bottom',
  },

  // ── PROVEEDOR FLOW ──
  {
    route: '/proveedor',
    role: 'proveedor',
    target: 'quick-actions',
    title: '10. Ahora vemos el lado del proveedor',
    description:
      'Felipe López es el proveedor (Mattel). Desde su panel accede a solicitudes, catálogos, productos y documentos.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes',
    target: 'solicitudes-list',
    title: '11. Historial de solicitudes',
    description:
      'Aquí Felipe ve todas las solicitudes que Juanita le ha enviado. Cada card muestra el código, comprador, fecha, cantidad de productos y estatus.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes/sol-001',
    target: 'buyer-specs',
    title: '12. Detalle de la solicitud',
    description:
      'Felipe puede ver las especificaciones que Juanita escribió: tipo de productos, cantidades, tiempos de entrega y cualquier requisito especial.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes/sol-001',
    target: 'carga-buttons',
    title: '13. Opciones de carga',
    description:
      'Felipe elige cómo enviar sus propuestas: "Carga individual" para un producto a la vez, o "Carga masiva" para subir varios por Excel.',
    position: 'top',
  },
  {
    route: '/proveedor/solicitudes/sol-001/carga-individual',
    target: 'product-type',
    title: '14. Carga individual',
    description:
      'Felipe selecciona el tipo de producto (muñeca, montable, juego). Los campos del formulario cambian dinámicamente según el tipo seleccionado.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes/sol-001/carga-individual',
    target: 'save-buttons',
    title: '15. Guardar propuesta',
    description:
      'Al guardar, la propuesta se envía a Juanita automáticamente. Ella recibirá una notificación para revisar la propuesta del proveedor.',
    position: 'top',
  },
  {
    route: '/proveedor/propuestas/prod-001',
    target: 'ficha-header',
    title: '16. Ficha técnica',
    description:
      'Felipe puede revisar sus propuestas enviadas en la ficha técnica. Desde aquí puede editar la información o enviarla formalmente a revisión del comprador.',
    position: 'bottom',
  },
  {
    route: '/proveedor',
    target: 'greeting',
    title: '¡Tour completado!',
    description:
      'Así funciona el flujo completo: el comprador solicita → el proveedor responde → el comprador evalúa y da de alta el SKU. Las notificaciones conectan ambos roles en tiempo real.',
    position: 'bottom',
  },
]
