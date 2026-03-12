# Plan de Desarrollo — SGC Coppel SKU's Demo v2

> Objetivo: Demo funcional con pantallas **pixel-perfect** respecto al Figma y **flujos de trabajo completos** entre Comprador y Proveedor.
> Repo: https://github.com/ferdiazreyes-icloud/coppel-skus-demo-v2
> Referencia de diseño: `FIGMA_REFERENCE.md` (copiar del repo v1)
> Figma: https://www.figma.com/design/gYTM6PwHzQPGycic3kdIE6/SKU-s_SGC

---

## Lecciones del v1 (qué NO repetir)

| Problema en v1 | Solución en v2 |
|----------------|---------------|
| Estilos inline (`style={{}}`) — imposible ser pixel-perfect | **Tailwind CSS** con configuración custom de tokens Coppel |
| Solo tenía los forms de tabs, faltaban ~15 pantallas | Construir **todas** las pantallas del Figma |
| Sin flujos de trabajo (cada pantalla era independiente) | **Flujos completos** con estado compartido y navegación lógica |
| Sin estado global (cada tab perdía datos al cambiar) | **Zustand** para estado global del formulario |
| Sin datos mock realistas | Mock data completo que simule el flujo real |
| Home genérico que no existía en Figma | Homes separados: Comprador y Proveedor, fieles al Figma |
| Sin login/role switching | Pantalla de selección de rol para navegar entre vistas |

---

## Tech Stack v2

| Tecnología | Razón |
|-----------|-------|
| **React 19** + **Vite** | Mismo stack, funciona bien |
| **Tailwind CSS v4** | Pixel-perfect sin reinventar estilos. Clases utilitarias para matching exacto de spacing, colors, fonts |
| **React Router v7** | Routing con layouts anidados y loaders |
| **Zustand** | Estado global ligero para formularios multi-step y flujos |
| **Lucide React** | Iconos consistentes (campana, globo, usuario, etc.) |
| **React Hook Form** | Formularios con validación visual |
| **TypeScript** | Autocompletado y type safety para los forms complejos |

---

## Configuración de Design Tokens (Tailwind)

Extraídos directamente del Figma para pixel-perfect:

```
Colors:
  coppel-blue:     #1A3C9E    (navbar, botones primarios)
  coppel-navy:     #081754    (textos principales, footer)
  coppel-yellow:   #F5C518    (puntos del logo, acentos)
  coppel-bg:       #F3F3F3    (fondo de página)
  coppel-card:     #FFFFFF    (cards)
  coppel-border:   #E4E6EB    (bordes)
  status-pending-buyer:  #F5A623  (naranja)
  status-pending-supplier: #0ABF4F (verde)
  status-in-progress: #E8341C (rojo)
  status-preselected: #1A3C9E (azul)
  status-ready:    #F5C518    (amarillo)

Fonts:
  primary: 'Poppins', sans-serif
  secondary: 'Source Sans Pro', sans-serif

Spacing (basado en el Figma, todo en múltiplos de 4/8):
  navbar-height: 112px
  content-max-width: 1440px
  content-padding: 24px
  card-padding: 24px
  section-gap: 24px
  input-height: 40px
  button-height: 48px

Border Radius:
  sm: 4px
  md: 8px
  lg: 16px
  pill: 999px
```

---

## Estructura de Carpetas

