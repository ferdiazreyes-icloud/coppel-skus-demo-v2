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
    route: '/comprador',
    target: 'notifications',
    title: '2. Notificaciones del comprador',
    description:
      'La campana muestra las notificaciones en tiempo real. Cuando un proveedor envía una propuesta o responde a una solicitud, Juanita recibe una alerta aquí.',
    position: 'bottom',
  },
  {
    route: '/comprador/propuestas/sup-001',
    target: 'listado-header',
    title: '3. Catálogo de propuestas',
    description:
      'Juanita entra al catálogo de propuestas del proveedor Mattel. Aquí puede filtrar por categoría, precio, margen y marca en el sidebar izquierdo.',
    position: 'bottom',
  },
  {
    route: '/comprador/propuestas/sup-001',
    target: 'first-product',
    title: '4. Tarjetas de producto',
    description:
      'Cada tarjeta muestra la imagen, marca, modelo, precio, costo y margen del producto. Juanita puede seleccionar productos y hacer clic en "Ficha técnica" para solicitar muestras.',
    position: 'bottom',
  },
  {
    route: '/comprador/propuestas/sup-001/prod-001/evaluar',
    target: 'product-summary',
    title: '5. Evaluación de propuesta',
    description:
      'Al hacer clic en "Solicitar muestra", Juanita ve el detalle del producto con datos, cantidad, especificaciones, dirección y fechas de entrega.',
    position: 'bottom',
  },
  {
    route: '/comprador/propuestas/sup-001/prod-001/evaluar',
    target: 'sample-request-btn',
    title: '6. Solicitar muestra',
    description:
      'Al dar clic en "Continuar", se envía la solicitud al proveedor Felipe López. Él recibirá una notificación automática en su panel.',
    position: 'top',
  },
  {
    route: '/comprador/alta-skus',
    target: 'alta-header',
    title: '7. Propuestas en alta',
    description:
      'En esta sección Juanita ve los SKU\'s en proceso de alta. Puede filtrar por categoría (Juguetes, Bebés, Consolas) y agregar nuevos productos con "+ Nuevo producto".',
    position: 'bottom',
  },
  {
    route: '/comprador/alta-skus',
    target: 'category-tabs',
    title: '8. Categorías y tabla',
    description:
      'Las pestañas organizan los productos. La tabla muestra imagen, artículo, marca, modelo, proveedor, estatus y clase. Al hacer clic en una fila se abre el formulario de alta.',
    position: 'bottom',
  },
  {
    route: '/comprador/alta-skus/prod-001/informacion-general',
    target: 'product-header',
    title: '9. Formulario de alta SKU',
    description:
      'El encabezado muestra los datos del producto y los botones "Cancelar" y "Dar de alta". Aquí Juanita completa toda la información del SKU.',
    position: 'bottom',
  },
  {
    route: '/comprador/alta-skus/prod-001/informacion-general',
    target: 'sku-tabs',
    title: '10. Las 8 pestañas del SKU',
    description:
      'El formulario tiene 8 tabs: Info General, Estrategia Comercial, Color, Atributos, Datos Logísticos, Costos, Stock y Configuración. Los indicadores muestran el progreso.',
    position: 'bottom',
  },

  // ── PROVEEDOR FLOW ──
  {
    route: '/proveedor',
    role: 'proveedor',
    target: 'quick-actions',
    title: '11. Ahora el lado del proveedor',
    description:
      'Felipe López es el proveedor (Mattel). Desde su panel accede a solicitudes, catálogos, productos y documentos.',
    position: 'bottom',
  },
  {
    route: '/proveedor',
    target: 'notifications',
    title: '12. Notificaciones del proveedor',
    description:
      'Felipe recibe aquí las notificaciones de Juanita: solicitudes de muestra, requerimientos de información y confirmaciones de alta de SKU.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes',
    target: 'solicitudes-list',
    title: '13. Historial de solicitudes',
    description:
      'Aquí Felipe ve todas las solicitudes que Juanita le ha enviado. Cada card muestra el código, comprador, fecha, productos y estatus.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes/sol-001',
    target: 'buyer-specs',
    title: '14. Detalle de la solicitud',
    description:
      'Felipe puede ver las especificaciones que Juanita escribió: tipo de productos, cantidades, tiempos de entrega y requisitos especiales.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes/sol-001',
    target: 'carga-buttons',
    title: '15. Opciones de carga',
    description:
      'Felipe elige cómo enviar sus propuestas: "Carga individual" para un producto a la vez, o "Carga masiva" para subir varios con una plantilla Excel.',
    position: 'top',
  },
  {
    route: '/proveedor/solicitudes/sol-001/carga-individual',
    target: 'product-type',
    title: '16. Carga individual',
    description:
      'Felipe selecciona el tipo de producto (muñeca, montable, juego). Los campos del formulario cambian dinámicamente según el tipo seleccionado.',
    position: 'bottom',
  },
  {
    route: '/proveedor/solicitudes/sol-001/carga-individual',
    target: 'save-buttons',
    title: '17. Guardar propuesta',
    description:
      'Al guardar, la propuesta se envía a Juanita automáticamente. Ella recibirá una notificación para revisarla.',
    position: 'top',
  },
  {
    route: '/proveedor/propuestas/prod-001',
    target: 'ficha-header',
    title: '18. Ficha técnica',
    description:
      'Felipe puede revisar sus propuestas en la ficha técnica. Desde aquí puede editar la información o enviarla formalmente a revisión del comprador.',
    position: 'bottom',
  },
  {
    route: '/proveedor',
    target: 'greeting',
    title: '¡Tour completado!',
    description:
      'Así funciona el flujo: el comprador solicita → el proveedor responde → el comprador evalúa y da de alta el SKU. Las notificaciones conectan ambos roles en tiempo real.',
    position: 'bottom',
  },
]
