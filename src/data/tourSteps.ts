import type { TourId } from '../stores/useTourStore'

export interface TourSlide {
  icon: string
  iconBg: string
  title: string
  description: string
  tip?: string
}

export interface TourConfig {
  id: TourId
  name: string
  subtitle: string
  slides: TourSlide[]
}

export const TOUR_COMPRADOR: TourConfig = {
  id: 'comprador',
  name: 'Tour Comprador',
  subtitle: 'Aprende a evaluar propuestas y dar de alta SKU\'s',
  slides: [
    {
      icon: '🏠',
      iconBg: 'bg-coppel-blue',
      title: 'Bienvenida al portal',
      description: 'Como comprador, tu panel principal te muestra accesos rápidos a las funcionalidades más importantes: Propuestas de SKU\'s y Alta de proveedores.',
      tip: 'Haz clic en "Propuestas de SKU\'s" para empezar a revisar productos.',
    },
    {
      icon: '📋',
      iconBg: 'bg-status-pending-buyer',
      title: 'Catálogo de propuestas',
      description: 'Aquí verás todas las propuestas enviadas por los proveedores. Cada tarjeta muestra la imagen del producto, marca, modelo, precio, costo y margen.',
      tip: 'Usa los filtros del lado izquierdo (Categoría, Clase, Familia, Precio, Margen, Marca) para encontrar lo que buscas.',
    },
    {
      icon: '🔍',
      iconBg: 'bg-coppel-blue',
      title: 'Evaluar una propuesta',
      description: 'Al hacer clic en "Solicitar muestra" en cualquier producto, llegas a la pantalla de evaluación donde puedes definir cantidad, especificaciones y rango de entrega.',
      tip: 'No olvides indicar la dirección de entrega y el rango de fechas.',
    },
    {
      icon: '📦',
      iconBg: 'bg-status-preselected',
      title: 'Solicitar muestra',
      description: 'Al dar clic en "Continuar", se envía la solicitud de muestra al proveedor. Él recibirá una notificación y podrá ver los detalles de tu solicitud.',
      tip: 'El proveedor verá tu solicitud en su historial de solicitudes.',
    },
    {
      icon: '📊',
      iconBg: 'bg-coppel-navy',
      title: 'Propuestas en proceso de alta',
      description: 'En esta sección verás una tabla con todos los SKU\'s que están en proceso de alta. Puedes filtrar por categoría (Juguetes, Bebés, Consolas) y ordenar por cualquier columna.',
      tip: 'Haz clic en "+ Nuevo producto" para iniciar un alta desde cero asignando un proveedor.',
    },
    {
      icon: '📝',
      iconBg: 'bg-coppel-blue',
      title: 'Formulario de Alta SKU',
      description: 'El formulario tiene 8 pestañas: Info General, Estrategia Comercial, Color, Atributos, Datos Logísticos, Costos y Precios, Admin Stock y Configuración.',
      tip: 'Cada pestaña muestra un indicador: verde = completa, azul = activa, gris = pendiente.',
    },
    {
      icon: '✅',
      iconBg: 'bg-success',
      title: 'Dar de alta el SKU',
      description: 'Cuando todas las pestañas estén completas (indicador verde), se habilita el botón "Dar de alta". Al confirmar, el SKU se registra en el sistema y el proveedor recibe notificación.',
      tip: 'Revisa cada pestaña antes de dar de alta — esta acción no se puede deshacer.',
    },
    {
      icon: '🔔',
      iconBg: 'bg-error',
      title: 'Notificaciones',
      description: 'La campana en el navbar te muestra notificaciones en tiempo real. Cuando un proveedor envía una propuesta o responde a una solicitud, recibirás una alerta aquí.',
      tip: 'Haz clic en cualquier notificación para ir directamente a la acción relacionada.',
    },
  ],
}