```
src/
├── app/
│   ├── routes.tsx                    # Definición de todas las rutas
│   └── App.tsx                       # Provider wrapper (Zustand + Router)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Navbar Coppel (logo, búsqueda, idioma, notif, avatar)
│   │   ├── Footer.tsx                # Footer con 5 columnas
│   │   ├── Breadcrumb.tsx            # Breadcrumb clickeable
│   │   ├── PageLayout.tsx            # Wrapper: Navbar + Breadcrumb + Content + Footer
│   │   └── SideMenu.tsx              # Menú hamburguesa
│   │
│   ├── ui/
│   │   ├── Button.tsx                # Variantes: primary, outline, ghost, danger
│   │   ├── Input.tsx                 # Con label, placeholder, error, suffix
│   │   ├── Select.tsx                # Dropdown con chevron
│   │   ├── Checkbox.tsx
│   │   ├── RadioGroup.tsx
│   │   ├── Toggle.tsx
│   │   ├── DatePicker.tsx            # Input con icono de calendario
│   │   ├── DateRangePicker.tsx       # Fecha inicio — Fecha final
│   │   ├── NumberInput.tsx           # Con botones +/- (cantidad)
│   │   ├── Textarea.tsx              # Con contador de caracteres
│   │   ├── FileUpload.tsx            # Drag & drop zone
│   │   ├── Tabs.tsx                  # Navegación horizontal con indicadores ●
│   │   ├── Modal.tsx                 # Overlay con card
│   │   ├── Badge.tsx                 # Status chips con colores
│   │   ├── Table.tsx                 # Con sorting, checkboxes, paginación
│   │   ├── Pagination.tsx            # « < 1 2 3 ... 10 > »
│   │   ├── Avatar.tsx                # Circular con iniciales
│   │   ├── ImageCarousel.tsx         # Con dots y flechas
│   │   ├── ActionCard.tsx            # Card con imagen, título, desc, CTA
│   │   ├── ProductCard.tsx           # Card de producto en listado
│   │   └── Accordion.tsx             # Sección expandible/colapsable
│   │
│   └── shared/
│       ├── ProductHeader.tsx         # Header fijo del producto (imagen, clasificación, botones)
│       ├── FormSection.tsx           # Acordeón con título + info toggle + guardar
│       ├── FilterSidebar.tsx         # Sidebar de filtros (precio, marca, color, etc.)
│       └── StatusBadge.tsx           # Badge específico de estatus del sistema
│
├── pages/
│   ├── RoleSelector.tsx              # Pantalla inicial: "Entrar como Comprador" / "Entrar como Proveedor"
│   │
│   ├── comprador/                    # === VISTA COMPRADOR ===
│   │   ├── HomeComprador.tsx         # Dashboard con carousel, accesos rápidos, cards funcionalidades
│   │   ├── ListadoPropuestas.tsx     # Sidebar filtros + grid/lista de productos + badges de estatus
│   │   ├── EvaluacionPropuesta.tsx   # Detalle producto + solicitar muestra
│   │   ├── PropuestasEnAlta.tsx      # Tabla de SKUs en proceso con estatus
│   │   ├── AsignarProveedor.tsx      # Modal para asignar proveedor a SKU
│   │   └── alta-sku/                 # Formulario 8 tabs
│   │       ├── AltaSkuLayout.tsx     # Layout con ProductHeader + Tab navigation
│   │       ├── Tab1InfoGeneral.tsx
│   │       ├── Tab2EstrategiaComercial.tsx
│   │       ├── Tab3Color.tsx
│   │       ├── Tab4Atributos.tsx
│   │       ├── Tab5DatosLogisticos.tsx
│   │       ├── Tab6CostosPrecios.tsx
│   │       ├── Tab7AdminStock.tsx
│   │       └── Tab8Configuracion.tsx
│   │
│   └── proveedor/                    # === VISTA PROVEEDOR ===
│       ├── HomeProveedor.tsx         # Dashboard con solicitudes, mi cuenta
│       ├── SolicitudDetalle.tsx      # Detalle de solicitud del comprador (specs + archivos)
│       ├── CargaIndividual.tsx       # Formulario de propuesta individual
│       ├── CargaMasiva.tsx           # Upload Excel + tabla de productos
│       ├── HistorialSolicitudes.tsx  # Lista de solicitudes con estatus
│       ├── VistaRapidaPropuestas.tsx # Tabla resumen de propuestas enviadas
│       ├── FichaTecnica.tsx          # Ficha técnica detallada (view/edit)
│       └── complemento-sku/         # Formulario complemento (importación)
│           ├── ComplementoLayout.tsx
│           ├── Tab1InfoGeneral.tsx
│           ├── Tab2Color.tsx
│           ├── Tab3Atributos.tsx
│           ├── Tab4DatosLogisticos.tsx
│           └── Tab5CostosPrecios.tsx
│
├── stores/
│   ├── useAuthStore.ts              # Rol actual (comprador/proveedor), usuario mock
│   ├── useSkuFormStore.ts           # Estado del formulario multi-step de alta SKU
│   ├── useProposalStore.ts          # Propuestas y sus estatus
│   └── useNotificationStore.ts     # Notificaciones entre roles
│
├── data/
│   ├── mockProducts.ts              # Productos de ejemplo (Mattel, Prinsel, etc.)
│   ├── mockProveedores.ts           # Proveedores con datos completos
│   ├── mockSolicitudes.ts           # Solicitudes con estatus
│   ├── mockCatalog.ts               # Categorías, clases, familias, marcas
│   └── mockUsers.ts                 # Usuarios mock (Juanita Solis, Felipe López)
│
├── hooks/
│   ├── useFormPersist.ts            # Persiste formulario en Zustand al cambiar tabs
│   └── useWorkflow.ts              # Lógica de transición de estatus
│
├── types/
│   ├── product.ts                   # Tipos para SKU, propuesta, etc.
│   ├── user.ts                      # Tipos para comprador, proveedor
│   └── workflow.ts                  # Tipos para estatus y transiciones
│
└── utils/
    ├── formatCurrency.ts            # Formato $1,039.00
    ├── statusColors.ts              # Mapeo estatus → color
    └── validators.ts                # Validaciones de campos
```

