import type { SpotlightStep } from '../components/tour/SpotlightTour'

export const COMPRADOR_HOME_STEPS: SpotlightStep[] = [
  {
    target: 'greeting',
    title: 'Tu panel de comprador',
    description: 'Este es tu espacio de trabajo. Desde aquí puedes acceder a todas las funcionalidades para gestionar propuestas de proveedores y dar de alta SKU\'s.',
    position: 'bottom',
  },
  {
    target: 'banner',
    title: 'Banner informativo',
    description: 'Aquí encontrarás información relevante sobre el portal y novedades del sistema de gestión de categorías.',
    position: 'bottom',
  },
  {
    target: 'quick-actions',
    title: 'Accesos rápidos',
    description: '"Propuestas de SKU\'s" te lleva al catálogo de productos enviados por proveedores. "Alta de proveedores" te permite gestionar el alta de nuevos SKU\'s.',
    position: 'bottom',
  },
  {
    target: 'feature-cards',
    title: 'Funcionalidades principales',
    description: 'Genera invitaciones QR para proveedores, gestiona prospectos, y revisa todas las propuestas y SKU\'s en proceso. Haz clic en cualquier card para comenzar.',
    position: 'top',
  },
  {
    target: 'notifications',
    title: 'Notificaciones en tiempo real',
    description: 'Cuando un proveedor envíe una propuesta o responda a una solicitud, recibirás una notificación aquí. El número rojo indica cuántas tienes sin leer.',
    position: 'bottom',
  },
  {
    target: 'user-avatar',
    title: 'Tu perfil',
    description: 'Haz clic aquí para cerrar sesión y cambiar de rol. Puedes alternar entre Comprador y Proveedor para ver cómo interactúan ambas vistas.',
    position: 'bottom',
  },
]

export const PROVEEDOR_HOME_STEPS: SpotlightStep[] = [
  {
    target: 'greeting',
    title: 'Tu panel de proveedor',
    description: 'Bienvenido a tu espacio de trabajo. Desde aquí gestionas solicitudes del comprador, envías propuestas de producto y das seguimiento a tus SKU\'s.',
    position: 'bottom',
  },
  {
    target: 'banner',
    title: 'Beneficios del portal',
    description: 'El banner te muestra información sobre los beneficios de ser proveedor Coppel y las novedades del sistema.',
    position: 'bottom',
  },
  {
    target: 'quick-actions',
    title: 'Accesos rápidos',
    description: 'Accede rápido a Mi perfil, Catálogos, Mis solicitudes, Documentos y Mis productos. "Mis solicitudes" es donde verás lo que el comprador te ha pedido.',
    position: 'bottom',
  },
  {
    target: 'solicitudes',
    title: 'Solicitudes del comprador',
    description: '"Nueva solicitud" te permite enviar propuestas. "Historial de solicitudes" muestra todas las solicitudes que has recibido con su estatus actual.',
    position: 'top',
  },
  {
    target: 'mi-cuenta',
    title: 'Tu cuenta',
    description: 'Administra tu perfil, direcciones, información de empresa, redes sociales, documentos y catálogo de productos desde estas cards.',
    position: 'top',
  },
  {
    target: 'notifications',
    title: 'Notificaciones',
    description: 'Cuando el comprador solicite muestras o dé de alta un SKU, recibirás una notificación aquí. Haz clic para ver los detalles.',
    position: 'bottom',
  },
]
