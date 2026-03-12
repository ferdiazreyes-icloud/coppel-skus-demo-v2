# SGC Coppel — SKU's Demo v2

> Demo funcional del portal SGC (Sistema de Gestión Comercial) de Coppel para gestionar propuestas y alta de SKU's entre compradores internos y proveedores externos.

**Version:** 1.4.0 (Sprints 0–11 complete)
**Live demo:** [coppel-skus-demo-v2-production.up.railway.app](https://coppel-skus-demo-v2-production.up.railway.app)
**Figma reference:** [SKU's_SGC](https://www.figma.com/design/gYTM6PwHzQPGycic3kdIE6/SKU-s_SGC)

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 + Vite | UI framework + dev server |
| TypeScript | Type safety |
| Tailwind CSS v4 | Pixel-perfect styling with design tokens |
| React Router v7 | Client-side routing with nested layouts |
| Zustand | Global state (auth, SKU form, notifications, tours) |
| Lucide React | Icon library |

---

## What's Implemented

### Sprint 0: Project Setup
- [x] Vite + React 19 + TypeScript scaffold
- [x] Tailwind CSS v4 with Coppel design tokens (`@theme` block)
- [x] Zustand stores: auth, SKU form, notifications
- [x] Type system: Product, ProposalStatus, SkuFormData, SKU_TABS
- [x] Utility functions: formatCurrency, formatPercent

### Sprint 1: Layout + UI Components (20+ components)
- [x] **Layout:** Navbar (112px), Footer, Breadcrumb, PageLayout (max 1440px)
- [x] **Forms:** Button (5 variants), Input, Select, Checkbox, RadioGroup, Toggle, Textarea, NumberInput, DatePicker, DateRangePicker, FileUpload
- [x] **Data:** Table (sortable, selectable), Pagination, Badge (status colors)
- [x] **Navigation:** Tabs (completion dots), Modal (sm/md/lg)
- [x] **Display:** Avatar, ImageCarousel, ActionCard, ProductCard, CoppelLogo
- [x] **Shared:** FormSection (accordion + save), ProductHeader, FilterSidebar

### Sprint 2: Home Pages + Role Selector
- [x] **RoleSelector** — Comprador / Proveedor entry screen
- [x] **HomeComprador** — Banner, quick actions, feature cards
- [x] **HomeProveedor** — Banner, quick actions, solicitudes, account cards

### Sprint 3: Comprador — Proposal Listing & Evaluation
- [x] **ListadoPropuestas** — Two-column layout: sidebar filters + product card list with pagination
- [x] **EvaluacionPropuesta** — Product detail + sample request form (specs, address, dates, checkboxes)
- [x] Mock data: 10 products (Mattel dolls, Prinsel), 2 solicitudes

### Sprint 4: Comprador — SKU Registration (8-tab form)
- [x] **PropuestasEnAlta** — Category tabs + sortable product table + assign supplier modal
- [x] **AltaSkuLayout** — ProductHeader + tab navigation with completion indicators
- [x] **Tab 1 - Info General** — Product data, model, origin, SAT, assembly time, dimensions, included items
- [x] **Tab 2 - Estrategia Comercial** — Purchase conditions, pre-sale, warranty, 12-month discount table
- [x] **Tab 3 - Datos por Color** — Color accordions, GTIN codes, sales forecast, image upload
- [x] **Tab 4 - Atributos** — Dual-column attribute table, label description with priority ordering
- [x] **Tab 5 - Datos Logísticos** — CEDIS table, packaging dimensions, pallet config
- [x] **Tab 6 - Costos y Precios** — Costs, taxes, utility factors, prices, surcharges, commissions
- [x] **Tab 7 - Admin Stock** — Store format stock grid, warehouse distribution percentages
- [x] **Tab 8 - Configuración** — Forecasts, model-color visibility, delivery/labeling checkboxes

### Sprint 5: Proveedor Flow — Solicitudes & Upload
- [x] **HistorialSolicitudes** — List of solicitudes with status badges, click to navigate
- [x] **SolicitudDetalle** — Buyer specs (readonly), reference images, PDF documents, carga buttons
- [x] **CargaIndividual** — Product type form with dynamic fields (muñeca/montable), commercial info
- [x] **CargaMasiva** — Template download, drag & drop upload, products table with pagination
- [x] **FichaTecnica** — Readonly product detail with edit/send-to-review buttons

### Sprint 6: Cross-role Integration
- [x] **ConfirmModal** — Reusable modal with confirm/success variants
- [x] **Notification system** — Cross-role notifications with badge count, dropdown panel, click-to-navigate
- [x] Confirm + success modals on: send to review, request sample, register SKU, save proposal
- [x] Notifications trigger across roles when actions are taken

### Sprint 7: Polish & Deploy
- [x] CSS animations for modals (fade-in, scale-in)
- [x] Hover shadow effects on cards (ProductCard, ActionCard)
- [x] Focus-visible outline for accessibility
- [x] Coppel logo corrected (circles large→medium→small left to right)
- [x] Deployed to Railway

### Sprint 8: Interactive Guided Tours (Spotlight)
- [x] **SpotlightTour** — SVG overlay with cutout highlighting real page elements, yellow pulsing border, tooltip with progress bar
- [x] **WelcomeModal** — "Iniciar tour" / "No, ya conozco el portal" on first visit per role
- [x] **TourLauncher** — Floating "?" FAB button with tour menu and "Visto" badges
- [x] **TourAutoStart** — Auto-shows Welcome + Spotlight on first visit (persisted in localStorage)
- [x] 2 role-specific spotlight tours: Comprador (6 steps), Proveedor (6 steps)
- [x] `data-tour` attributes on home page elements: greeting, banner, quick-actions, feature-cards, notifications, user-avatar, solicitudes, mi-cuenta

### Sprint 10: Cross-Role Spotlight Tour (Multi-page Navigation)
- [x] **CrossRoleTour** — Full spotlight tour that navigates between real pages, switches roles, and highlights DOM elements on each screen
- [x] **Phase state machine** — transition → measuring → ready, with animated transition screens between pages
- [x] **Page transitions** — Spinner overlay with label ("Navegando a: ..." / "Cambiando a Proveedor...") between route changes
- [x] **19 steps** covering the complete Comprador → Proveedor flow:
  - Steps 1–2: Home Comprador (quick actions + notifications)
  - Steps 3–4: Catálogo de propuestas (header + first product card)
  - Steps 5–6: Evaluación de propuesta (product summary + sample request)
  - Steps 7–8: Propuestas en alta (header + category tabs)
  - Steps 9–10: Formulario Alta SKU (product header + 8 tabs)
  - Steps 11–12: Home Proveedor (quick actions + notifications)
  - Steps 13: Historial de solicitudes
  - Steps 14–15: Detalle solicitud (specs + carga buttons)
  - Steps 16–17: Carga individual (product type + save)
  - Step 18: Ficha técnica
  - Step 19: Tour completed
- [x] `data-tour` attributes added to all sub-pages: listado-header, first-product, filter-sidebar, product-list, product-summary, sample-request-btn, alta-header, category-tabs, products-table, product-header, sku-tabs, solicitudes-list, buyer-specs, carga-buttons, product-type, save-buttons, ficha-header
- [x] "Ver demo guiada del flujo completo" button on RoleSelector launches the tour
- [x] Spotlight height capped at 500px for tall elements, auto-fallback tooltip to top when no space below
- [x] Tour returns to RoleSelector on close

### Sprint 9: Real Images
- [x] 10 real product photos from Mattel/Prinsel CDN (Wicked, Frozen, Moana, Barbie, Monster High, Prinsel Push Car)
- [x] Banner images with gradient overlay and text (Pexels stock photos)
- [x] Home Comprador cards: warehouse, inventory check, office teamwork
- [x] Home Proveedor cards: box shelves, business meeting
- [x] Profile photos for Juanita Solis and Felipe López in Navbar + RoleSelector
- [x] Reference images in SolicitudDetalle with real product photos
- [x] Zero placeholder images remaining in codebase

### Sprint 11: Import Product Fields (10-Tab SKU Form)
- [x] **Tab 1 — Info General:** Added "Empresa importadora" field, Origen defaults to "Importación"
- [x] **Tab 5 — Datos Logísticos:** Added "Datos de fábrica" section (factory name, country, port, transit time) and "Piezas contenedor y MOQ" section (container type, pieces per container, MOQ)
- [x] **Tab 6 — Costos y Precios (major overhaul):** New "Precio de venta" section (LCD/MXN prices, interior/frontera proposals), "Arancel" section (fracción arancelaria, Ad Valorem, PROSEC, IMMEX, preferential tariff, compensatory quota), "Gastos importación" with dynamic rows, "Flete" section, "Cálculos comerciales" with Impuestos, Sobreprecios, Comisiones, Factizal, and Factor de utilidad
- [x] **Tab 9 — Clasificación (NEW):** Product classification (tipo de alta, temporada, segmento), clasificación arancelaria (fracción, NICO), regulaciones y restricciones (NOM)
- [x] **Tab 10 — Certificaciones (NEW):** NOM certifications with PDF file display, vigencia dates, add/remove certification rows
- [x] Updated `SKU_TABS` from 8 → 10 tabs, updated `SkuFormData` type
- [x] `AltaSkuLayout` updated with new tab components

### Known Limitations
- Sidebar filters in ListadoPropuestas are visual only (no actual filtering)
- Form data in SKU tabs is not persisted to mock backend
- This is a demo — no real API or database

---

## Routes

| Route | Page | Role |
|-------|------|------|
| `/` | RoleSelector | — |
| `/comprador` | HomeComprador | Comprador |
| `/comprador/propuestas/:proveedorId` | ListadoPropuestas | Comprador |
| `/comprador/propuestas/:proveedorId/:productoId/evaluar` | EvaluacionPropuesta | Comprador |
| `/comprador/alta-skus` | PropuestasEnAlta | Comprador |
| `/comprador/alta-skus/:productoId/:tab` | AltaSkuLayout (10 tabs) | Comprador |
| `/proveedor` | HomeProveedor | Proveedor |
| `/proveedor/solicitudes` | HistorialSolicitudes | Proveedor |
| `/proveedor/solicitudes/:solicitudId` | SolicitudDetalle | Proveedor |
| `/proveedor/solicitudes/:solicitudId/carga-individual` | CargaIndividual | Proveedor |
| `/proveedor/solicitudes/:solicitudId/carga-masiva` | CargaMasiva | Proveedor |
| `/proveedor/propuestas/:propuestaId` | FichaTecnica | Proveedor |

---

## How to Run

```bash
# Install dependencies
npm install

# Dev server (http://localhost:5173)
npm run dev

# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Breadcrumb, PageLayout
│   ├── shared/          # FormSection, ProductHeader, FilterSidebar
│   ├── tour/            # SpotlightTour, CrossRoleTour, WelcomeModal, TourLauncher, TourAutoStart
│   └── ui/              # 20+ reusable UI components
├── data/                # Mock products, catalog, tour steps, cross-role steps
├── pages/
│   ├── comprador/       # Comprador pages
│   │   └── tabs/        # 8 SKU form tabs
│   └── proveedor/       # Proveedor pages
├── stores/              # Zustand stores (auth, SKU form, notifications, tours)
├── types/               # TypeScript interfaces
└── utils/               # Formatting helpers
```

---

## Design Reference

All screens are based on the Figma file documented in `FIGMA_REFERENCE.md`. Key design tokens:

| Token | Value |
|-------|-------|
| Coppel Blue | `#1A3C9E` |
| Coppel Navy | `#081754` |
| Coppel Yellow | `#F5C518` |
| Background | `#F3F3F3` |
| Font (headings) | Poppins |
| Font (body) | Source Sans 3 |
| Navbar height | 112px |
| Content max-width | 1440px |