export const TOUR_PROVEEDOR: TourConfig = {
  id: 'proveedor',
  name: 'Tour Proveedor',
  subtitle: 'Aprende a recibir solicitudes y enviar propuestas',
  slides: [
    {
      icon: '🏠',
      iconBg: 'bg-coppel-blue',
      title: 'Panel del proveedor',
      description: 'Tu panel principal te da acceso rápido a: Mi perfil, Catálogos, Mis solicitudes, Documentos y Mis productos. Abajo encontrarás las cards de Solicitudes y Mi cuenta.',
      tip: 'Haz clic en "Mis solicitudes" para ver las solicitudes del comprador.',
    },
    {
      icon: '📬',
      iconBg: 'bg-status-pending-supplier',
      title: 'Historial de solicitudes',
      description: 'Aquí verás todas las solicitudes que te ha enviado el comprador (Juanita Solis). Cada solicitud tiene un código, fecha y estatus.',
      tip: 'Haz clic en cualquier solicitud para ver los detalles y requerimientos del comprador.',
    },
    {
      icon: '📄',
      iconBg: 'bg-coppel-navy',
      title: 'Detalle de solicitud',
      description: 'El comprador te envía especificaciones detalladas, imágenes de referencia y documentos PDF. Desde aquí puedes empezar a cargar tus propuestas.',
      tip: 'Tienes dos opciones: "Carga individual" para un producto o "Carga masiva" para varios.',
    },
    {
      icon: '📝',
      iconBg: 'bg-coppel-blue',
      title: 'Carga individual',
      description: 'Llena el formulario con la información de tu producto: tipo, marca, modelo, imágenes, comentarios y precios. Los campos cambian según el tipo de producto seleccionado.',
      tip: 'Si seleccionas "Muñeca" verás campos de altura y accesorios; si seleccionas "Montable" verás peso y edad.',
    },
    {
      icon: '📊',
      iconBg: 'bg-status-pending-buyer',
      title: 'Carga masiva',
      description: 'Descarga la plantilla Excel, llénala con tus productos y súbela. Verás una tabla con los productos cargados para revisarlos antes de enviar.',
      tip: 'Asegúrate de llenar todos los campos obligatorios en la plantilla.',
    },
    {
      icon: '✅',
      iconBg: 'bg-success',
      title: 'Guardar y enviar',
      description: 'Al guardar tu propuesta, el comprador recibe una notificación automática. Puedes revisar tus propuestas enviadas en la Ficha Técnica de cada producto.',
      tip: 'Desde la Ficha Técnica puedes editar tu propuesta o enviarla a revisión formal.',
    },
  ],
}

export const TOUR_CROSS_ROLE: TourConfig = {
  id: 'crossRole',
  name: 'Flujo Comprador ↔ Proveedor',
  subtitle: 'Cómo se conectan ambos roles en el sistema',
  slides: [
    {
      icon: '🔄',
      iconBg: 'bg-coppel-blue',
      title: 'El flujo completo',
      description: 'El portal conecta a compradores internos de Coppel con proveedores externos. Cada acción de un rol genera una notificación para el otro, creando un flujo de trabajo continuo.',
    },
    {
      icon: '1️⃣',
      iconBg: 'bg-status-preselected',
      title: 'Paso 1: Comprador solicita información',
      description: 'El comprador (Juanita) revisa el catálogo de propuestas, selecciona un producto y solicita muestra al proveedor. Esto genera una notificación para el proveedor.',
      tip: 'Ruta: Home Comprador → Propuestas → Solicitar muestra',
    },
    {
      icon: '2️⃣',
      iconBg: 'bg-status-pending-supplier',
      title: 'Paso 2: Proveedor envía propuestas',
      description: 'El proveedor (Felipe) recibe la solicitud, ve los requerimientos y envía sus propuestas de producto con precios, imágenes y especificaciones. El comprador recibe notificación.',
      tip: 'Ruta: Home Proveedor → Solicitudes → Carga individual/masiva → Guardar',
    },
    {
      icon: '3️⃣',
      iconBg: 'bg-status-pending-buyer',
      title: 'Paso 3: Comprador evalúa y da de alta',
      description: 'El comprador revisa las propuestas, completa el formulario de 8 pestañas con toda la información del SKU y lo da de alta en el sistema. El proveedor recibe confirmación.',
      tip: 'Ruta: Alta SKU\'s → Seleccionar producto → Completar 8 tabs → Dar de alta',
    },
    {
      icon: '🔔',
      iconBg: 'bg-error',
      title: 'Notificaciones cruzadas',
      description: 'Cada acción importante genera una notificación para el otro rol. Puedes probar esto cambiando entre Comprador y Proveedor — verás las notificaciones que el otro generó.',
      tip: 'Haz clic en el avatar del Navbar para regresar al selector de rol y cambiar de vista.',
    },
  ],
}

export const ALL_TOURS: TourConfig[] = [TOUR_COMPRADOR, TOUR_PROVEEDOR, TOUR_CROSS_ROLE]