---

## Rutas

```
/                                     → RoleSelector (elegir Comprador o Proveedor)

# === COMPRADOR ===
/comprador                            → HomeComprador
/comprador/propuestas/:proveedorId    → ListadoPropuestas (sidebar + productos)
/comprador/propuestas/:proveedorId/:productoId/evaluar → EvaluacionPropuesta
/comprador/alta-skus                  → PropuestasEnAlta (tabla)
/comprador/alta-skus/:productoId/:tab → AltaSkuLayout (formulario 8 tabs)

# === PROVEEDOR ===
/proveedor                            → HomeProveedor
/proveedor/solicitudes                → HistorialSolicitudes
/proveedor/solicitudes/:solicitudId   → SolicitudDetalle
/proveedor/solicitudes/:solicitudId/carga-individual → CargaIndividual
/proveedor/solicitudes/:solicitudId/carga-masiva → CargaMasiva
/proveedor/propuestas                 → VistaRapidaPropuestas
/proveedor/propuestas/:propuestaId    → FichaTecnica
/proveedor/complemento/:skuId/:tab    → ComplementoLayout (5 tabs)
```

---

## Sprints de Desarrollo

### Sprint 0: Setup del Proyecto (1 sesión)
**Objetivo:** Repo listo para desarrollar con todos los tokens configurados.

- [ ] Inicializar proyecto con Vite + React + TypeScript
- [x] Instalar y configurar Tailwind CSS v4 con tokens Coppel
- [x] Instalar dependencias: React Router, Zustand, Lucide React, React Hook Form
- [x] Copiar `FIGMA_REFERENCE.md` al repo
- [x] Crear estructura de carpetas vacía
- [x] Configurar ESLint + Prettier
- [x] Configurar deploy en Railway
- [x] Commit inicial

**Entregable:** `npm run dev` funciona con página en blanco.

---

### Sprint 1: Layout Global + Componentes Base (1-2 sesiones)
**Objetivo:** Todos los componentes compartidos, pixel-perfect.

**Prioridad 1 — Layout (comparar constantemente con Figma):**
- [x] `Navbar.tsx` — Logo Coppel (3 puntos amarillos + texto), búsqueda, idioma, notificaciones, avatar. Altura exacta: 112px
- [x] `Footer.tsx` — Fondo azul oscuro, 5 columnas, términos y condiciones, botón "Ir al inicio"
- [x] `Breadcrumb.tsx` — Con icono 🏠, separadores ">", links azules
- [x] `PageLayout.tsx` — Navbar + Breadcrumb + content (max-width 1440px, padding 24px) + Footer

**Prioridad 2 — Componentes UI:**
- [x] `Button.tsx` — height 48px, border-radius pill, variantes primary/outline/ghost
- [x] `Input.tsx` — height 40px, label encima, borde gris, focus azul, asterisco rojo para required
- [x] `Select.tsx` — Mismo estilo que Input con chevron
- [x] `Checkbox.tsx`, `RadioGroup.tsx`, `Toggle.tsx`
- [x] `Badge.tsx` / `StatusBadge.tsx` — Con colores exactos por estatus
- [x] `Table.tsx` + `Pagination.tsx` — Headers azul oscuro, sorting icons, checkboxes
- [x] `Modal.tsx` — Overlay semi-transparente, card centrada, X para cerrar
- [x] `Tabs.tsx` — Horizontal con indicadores ● verde/gris, tab activo con underline
- [x] `ActionCard.tsx` — Imagen arriba, título bold, descripción, botón outline
- [x] `ProductCard.tsx` — Thumbnail izquierda, datos en tabla horizontal, badge estatus
- [x] `FileUpload.tsx` — Drag & drop con icono, texto "Arrastra y suelta" y "Selecciona tus archivos"
- [x] `DatePicker.tsx`, `NumberInput.tsx`, `Textarea.tsx`
- [x] `ImageCarousel.tsx` — Con dots y flechas
- [x] `Accordion.tsx` / `FormSection.tsx` — Expandible con título, toggle info, botón guardar

