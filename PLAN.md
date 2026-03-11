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
- [ ] Instalar y configurar Tailwind CSS v4 con tokens Coppel
- [ ] Instalar dependencias: React Router, Zustand, Lucide React, React Hook Form
- [ ] Copiar `FIGMA_REFERENCE.md` al repo
- [ ] Crear estructura de carpetas vacía
- [ ] Configurar ESLint + Prettier
- [ ] Configurar deploy en Railway
- [ ] Commit inicial

**Entregable:** `npm run dev` funciona con página en blanco.

---

### Sprint 1: Layout Global + Componentes Base (1-2 sesiones)
**Objetivo:** Todos los componentes compartidos, pixel-perfect.

**Prioridad 1 — Layout (comparar constantemente con Figma):**
- [ ] `Navbar.tsx` — Logo Coppel (3 puntos amarillos + texto), búsqueda, idioma, notificaciones, avatar. Altura exacta: 112px
- [ ] `Footer.tsx` — Fondo azul oscuro, 5 columnas, términos y condiciones, botón "Ir al inicio"
- [ ] `Breadcrumb.tsx` — Con icono 🏠, separadores ">", links azules
- [ ] `PageLayout.tsx` — Navbar + Breadcrumb + content (max-width 1440px, padding 24px) + Footer

**Prioridad 2 — Componentes UI:**
- [ ] `Button.tsx` — height 48px, border-radius pill, variantes primary/outline/ghost
- [ ] `Input.tsx` — height 40px, label encima, borde gris, focus azul, asterisco rojo para required
- [ ] `Select.tsx` — Mismo estilo que Input con chevron
- [ ] `Checkbox.tsx`, `RadioGroup.tsx`, `Toggle.tsx`
- [ ] `Badge.tsx` / `StatusBadge.tsx` — Con colores exactos por estatus
- [ ] `Table.tsx` + `Pagination.tsx` — Headers azul oscuro, sorting icons, checkboxes
- [ ] `Modal.tsx` — Overlay semi-transparente, card centrada, X para cerrar
- [ ] `Tabs.tsx` — Horizontal con indicadores ● verde/gris, tab activo con underline
- [ ] `ActionCard.tsx` — Imagen arriba, título bold, descripción, botón outline
- [ ] `ProductCard.tsx` — Thumbnail izquierda, datos en tabla horizontal, badge estatus
- [ ] `FileUpload.tsx` — Drag & drop con icono, texto "Arrastra y suelta" y "Selecciona tus archivos"
- [ ] `DatePicker.tsx`, `NumberInput.tsx`, `Textarea.tsx`
- [ ] `ImageCarousel.tsx` — Con dots y flechas
- [ ] `Accordion.tsx` / `FormSection.tsx` — Expandible con título, toggle info, botón guardar

**Entregable:** Storybook mental — cada componente renderiza igual que en Figma.

---

### Sprint 2: Homes + Selector de Rol (1 sesión)
**Objetivo:** Las pantallas de entrada del portal.

- [ ] `RoleSelector.tsx` — Pantalla simple: "Entrar como Comprador" / "Entrar como Proveedor"
- [ ] `useAuthStore.ts` — Store con rol y usuario actual
- [ ] `HomeComprador.tsx`:
  - Saludo "Bienvenida, Juanita Solis"
  - Carousel de imágenes Coppel (placeholder images)
  - Accesos rápidos: Propuestas de SKU's, Alta de proveedores
  - Cards: Generar Invitación, Alta prospectos, Propuestas y SKU's
- [ ] `HomeProveedor.tsx`:
  - Saludo "Bienvenido, [Proveedor]"
  - Carousel "Descubre los beneficios..."
  - Accesos rápidos: Mi perfil, Catálogos, Mis solicitudes, Documentos
  - Solicitudes: Nueva solicitud, Historial
  - Mi cuenta: grid 3x2 de cards

**Entregable:** Navegación funcional entre selector → home comprador/proveedor.

---

### Sprint 3: Flujo Comprador — Listado y Evaluación (1-2 sesiones)
**Objetivo:** El comprador puede ver, filtrar y evaluar propuestas.

- [ ] `mockProducts.ts` — 10+ productos con datos realistas (Mattel, muñecas, precios reales)
- [ ] `mockProveedores.ts` — 3+ proveedores
- [ ] `ListadoPropuestas.tsx`:
  - Layout 2 columnas (sidebar 333px + contenido)
  - Sidebar: 3 dropdowns (Categoría, Clase, Familia) + Descargar plantilla + Drag&drop + Filtrar por (Precio, Margen, Marca con checkboxes, Color)
  - Header: nombre proveedor + solicitud ID + ordenar por + toggle vista/lista
  - Cards de producto con: checkbox, thumbnail, nombre, marca, tipo proveedor, modelo, precio, costo, margen, badge estatus, ficha técnica link, toggle carga masiva
  - Paginación
- [ ] `EvaluacionPropuesta.tsx`:
  - Card producto (imagen + datos + cantidad +/-)
  - Especificaciones (textarea)
  - Dirección de entrega (botón con icono ubicación)
  - Rango de entrega (date range picker)
  - 3 checkboxes (planeación, info para alta, quién recibe)
  - Botón Continuar
- [ ] `useProposalStore.ts` — Estado de propuestas y pre-selecciones

**Entregable:** Comprador navega: Home → Listado → Evaluación con datos realistas.

---

### Sprint 4: Flujo Comprador — Alta de SKU (2-3 sesiones)
**Objetivo:** El formulario completo de 8 tabs, pixel-perfect.