**Entregable:** Storybook mental — cada componente renderiza igual que en Figma.

---

### Sprint 2: Homes + Selector de Rol (1 sesión)
**Objetivo:** Las pantallas de entrada del portal.

- [x] `RoleSelector.tsx` — Pantalla simple: "Entrar como Comprador" / "Entrar como Proveedor"
- [x] `useAuthStore.ts` — Store con rol y usuario actual
- [x] `HomeComprador.tsx`:
  - Saludo "Bienvenida, Juanita Solis"
  - Carousel de imágenes Coppel (placeholder images)
  - Accesos rápidos: Propuestas de SKU's, Alta de proveedores
  - Cards: Generar Invitación, Alta prospectos, Propuestas y SKU's
- [x] `HomeProveedor.tsx`:
  - Saludo "Bienvenido, [Proveedor]"
  - Carousel "Descubre los beneficios..."
  - Accesos rápidos: Mi perfil, Catálogos, Mis solicitudes, Documentos
  - Solicitudes: Nueva solicitud, Historial
  - Mi cuenta: grid 3x2 de cards

**Entregable:** Navegación funcional entre selector → home comprador/proveedor.

---

### Sprint 3: Flujo Comprador — Listado y Evaluación (1-2 sesiones)
**Objetivo:** El comprador puede ver, filtrar y evaluar propuestas.

- [x] `mockProducts.ts` — 10+ productos con datos realistas (Mattel, muñecas, precios reales)
- [ ] `mockProveedores.ts` — 3+ proveedores (pendiente, se usan datos inline)
- [x] `ListadoPropuestas.tsx`:
  - Layout 2 columnas (sidebar 333px + contenido)
  - Sidebar: 3 dropdowns (Categoría, Clase, Familia) + Descargar plantilla + Drag&drop + Filtrar por (Precio, Margen, Marca con checkboxes, Color)
  - Header: nombre proveedor + solicitud ID + ordenar por + toggle vista/lista
  - Cards de producto con: checkbox, thumbnail, nombre, marca, tipo proveedor, modelo, precio, costo, margen, badge estatus, ficha técnica link, toggle carga masiva
  - Paginación
- [x] `EvaluacionPropuesta.tsx`:
  - Card producto (imagen + datos + cantidad +/-)
  - Especificaciones (textarea)
  - Dirección de entrega (botón con icono ubicación)
  - Rango de entrega (date range picker)
  - 3 checkboxes (planeación, info para alta, quién recibe)
  - Botón Continuar
- [ ] `useProposalStore.ts` — Estado de propuestas y pre-selecciones (pendiente)

**Entregable:** Comprador navega: Home → Listado → Evaluación con datos realistas.

---

### Sprint 4: Flujo Comprador — Alta de SKU (2-3 sesiones)
**Objetivo:** El formulario completo de 8 tabs, pixel-perfect.

- [x] `PropuestasEnAlta.tsx`:
  - Tabs de categoría (Juguetes, Bebés, Consolas)
  - Botón "Nuevo producto +"
  - Tabla: Imagen, Artículo, Marca, Modelo, Proveedor, Estatus, Clase
  - Click en fila → abre formulario
- [x] `AsignarProveedor.tsx` (Modal integrado en PropuestasEnAlta):
  - Dropdown proveedor + Dropdown categoría
  - Link "Ir al alta del proveedor"
  - Botones Regresar/Continuar
- [x] `AltaSkuLayout.tsx`:
  - ProductHeader (imagen carousel, clasificación, ID Propuesta, botones Cancelar/Dar de alta)
  - Tab navigation con indicadores de progreso
- [x] `Tab1InfoGeneral.tsx` — Datos del producto, modelo, origen, SAT, tiempo armado, medidas, artículos incluidos
- [x] `Tab2EstrategiaComercial.tsx` — Condiciones compra, preventa, garantías, liquidación con tabla de 12 meses
- [x] `Tab3Color.tsx` — Datos por color (acordeones), GTIN, pronóstico venta, imágenes por color
- [x] `Tab4Atributos.tsx` — Tabla 2 columnas (proveedor vs comprador), descripción de etiqueta con drag&drop
- [x] `Tab5DatosLogisticos.tsx` — Config logística, tabla CEDIS, medidas empaque, empaques, pallet, acomodo
- [x] `Tab6CostosPrecios.tsx` — Costos, impuestos, factor utilidad, precio venta, sobreprecio, comisiones, gastos
- [x] `Tab7AdminStock.tsx` — Tabla stock por tamaño tienda (Coppel, Canadá, etc.), porcentajes distribución por bodega
- [x] `Tab8Configuracion.tsx` — Pronósticos, modelo-color, entrega y etiquetado
- [x] `useSkuFormStore.ts` — Persiste datos entre tabs, marca tabs como completados

**Entregable:** Formulario completo navegable, datos persisten entre tabs, botón "Dar de alta" se habilita al completar todo.

---

### Sprint 5: Flujo Proveedor — Solicitudes y Carga (1-2 sesiones)
**Objetivo:** El proveedor recibe solicitudes y envía propuestas.

- [x] `mockSolicitudes.ts` — 3+ solicitudes con specs del comprador
- [x] `HistorialSolicitudes.tsx`:
  - Lista de solicitudes con estatus
  - Link a detalle
- [x] `SolicitudDetalle.tsx`:
  - Especificaciones del comprador (textarea readonly)
  - Galería de imágenes de referencia
  - Archivos adjuntos (links a PDF)
  - Botones: Carga individual / Carga masiva
- [x] `CargaIndividual.tsx`:
  - Dropdown tipo de producto
  - Formulario: Información general (artículo, tipo, país, marca, modelo, URL video, imágenes, comentarios, campos dinámicos por tipo)
  - Formulario: Información comercial (costo, mínimo compra, tiempo entrega, precios, IVA)
  - Botones: Eliminar propuesta / Guardar
- [x] `CargaMasiva.tsx`:
  - Dropdown tipo producto + botón Descargar plantilla
  - Drag & drop zone para archivo
  - Tabla de productos cargados con paginación
  - Botón Finalizar
- ~~`VistaRapidaPropuestas.tsx`~~ — Removido (no estaba en Figma)
- [x] `FichaTecnica.tsx`:
  - Vista readonly/editable de la propuesta

**Entregable:** Proveedor navega: Home → Solicitud → Carga → Vista rápida → Ficha técnica.

---

### Sprint 6: Flujo Completo + Notificaciones (1 sesión)
**Objetivo:** Conectar ambas vistas con un flujo realista.

- [x] `useNotificationStore.ts` — Notificaciones cruzadas entre roles con seed data
- [x] Indicador de notificaciones en Navbar (badge rojo con conteo)
- [x] Panel de notificaciones (dropdown con read/unread, timestamps, click-to-navigate)
- [x] `ConfirmModal.tsx` — Modal con variantes confirm/success
- [x] Modal de confirmación en: Enviar a revisión, Solicitar muestra, Dar de alta SKU, Guardar propuesta
- [x] Modal de éxito después de acciones completadas
- [x] Notificaciones cruzadas entre roles al ejecutar acciones

**Entregable:** Demo completo donde puedes hacer el flujo entero cambiando entre roles.

---

### Sprint 7: Polish + Deploy (1 sesión)
**Objetivo:** Pulir detalles visuales y deployar.

- [x] Revisión pixel-perfect de cada pantalla contra Figma
- [x] Responsive check (1440px es el target principal)
- [x] Estados empty (Table, listas)
- [x] Hover states en todos los elementos interactivos (buttons, cards, table rows, tabs)
- [x] Focus states para accesibilidad (focus-visible outline)
- [x] Transiciones suaves (modals animate-in, card hover shadows)
- [x] Logo Coppel corregido (círculos grande→mediano→chico)
- [x] Deploy en Railway
- [x] Actualizar README.md y PLAN.md

**Entregable:** Demo en producción, listo para presentar.