- [ ] `PropuestasEnAlta.tsx`:
  - Tabs de categoría (Juguetes, Bebés, Consolas)
  - Botón "Nuevo producto +"
  - Tabla: Imagen, Artículo, Marca, Modelo, Proveedor, Estatus, Clase
  - Click en fila → abre formulario
- [ ] `AsignarProveedor.tsx` (Modal):
  - Dropdown proveedor + Dropdown categoría
  - Link "Ir al alta del proveedor"
  - Botones Regresar/Continuar
- [ ] `AltaSkuLayout.tsx`:
  - ProductHeader (imagen carousel, clasificación, ID Propuesta, botones Cancelar/Dar de alta)
  - Tab navigation con indicadores de progreso
- [ ] `Tab1InfoGeneral.tsx` — Datos del producto, modelo, origen, SAT, tiempo armado, medidas, artículos incluidos
- [ ] `Tab2EstrategiaComercial.tsx` — Condiciones compra, preventa, garantías, liquidación con tabla de 12 meses
- [ ] `Tab3Color.tsx` — Datos por color (acordeones), GTIN, pronóstico venta, imágenes por color
- [ ] `Tab4Atributos.tsx` — Tabla 2 columnas (proveedor vs comprador), descripción de etiqueta con drag&drop
- [ ] `Tab5DatosLogisticos.tsx` — Config logística, tabla CEDIS, medidas empaque, empaques, pallet, acomodo
- [ ] `Tab6CostosPrecios.tsx` — Costos, impuestos, factor utilidad, precio venta, sobreprecio, comisiones, gastos
- [ ] `Tab7AdminStock.tsx` — Tabla stock por tamaño tienda (Coppel, Canadá, etc.), porcentajes distribución por bodega
- [ ] `Tab8Configuracion.tsx` — Pronósticos, modelo-color, entrega y etiquetado
- [ ] `useSkuFormStore.ts` — Persiste datos entre tabs, marca tabs como completados

**Entregable:** Formulario completo navegable, datos persisten entre tabs, botón "Dar de alta" se habilita al completar todo.

---

### Sprint 5: Flujo Proveedor — Solicitudes y Carga (1-2 sesiones)
**Objetivo:** El proveedor recibe solicitudes y envía propuestas.

- [ ] `mockSolicitudes.ts` — 3+ solicitudes con specs del comprador
- [ ] `HistorialSolicitudes.tsx`:
  - Lista de solicitudes con estatus
  - Link a detalle
- [ ] `SolicitudDetalle.tsx`:
  - Especificaciones del comprador (textarea readonly)
  - Galería de imágenes de referencia
  - Archivos adjuntos (links a PDF)
  - Botones: Carga individual / Carga masiva
- [ ] `CargaIndividual.tsx`:
  - Dropdown tipo de producto
  - Formulario: Información general (artículo, tipo, país, marca, modelo, URL video, imágenes, comentarios, campos dinámicos por tipo)
  - Formulario: Información comercial (costo, mínimo compra, tiempo entrega, precios, IVA)
  - Botones: Eliminar propuesta / Guardar
- [ ] `CargaMasiva.tsx`:
  - Dropdown tipo producto + botón Descargar plantilla
  - Drag & drop zone para archivo
  - Tabla de productos cargados con paginación
  - Botón Finalizar
- [ ] `VistaRapidaPropuestas.tsx`:
  - Tabla resumen de todas las propuestas
  - Link a ficha técnica
- [ ] `FichaTecnica.tsx`:
  - Vista readonly/editable de la propuesta

**Entregable:** Proveedor navega: Home → Solicitud → Carga → Vista rápida → Ficha técnica.

---

### Sprint 6: Flujo Completo + Notificaciones (1 sesión)
**Objetivo:** Conectar ambas vistas con un flujo realista.

- [ ] `useNotificationStore.ts` — Notificaciones cruzadas entre roles
- [ ] `useWorkflow.ts` — Máquina de estados para transiciones:
  ```
  Comprador solicita info → Proveedor recibe notificación
  Proveedor envía propuestas → Comprador recibe notificación
  Comprador pre-selecciona → Estatus cambia
  Comprador inicia alta SKU → Proveedor ve complemento
  ```
- [ ] Indicador de notificaciones en Navbar (número rojo)
- [ ] Panel de notificaciones (dropdown simple)
- [ ] Transiciones de estatus en badges al tomar acciones
- [ ] Modal de confirmación en acciones importantes (enviar, dar de alta)
- [ ] Modal de éxito después de acciones completadas

**Entregable:** Demo completo donde puedes hacer el flujo entero cambiando entre roles.

---

### Sprint 7: Polish + Deploy (1 sesión)
**Objetivo:** Pulir detalles visuales y deployar.

- [ ] Revisión pixel-perfect de cada pantalla contra Figma
- [ ] Responsive check (1440px es el target principal)
- [ ] Estados empty (listas vacías, formularios sin datos)
- [ ] Estados de loading (skeleton loaders)
- [ ] Hover states en todos los elementos interactivos
- [ ] Focus states para accesibilidad
- [ ] Transiciones suaves entre páginas
- [ ] Deploy en Railway
- [ ] Actualizar README.md

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
Sprint 0 → Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 → Sprint 6 → Sprint 7
  Setup     Layout     Homes     Listado    Alta SKU   Proveedor   Flujo      Polish
  (base)    (pixel)    (entry)   (eval)     (forms)    (carga)     (connect)  (deploy)
```

Cada sprint es independiente y demostrable. Después de Sprint 2 ya tienes un demo navegable. Después de Sprint 4 ya tienes el flujo más importante (alta SKU). Sprint 6 es lo que conecta todo.