---

## Checklist Pixel-Perfect (usar en cada Sprint)

Para cada pantalla, verificar contra el Figma:

- [ ] Altura del navbar = 112px exacto
- [ ] Logo Coppel con 3 puntos amarillos + texto "Coppel" en blanco
- [ ] Font Poppins en títulos, Source Sans Pro en cuerpo
- [ ] Espaciados en múltiplos de 4px (4, 8, 12, 16, 24, 32)
- [ ] Cards con fondo blanco, border-radius 8px, sombra sutil
- [ ] Botones primarios: fondo azul #1A3C9E, texto blanco, border-radius pill
- [ ] Botones outline: borde azul, fondo transparente
- [ ] Inputs: altura 40px, borde #BDBDBD, border-radius 4px
- [ ] Labels: 14px medium, asterisco rojo para required
- [ ] Breadcrumbs: texto azul clickeable, ">" como separador
- [ ] Footer: fondo #081754, texto blanco, 5 columnas
- [ ] Badges de estatus: colores exactos según tabla en FIGMA_REFERENCE.md
- [ ] Tablas: header fondo azul oscuro, texto blanco, filas alternadas
- [ ] Paginación: números en círculos, activo en azul

---

## Orden de Implementación Recomendado

```
Sprint 0 → Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 → Sprint 6 → Sprint 7 → Sprint 8 → Sprint 9
  Setup     Layout     Homes     Listado    Alta SKU   Proveedor   Flujo      Polish     Tours      Imágenes
  (base)    (pixel)    (entry)   (eval)     (forms)    (carga)     (connect)  (deploy)   (spotlight) (reales)
```

Cada sprint es independiente y demostrable. Después de Sprint 2 ya tienes un demo navegable. Después de Sprint 4 ya tienes el flujo más importante (alta SKU). Sprint 6 es lo que conecta todo.

---

### Sprint 8: Tutoriales Interactivos Guiados (1 sesión)
**Objetivo:** Onboarding interactivo tipo spotlight (como JLL Torre de Control) para que cualquier persona entienda el demo.

- [x] `useTourStore.ts` — Zustand store con localStorage para tours completados
- [x] `tourSteps.ts` — Definición del tour cross-role (5 pasos slideshow)
- [x] `spotlightSteps.ts` — Spotlight steps por rol: Comprador (6 pasos), Proveedor (6 pasos)
- [x] `SpotlightTour.tsx` — Overlay SVG con recorte spotlight, borde amarillo pulsante, tooltip posicionado junto al elemento real, barra de progreso, navegación
- [x] `WelcomeModal.tsx` — Modal de bienvenida "Iniciar tour" / "No, ya conozco el portal"
- [x] `TourSlideshow.tsx` — Modal slideshow para tour cross-role (iconos, tips, navegación)
- [x] `TourLauncher.tsx` — Botón flotante "?" con menú de tours y badge "Visto"
- [x] `TourAutoStart.tsx` — Muestra Welcome modal al entrar por primera vez, luego lanza spotlight
- [x] `data-tour` attributes en: greeting, banner, quick-actions, feature-cards, notifications, user-avatar, solicitudes, mi-cuenta
- [x] Botón "Ver demo guiada" en RoleSelector para tour del flujo cruzado
- [x] Integración en PageLayout (spotlight + slideshow + launcher + autostart)

**Entregable:** Tutoriales interactivos con spotlight real sobre elementos de la página, accesibles en todo momento desde el botón "?".

---

### Sprint 9: Imágenes Reales (1 sesión)
**Objetivo:** Reemplazar todos los placeholders con imágenes reales.

- [x] 10 productos con fotos reales de Mattel CDN y Prinsel CDN
- [x] Banners con fotos de logística/reparto + overlay con gradiente y texto
- [x] Cards de Home Comprador: bodega, inventario, oficina (Pexels)
- [x] Cards de Home Proveedor: cajas, equipo de trabajo (Pexels)
- [x] Fotos de perfil: Juanita Solis y Felipe López con avatares reales
- [x] Navbar muestra foto de perfil en lugar de iniciales
- [x] RoleSelector con fotos de perfil por rol
- [x] Imágenes de referencia en SolicitudDetalle con productos reales
- [x] Cero placehold.co URLs en todo el proyecto

**Entregable:** Demo visualmente creíble con imágenes reales.
