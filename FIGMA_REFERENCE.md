# SGC Proveedores - Referencia de Diseño Figma

> Documento generado a partir del análisis del archivo Figma "SKU's_SGC"
> Fuente: https://www.figma.com/design/gYTM6PwHzQPGycic3kdIE6/SKU-s_SGC
> Fecha de análisis: 2026-03-11

---

## 1. Visión General del Portal

El portal SGC (Sistema de Gestión Comercial) de Coppel es una plataforma web para gestionar la relación entre **compradores internos de Coppel** y **proveedores externos**. Su función principal es el proceso completo de alta, evaluación y gestión de SKU's (productos).

### Dos roles principales con portales diferenciados:

| Rol | Descripción | Acciones principales |
|-----|-------------|---------------------|
| **Comprador** | Empleado interno de Coppel (ej. "Juanita Solis", "Felipe López") | Evaluar propuestas, solicitar muestras, dar de alta SKU's, gestionar proveedores |
| **Proveedor** | Empresa externa que vende a Coppel (ej. "Mattel S.A. de C.V.") | Registrarse, enviar propuestas de productos, llenar fichas técnicas, complementar información |

### Dos tipos de producto:

| Tipo | Identificador | Diferencia |
|------|--------------|------------|
| **Nacional (NAC)** | 🇲🇽 | Proveedor mexicano, formularios más simples |
| **Importación (IMPO)** | 🇨🇳 | Proveedor internacional, incluye datos de aduanas, factory information |

---

## 2. Diseño Global (Layout)

### Navbar (header fijo)
- Logo **Coppel** (azul con puntos amarillos) — esquina superior izquierda
- Barra de búsqueda (oculta en algunas vistas)
- Botón de idioma: "English" con icono de globo
- Botón de **Notificaciones** con icono de campana
- Avatar de usuario con nombre (ej. "Felipe López") o "Cerrar sesión"

### Breadcrumbs
- Siempre debajo del navbar
- Formato: `🏠 Inicio > Propuestas y SKU's > Bandeja de solicitudes > Mattel S.A. de C.V.`
- Cada nivel es clickeable (link azul)

### Footer
- Fondo azul oscuro
- Columnas: Conócenos, Enlaces útiles, Publicaciones, Atención a clientes, Contacto
- Debajo: "Términos y condiciones" | "Aviso de privacidad"
- Botón "Ir al inicio" con flecha arriba

### Colores principales
- **Azul Coppel:** #1A3C9E (navbar, botones primarios, headers)
- **Amarillo Coppel:** #F5C518 (puntos del logo, acentos)
- **Fondo:** #F5F5F5 (gris muy claro)
- **Cards:** #FFFFFF con border-radius y sombra sutil
- **Texto principal:** #1A1A1A (casi negro)
- **Texto secundario:** #666666
- **Éxito/Verde:** badges de estatus completado
- **Naranja:** badges de "Pendiente comprador"
- **Rojo:** badges de alertas o "En proceso"

### Tipografía
- Títulos principales: Bold, ~24-28px
- Subtítulos de sección: Bold, ~18-20px
- Texto de cuerpo: Regular, ~14-16px
- Labels de formulario: Medium, ~14px

---

## 3. VISTA COMPRADOR — Pantallas y Flujos

### 3.1 Home del Comprador

**Ruta:** `/`
**Breadcrumb:** Inicio

**Estructura:**
- Saludo: "Bienvenida, Juanita Solis" (cursiva)
- **Carousel** de imágenes de Coppel (banner principal con indicadores de puntos)
- **Accesos rápidos** (iconos circulares):
  - 🔒 Propuestas de SKU's
  - 🚛 Alta de proveedores
- **Cards de funcionalidades** (carousel horizontal con flechas < >):
  - **Generar Invitación** — "Invita prospectos a registrarse" → Botón "Generar QR"
  - **Alta prospectos** — "Gestión completa de prospectos" → Botón "Ir a listado de prospectos"
  - **Propuestas y SKU's** — "Revisa y gestiona tus propuestas..." → Botón "Ver propuestas y SKU's"

### 3.2 Listado de Propuestas (Bandeja de solicitudes)

**Ruta:** `/propuestas-skus/bandeja-solicitudes/{proveedor}`
**Breadcrumb:** Inicio > Propuestas y SKU's > Bandeja de solicitudes > Mattel S.A. de C.V.

**Header de la página:**
- Nombre del proveedor: "Mattel S.A. de C.V."
- Número de solicitud: "Solicitud #1298766"

**Layout en 2 columnas:**

**Columna izquierda (sidebar de filtros, ~333px):**
- Dropdown: Categoría (ej. "Juguetes")
- Dropdown: Clase (ej. "Muñecas y accesorios")
- Dropdown: Familia (ej. "Muñecas tipo fashion")
- Botón "Descargar plantilla" con icono
- Zona de drag & drop: "Carga plantilla"
- **Sección "Filtrar por"** con divisor:
  - Precio (rango min/max con inputs numéricos)
  - Margen en porcentaje (rango min/max)
  - Marca (checkboxes: Mattel, Disney, Monster High, Bratz, Lego + "Ver más")
  - Color (expandible)
  - Tipo de producto (expandible)

**Columna derecha (listado principal):**
- **Barra de ordenamiento:**
  - "Ordenar por:" con dropdowns: Relevancia, Estatus, Planeaciones
  - Toggle Vista/Lista (iconos grid/list)
  - Checkbox: "He revisado todas las propuestas que le solicité al proveedor/prospecto"
- **Cards de producto** (vista lista, una por fila):
  - Checkbox "Pre seleccionar"
  - Imagen del producto (thumbnail ~100px)
  - Nombre del producto en negrita (ej. "Muñeca Wicked")
  - Marca debajo del nombre
  - Datos en tabla horizontal:
    - Tipo de proveedor: Activo
    - Modelo: 26491823
    - Precio venta: $1,039
    - Costo: $675.35
    - Margen: 35%
  - Checkbox "Comparar"
  - Botón "Ficha técnica" (outline azul)
  - Toggle "Carga masiva"
  - **Badge de estatus** (esquina superior derecha de la card):
    - 🟢 "En revisión" (verde)
    - 🟡 "Listo para evaluar" (amarillo)
    - 🟠 "Cotización solicitada" (naranja)
    - 🔴 "En proceso de alta" (rojo)
    - 🔵 "Preseleccionado" (azul)
- **Paginación** al fondo: « < 1 2 3 4 5 ... 10 > »

### 3.3 Evaluación de Propuestas (detalle de producto)

**Ruta:** `/propuestas-skus/bandeja-solicitudes/{proveedor}/{producto}/solicitar-muestra`

**Card del producto** (parte superior):
- Imagen grande del producto
- Nombre: "Muñeca Wicked" — Marca: "Mattel"
- Tabla de datos: Tipo de proveedor, Modelo, Cantidad (+/-), Precio venta, Costo, Margen

**Sección Especificaciones:**
- Textarea de comentarios (0/100 caracteres)

**Sección Dirección de entrega:**
- Botón "Elegir dirección" con icono de ubicación

**Sección Rango de entrega:**
- Date range picker: Fecha de inicio — Fecha final

**Checkboxes:**
- ☐ Participa en planeación
- ☐ Solicitar información para alta
- ☐ Especificar quien recibe la muestra

**Botón:** "Continuar" (azul, centrado)

### 3.4 Propuestas en Proceso de Alta (tabla)

**Ruta:** `/propuestas-skus/propuestas-en-proceso-de-alta`
**Breadcrumb:** Inicio > Propuestas y SKU's > Propuestas en proceso de alta

**Tabs de categoría** (con iconos): Juguetes 🧸, Bebés 👶, Consolas y videojuegos 🎮

**Botón:** "Nuevo producto +" (esquina derecha, azul)

**Tabla con columnas:**
| Imagen | Artículo ↕🔽 | Marca ↕🔽 | Modelo ↕🔽 | Proveedor ↕🔽 | Estatus ↕🔽 | Clase ↕🔽 |
|--------|----------|-------|--------|-----------|---------|-------|
| thumb | 123456 - Muñeca Wicked | Mattel | 26491823 | 234567 - Mattel S.A. de C.V. | 🟠 Pendiente comprador | 07 Juguetes |

**Estatus posibles en tabla:**
- 🟠 "Pendiente comprador" (naranja)
- 🟢 "Pendiente proveedor" (verde)

**Modal "Asigna un proveedor a este SKU":**
- Texto: "Selecciona la clave del proveedor. Si no recuerdas el número, búscalo en el catálogo de proveedores"
- Dropdown: "Nombre/ID proveedor o nombre/ID prospecto"
- Dropdown: "Categoría" (ej. Juguetes)
- Link: "Ir al alta del proveedor"
- Botones: "< Regresar" | "Continuar >"

### 3.5 Alta de SKU — Formulario Paso a Paso (Vista Comprador)

**Ruta:** `/propuestas-skus/propuestas-en-proceso-de-alta/{producto}`

**Header del producto** (fijo en todas las tabs):
- Imagen del producto con carousel (puntos + flechas)
- Nombre: "Montable Prinsel Push Car Adventure"
- ID: 9876543
- Línea: "Productos Infantiles Selectos"
- Datos de clasificación:
  - Categoría: **10-Juguetes**
  - Sub Categoría: **31-Bebés**
  - Tipo de producto: **Montable**
  - Clase: **03-Juguetes**
  - Familia: **04-Montable**
  - Marca: **Prinsel**
  - Modelo: **Push Car Adventure**
- **ID Propuesta: 123456**
- Botones: "Cancelar alta ✕" (outline) | "Dar de alta SKU 🔒" (azul, deshabilitado hasta completar)

**Navegación por tabs** (horizontal, scrollable):
1. Información general
2. Estrategia comercial
3. Datos por color
4. Atributos
5. Datos logísticos y de empaque
6. Costos y precio de venta
7. Administración de stock
8. Configuración

Cada tab tiene un indicador de completado (● verde = completo, ● gris = pendiente).

---

#### Tab 1: Información General

**Sección "Datos del producto"** (con toggle "Info. SKU de referencia"):
- Categoría* (dropdown): 10-Juguetes
- Sub Categoría* (dropdown): 31-Bebés
- Clase* (dropdown): 03-Juguetes
- Familia* (dropdown)
- Tipo de producto (PMd)* (dropdown)
- Artículo* (input): Montable
- Marca* (input): Marca
- Modelo* (input): Push car adventure
- Tipo de marca: Radio buttons (● Marca propia / ○ Licencia)
- Haga una marca* (dropdown)
- Descripción de artículo* (textarea, texto largo)

**Sección "Modelo":**
- Modelo base* (input): Push Car
- Modelo etiqueta* (input): Push Car Adventure

**Sección "Origen":**
- Origen (dropdown): Nacional
- País de origen* (dropdown): México

**Sección "No. Serie/MEI":**
- ¿Aplica no. Serie / MEI?*: Radio buttons (○ Sí / ● No)

**Sección "Producto y servicio SAT":**
- Producto y servicio SAT*: (dropdown con código SAT)

**Sección "Tiempo de armado total":**
- Texto explicativo: "Captura el tiempo estimado que le tomaría a una persona promedio —no a un experto— armar este SKU"
- Tiempo de armado (minutos)* (input numérico)

**Sección "Estatus y canal":**
- Estatus* (dropdown): En línea
- Compra/No compra*: Radio buttons
- Canal*: Radio buttons (● Unicanal / ○ Línea extendida)
- Modo de entrega* (dropdown)

**Botón:** "Guardar 💾" (azul, esquina inferior derecha)

**Sección "Medidas del producto armado"** (con toggle "Info. SKU de referencia"):
- Nombre del producto armado* (input)
- Unidad de Peso* (dropdown): Kilogramos kg
- Peso* (input): 6.94
- Número de piezas* (input con +/- buttons): 1
- Unidad de medida* (dropdown): Centímetros
- Alto* (input)
- Diámetro (si aplica) (input)
- Frente* (input)
- Fondo* (input)

**Botón:** "Agregar producto armado ➕" | "Guardar 💾"

**Sección "Artículos incluidos"** (con toggle "Info. SKU de referencia"):
- Texto: "Especifica los artículos y accesorios que conforman el contenido del paquete"
- Tabla:
  | Contenido* | Cantidad* | Acciones |
  |-----------|-----------|----------|
  | Contenido 1 | - 1 + | Eliminar 🗑 |
- Link: "Agregar contenido ➕"

**Botón:** "Guardar 💾"

---

#### Tab 2: Estrategia Comercial

**Sección "Condiciones de compra"** (con toggle "Info. SKU de referencia"):
- Mínimo a pedir (unidades): input numérico (ej. 100)

**Sección "Preventa":**
- Checkbox: ☑ Aplica preventa
- Unidades disponibles preventa*: input (ej. 200)
- Fecha inicio preventa* (date picker)
- Fecha final preventa* (date picker)
- Fecha límite de venta al público* (date picker)

**Botón:** "Guardar 💾"

**Sección "Convenio de garantías":**
- Texto explicativo sobre convenio de garantías
- Esquema de garantías (dropdown): A
- Devoluciones por decisión del cliente: input (ej. 10) — "Días para cambios o devoluciones"
- Garantía: input (ej. 3) — "Meses de servicio de Garantía con [Coppel/Proveedor]"
- Link: "Ir al convenio de garantías"

**Botón:** "Guardar 💾"

**Sección "Liquidación y descontinuados"** (con toggle "Info. SKU de referencia"):
- Plan de descuento (dropdown)
- Toggle: Prender/Apagar Plan de descuento
- Texto explicativo sobre DP (devaluación o provecho de mercancía)
- Cobrar como (dropdown): Sellout
- Checkbox: ☑ Aplico devolución al mes 13
- **Tabla de plan de descuentos (12 meses):**

| Mes | Días | % Convenio | % Proveedor* → | % Coppel* | % Descuento |
|-----|------|-----------|---------------|-----------|-------------|
| 0 | 0 | 3% | 2% | 2% | Porcentaje |
| 1 | 30 | 2% | 2% | 2% | Porcentaje |
| ... | ... | ... | ... | ... | ... |
| 12 | 360 | 2% | 2% | 2% | Porcentaje |

- Link: "Ir al convenio comercial"

**Botón:** "Guardar 💾"

---

#### Tab 3: Datos por Color

**Sección "Datos por color":**
- Texto: "Registra los colores del producto. Cada color genera un SKU distinto, por lo que es importante cargar todas las opciones aplicables"

**Por cada color (acordeón expandible "Color 1", "Color 2", etc.):**
- Selecciona un color* (dropdown)
- Nombre del color comercial* (input)
- ID del producto (input)
- ¿Aplica código GTIN?*: Radio (● Sí / ○ No)
- Código GTIN* (input)
- Código GLN* (input)

**Sección "Pronóstico de venta":**
- Venta estimada por semana* (dropdown)

**Sección "Imágenes del producto por color":**
- Texto: "Sube entre 1 y 20 imágenes. La primera imagen será tu portada..."
- Link: "Ver manual de fotos"
- Zona de drag & drop para subir imágenes
- Nota: "Resolución máxima: 4500 x 3500 px | Peso máximo: 5MB por imagen"

**Botón:** "Guardar 💾"

**Botón final:** "➕ Agregar color"

---

#### Tab 4: Atributos

**Sección "Atributos"** (con toggle "Info. SKU de referencia"):
- Texto: "Revisa los atributos que capturó el proveedor y selecciona [X cantidad] atributos para mostrar en la etiqueta de tienda. Edita los existentes o agrega nuevos si es necesario"

**Tabla de atributos en 2 columnas (proveedor vs comprador):**

| ☐ | Nombre del atributo | Descripción | | Nombre del atributo | Descripción |
|---|-------------------|-------------|---|-------------------|-------------|
| ☐ | Tipo | Carrito de paseo | | Tipo | Carrito de paseo |
| ☐ | Diseño | Carro | | Diseño | Carro |
| ☐ | Material | Plástico | | Material | Plástico |
| ☐ | Requiere baterías | No | | Requiere baterías | No |
| ... | ... | ... | | ... | ... |

- Barra de scroll horizontal (azul)
- Link: "Agregar atributo ➕"

**Botón:** "Guardar 💾"

**Sección "Descripción de etiqueta":**
- Texto: "Define orden de prioridad y ajusta las descripciones por renglón según corresponda"
- **Tabs por color:** Rojo | Color 2 | Color 3
- Botón: "Ver etiqueta 🏷"

**Tabla de etiqueta:**
| Prioridad | ≡ | Atributo | Descripción | Cont. etiqueta (38 caracteres por atributo) |
|-----------|---|----------|-------------|----------------------------------------------|
| 1 | ≡ | Tipo | Carrito de paseo | Tipo Carrito de paseo |
| 2 | ≡ | Diseño | Carro | Diseño Carro |
| ... | | | | |

(Filas reordenables por drag & drop con icono ≡)

**Botón:** "Guardar 💾"

---

#### Tab 5: Datos Logísticos y de Empaque

**Sección "Datos logísticos":**
- Texto: "Consulta la configuración y los centros logísticos asociados a este producto..."

**Sección "Configuración logística":**
- Tipo de excepción de distribución (dropdown): Logística_códigos excepción

**Tabla de centros de distribución:**
| ☐ | Receptor | CEDIS | Frecuencia | Lead time | CEDIS destino |
|---|----------|-------|-----------|-----------|---------------|
| ☑ | CEDIS Coppel Monterrey (MTR) | xxxxxxx | xxxxxxxx | xxxxxxxx | MTY, CULC, HILLO/TGRD/OPC |
| ☑ | CEDIS Coppel Culiacán (CLCN) | xxxxxxx | xxxxxxxx | xxxxxxxx | ... |
| ... | ... | ... | ... | ... | ... |

- Link: "Ir a la configuración logística"

**Botón:** "Guardar 💾"

**Sección "Medidas con empaque individual"** (toggle "Info. SKU de referencia"):
- Unidad de peso* (dropdown)
- Peso* (input)
- Número de piezas* (input con +/-)
- Unidad de medida* (dropdown)
- Alto* (input)
- Frente* (input)
- Fondo* (input)
- Estiba máxima (input)
- Cartón máximo (input)

**Botón:** "Guardar 💾"

**Sección "Empaques del producto":**
- ¿Qué aplica para mi producto?*: Radio (● Cartón master / ○ Bulto)
- Cantidad de uds cartón máster* (input)
- Múltiple cartón máster* (input)
- Unidad de peso* (dropdown)
- Peso* (input)
- ... (mismas medidas que empaque individual)

**Botón:** "Guardar 💾"

**Sección "Entrega y manipulación"** (toggle "Info. SKU de referencia"):
- **Pallet:**
  - ¿La entrega puede ser paletizable?*: Radio (● Sí / ○ No)
  - Unidad de medida* (dropdown)
  - Layout largo* (input)
  - Layout ancho* (input)
- **Acomodo:**
  - ¿El producto puede acomodarse de distintas formas sin afectar calidad?*: Radio (○ Sí / ○ No)

**Botón:** "Guardar 💾"

---

#### Tab 6: Costos y Precio de Venta

**Sección "Costos y precio de venta"** (toggle Info):
- Texto: "Completa la información clave del producto para definir su tipo de marca, estatus y clasificación comercial..."

**Sección "Costo":**
- Costo interior* (input)
- Costo frontera* (input)

**Sección "Impuestos":**
- IVA interior (input): 16%
- IVA frontera (input): 16%

**Sección "Factor de utilidad y margen":**
- Factor nacional (input): 1.31
- Margen marcaje nacional (input): 24%
- Factor importación (input): 1.31
- Margen marcaje importación (input): 24%
- Factor código (input): 1.24
- Margen marcaje código (input): 19%
- **Margen de utilidad:** 47% (calculado)

**Sección "Precio de venta":**
- Precio de venta sugerido (Proveedor): $2,189.00
- Propuesta interior sin redondeo: $1,200.00
- Propuesta interior con redondeo: $2,199.00
- **Precio de venta interior*:** $2,199.00
- (Mismo esquema para frontera)

**Botón:** "Guardar 💾"

**Sección "Costos y márgenes":**

**Sub-sección "Sobreprecio":**
- Concepto (dropdown): Factor logístico
- Porcentaje (input): 2%
- Botón: "Agregar concepto sobreprecio ➕"
- Total: 2%

**Sub-sección "Comisiones y regalías":**
- Concepto (dropdown): Regalías
- Porcentaje (input): 9%
- Botón: "Agregar comisión/regalía ➕"
- Total: 9%

**Sub-sección "Gastos":**
- Concepto (dropdown): Gasto
- Porcentaje* (input): 4%
- Botón: "Agregar gasto ➕"
- Total: 4%

**Botón:** "Guardar 💾"

---

#### Tab 7: Administración de Stock

**Sección "Administración de stock por tamaño de tienda"** (toggle Info):
- Texto: "Haz el método de asignación de stock..."
- **Tabs por color:** Rojo | Color 2 | Color 3

**Tabla "Tamaño y formato de tienda":**
| ☐ | Seleccionar todos | Formato de tienda | EX | GR | ME | CH |
|---|-------------------|-------------------|-----|-----|-----|-----|
| ☑ | Coppel | 233 | 537 | 292 | 123 |
| ☑ | Canadá | 1 | 1 | 0 | 406 |
| ☑ | MiniTienda | 8 | 30 | 15 | 9 |
| ☐ | Digital | 9 | 0 | 0 | 18 |
| ☐ | Coppel Apple | 0 | 1 | 0 | 117 |
| | **Total** | 230 | 556 | 277 | 569 |
| | **Cantidad tiendas** | 100 | 240 | 45 | 245 |
| | **Mínimo de stock** | 1 | 1 | 1 | 1 |

**Botón:** "Guardar 💾"

**Sección "Porcentajes de distribución"** (toggle Info):
- Texto: "Selecciona las bodegas donde se entregará el producto. El porcentaje estadístico debe sumar el 100%..."
- **Tabs por color:** Rojo | Color 2 | Color 3

**Tabla de distribución:**
| ☐ | Seleccionar todos | Bodega | % Estadístico | Tipo de artículo | % Manual* | # Tiendas |
|---|-------------------|--------|--------------|-----------------|-----------|----------|
| ☑ | CLCN | 4.00 | 0 | 5% | | 65 |
| ☑ | LEON | 3.00 | 0 | 2% | | 79 |
| ... | ... | ... | ... | ... | ... | ... |
| | **TOTAL** | 100.00 | 0 | 100% | | 1530 |

**Botón:** "Guardar 💾"

---

#### Tab 8: Configuración

**Sección "Pronósticos":**
- Fecha para descontinuar (date picker)
- Fecha pronóstico (date picker)
- Días venta perdida* (input): 30
- Checkbox: ☑ Calcular venta perdida

**Botón:** "Guardar 💾"

**Sección "Modelo - Color":**
- Texto: "Consulta y configura los datos del modelo y color, así como su disponibilidad y visibilidad en tienda"

**Tabla:**
| SKU | Modelo | Color | ☐ No vender exhibición en tienda | ☐ No exhibir en tienda | ☐ Imprimir etiqueta sin stock ni existencia en tiendas |
|-----|--------|-------|-----|-----|-----|
| 123445 | Push Car Adventure | Rojo | ☑ | ☑ | ☐ |
| 444844 | Push Car Adventure | Azul | ☐ | ☐ | ☐ |

**Botón:** "Guardar 💾"

**Sección "Entrega y etiquetado":**
- Días de espera en tienda* (input)
- Checkbox: ☐ No recoger en tienda (modo entrega R)
- Checkboxes varios:
  - ☑ Imprimir etiqueta de oferta única
  - ☑ Permitir quick response
  - ☐ Etiqueta por existencia
  - ☐ Productos novedoso → Rango de producto novedoso (date range)
  - ☐ Despiezado (surtir agrupado)
  - ☐ No transferible entre bodegas
  - ☐ Repetir exhibición del artículo
- Surtir por múltiplo a tienda* (input)
- Múltiplo para pedidos* (input)

**Botón:** "Guardar 💾"

---

## 4. VISTA PROVEEDOR — Pantallas y Flujos

### 4.1 Home del Proveedor

**Ruta:** `/`
**Breadcrumb:** Inicio

**Estructura:**
- Saludo: "Bienvenido, [Proveedor]" (cursiva)
- **Carousel** de imágenes: "Descubre los beneficios de ser proveedor Coppel"
- **Accesos rápidos** (iconos circulares):
  - 👤 Mi perfil
  - 📦 Catálogos
  - 📋 Mis solicitudes
  - 📄 Documentos

**Sección "Solicitudes":**
- Card: **Nueva solicitud** — "Envía tus propuestas al compra..." → Botón "Enviar solicitud"
- Card: **Historial de solicitudes** — "Verifica el estatus de tus registr..." → Botón "Ver historial"

**Sección "Mi cuenta"** (grid de 3 columnas x 2 filas):
| 👤 Mi perfil | 📍 Direcciones | 🏢 Información de la empresa |
|-------------|-------------|---------------------------|
| "Editar perfil >" | "Administrar direcciones >" | "Configurar perfil comercial >" |
| 🔗 Redes sociales | 📄 Documentos | 📦 Productos y catálogos |
| "Vincular redes >" | "Gestionar documentos >" | "Ver mis productos >" |

### 4.2 Solicitud de Propuestas (vista del proveedor)

**Ruta:** `/mis-solicitudes/solicitudes-de-muestras/{solicitud}`

**Card principal:**
- Título: "Solicitud #243016MP"
- **Especificaciones del comprador** (textarea readonly con el texto que escribió el comprador)
- **Imágenes o referencias del producto solicitado** (galería de thumbnails)
- **Archivos del producto solicitado:**
  - Documento: Manual Mattel → link al PDF
  - Documento: Catálogo Mattel → link al PDF
  - Documento: Mattel prospecto2026 → link al PDF
- **Siguientes pasos:**
  - Texto: "Carga los productos que interesaron al comprador. Si son pocos, hazlo de forma individual... Si son muchos, usa la plantilla de Excel..."
  - Botón: "Carga individual 📥" (outline)
  - Botón: "Carga masiva 📊" (azul filled)

### 4.3 Carga Individual de Propuesta (Proveedor)

**Ruta:** `/mis-solicitudes/historial-de-solicitudes/llenado-de-solicitud`

**Card del producto (acordeón expandible):**
- Nombre del producto como título
- Botón "Editar ✏" en la esquina

**Sección "Información general":**
- Artículo* (input): Wicked - Elphaba
- Tipo de producto* (dropdown): Muñeca
- País de origen (dropdown): China
- Marca* (input): Mattel
- Modelo* (input): 1164823764
- URL de video del producto (input): https://www.youtube.com/watch?v=...
- Imágenes del producto (file input + botón >)
- Comentarios/Características (textarea, 0/500): descripción detallada del producto
- Campos específicos por tipo de producto:
  - Altura de la muñeca: 30 cm
  - Material: Plástico con detalles en tela
  - Accesorios incluidos: Sombrero, capa y escoba

**Sección "Información comercial":**
- Costo* (input): $750.00
- Mínimo de compra* (input): 12 piezas
- Tiempo de entrega* (input): 7 días
- Precio de venta sugerido* (input): $1,039.00
- Precio de promoción (input): $899.00
- Precio de promoción por temporada (input): $859.00
- IVA Interior (dropdown): 16%

**Botones:** "Eliminar propuesta" (outline rojo) | "Guardar 💾" (azul)

### 4.4 Carga Masiva de Propuestas

**Ruta:** `/mis-solicitudes/solicitudes-de-muestras/{solicitud}/carga-masiva`

**Sección "Carga de propuestas":**
- Tipo de producto(s)* (dropdown)
- Botón: "Descargar plantilla 📥"
- Zona drag & drop: "Arrastra y suelta el archivo aquí" / "o" / "Selecciona tus archivos"
- Archivo cargado: nombre + fecha + icono de check
- Botón: "Finalizar >" (azul)

**Tabla de productos cargados:**
| Imagen | Artículo ↕🔽 | Modelo ↕🔽 | Marca ↕🔽 | Material ↕🔽 | Color ↕🔽 | Material ↕🔽 | Link |
|--------|----------|--------|-------|----------|-------|----------|------|
| thumb | Muñeca Wicked | 26491823 | Mattel | Plástico con detalles en tela | Multicolor | Mattel | Ficha técnica |

- Paginación: « < 1 2 3 4 5 ... 10 > »

### 4.5 Ficha Técnica de Propuesta (Vista Individual)

**Ruta:** `/mis-solicitudes/historial-de-solicitudes/ficha-tecnica`

Similar a la carga individual pero en modo solo lectura con botón "Editar" y vista expandida del producto. Incluye la información general y comercial del producto.

### 4.6 Vista Proveedor - Alta de SKU / Información General (Importación)

Formulario similar al del comprador pero con campos propios del proveedor:
- Información general del producto
- Datos por color
- Atributos
- Datos logísticos y de empaque
- Costos y precios de venta

Incluye botones: "Borrar propuesta 🗑" | "Enviar a revisión ✉"

---

## 5. FLUJOS DE TRABAJO (Workflows)

### Flujo 1: Solicitud de Información de SKU's (Comprador → Proveedor)

```
COMPRADOR                              PROVEEDOR
─────────                              ─────────
1. Va a Home > "Propuestas y SKU's"
2. Selecciona proveedor
3. Ve listado de productos
4. Pre-selecciona productos
5. Solicita muestra/información
   (especificaciones + dirección)
        ──── notificación ────►
                                       6. Recibe solicitud en Home
                                       7. Ve especificaciones del comprador
                                       8. Carga productos (individual o masivo)
                                       9. Llena ficha técnica por producto
                                       10. Envía información
        ◄──── notificación ────
11. Revisa propuestas recibidas
12. Evalúa cada producto
13. Marca como "Preseleccionado",
    "En revisión", etc.
```

### Flujo 2: Alta de SKU desde CERO (Comprador)

```
1. Comprador va a "Propuestas en proceso de alta"
2. Click "Nuevo producto +"
3. Modal: Asigna proveedor al SKU
4. Se abre formulario con 8 tabs:
   ┌─────────────────────────────────┐
   │ Tab 1: Información general      │ ← Llenar y Guardar
   │ Tab 2: Estrategia comercial     │ ← Llenar y Guardar
   │ Tab 3: Datos por color          │ ← Llenar y Guardar (genera SKUs)
   │ Tab 4: Atributos                │ ← Revisar/editar y Guardar
   │ Tab 5: Datos logísticos         │ ← Llenar y Guardar
   │ Tab 6: Costos y precio de venta │ ← Llenar y Guardar
   │ Tab 7: Administración de stock  │ ← Asignar distribución y Guardar
   │ Tab 8: Configuración            │ ← Configurar y Guardar
   └─────────────────────────────────┘
5. Cuando TODOS los tabs están completos (●):
   → Se habilita botón "Dar de alta SKU"
6. Confirmación → SKU activo en sistema
```

### Flujo 3: Proveedor envía Propuesta de Producto

```
1. Proveedor va a Home > "Nueva solicitud"
2. Selecciona tipo de producto
3. Opción A: Carga individual
   - Llena formulario con info general + comercial
   - Sube imágenes
   - Guarda propuesta
4. Opción B: Carga masiva
   - Descarga plantilla Excel
   - Llena plantilla offline
   - Sube archivo (drag & drop)
   - Revisa tabla de productos cargados
   - Finaliza carga
5. Revisa todas las propuestas en vista rápida
6. Envía solicitud al comprador
7. Recibe confirmación de envío exitoso
```

### Flujo 4: Complemento de SKU (Proveedor Importación)

```
1. Comprador solicita complemento de información
2. Proveedor recibe notificación
3. Proveedor accede a "Solicitud de complemento SKU"
4. Llena formulario de complemento:
   - Información general
   - Datos por color
   - Atributos
   - Datos logísticos
   - Costos y precios
5. Envía a revisión
6. Comprador recibe y valida
```

### Flujo 5: Prospecto → Proveedor Activo

```
1. Comprador genera invitación (QR o link)
2. Prospecto se registra en el portal
3. Prospecto llena perfil:
   - Información de empresa (Persona Moral/Fabricante)
   - Documentos legales
   - Datos bancarios
   - Direcciones
4. Prospecto envía solicitud de registro
5. Comprador revisa y aprueba
6. Prospecto se convierte en Proveedor activo
7. Proveedor activo puede ahora enviar propuestas de SKU
```

---

## 6. Estatus del Sistema

### Estatus de propuestas (badges):
| Badge | Color | Significado |
|-------|-------|------------|
| Pendiente comprador | 🟠 Naranja | El comprador debe tomar acción |
| Pendiente proveedor | 🟢 Verde | El proveedor debe tomar acción |
| En revisión | 🟢 Verde | Se está evaluando |
| Preseleccionado | 🔵 Azul | El comprador lo marcó como candidato |
| Cotización solicitada | 🟠 Naranja | Se pidió información de precios |
| En proceso de alta | 🔴 Rojo | Se está dando de alta como SKU |
| Listo para evaluar | 🟡 Amarillo | El proveedor completó la información |

---

## 7. Componentes Reutilizables Identificados

1. **Navbar** — Idéntico en ambas vistas (comprador/proveedor)
2. **Footer** — Idéntico en todas las páginas
3. **Breadcrumb** — Navegación jerárquica
4. **Product Header Card** — Card con imagen, datos de clasificación y botones de acción
5. **Tab Navigation** — Navegación horizontal con indicadores de estado
6. **Form Section** — Acordeón con título, icono de info, toggle de referencia y botón guardar
7. **Input fields** — Inputs con label, asterisco para obligatorios, placeholders
8. **Dropdowns/Select** — Con flecha y opciones
9. **Date Picker** — Input con icono de calendario
10. **Drag & Drop Zone** — Para subir archivos/plantillas
11. **Data Table** — Con checkboxes, sorting, filtros y paginación
12. **Product Card (lista)** — Thumbnail + datos + badge de estatus
13. **Badge/Status Chip** — Colores por estatus
14. **Modal** — Overlay con card centrada, título, contenido y botones
15. **Action Cards** — Cards con imagen, título, descripción y botón CTA
16. **Number Input** — Con botones +/- para cantidad
17. **Carousel** — Imágenes con indicadores de puntos y flechas

---

## 8. URLs de Referencia del Figma

Para consultar los diseños originales en detalle:

| Página | URL |
|--------|-----|
| Proveedores y SKU's (principal) | https://www.figma.com/design/gYTM6PwHzQPGycic3kdIE6/SKU-s_SGC?node-id=1-49927&m=dev |
| Alta SKU / Vista Proveedor IMPO | https://www.figma.com/design/gYTM6PwHzQPGycic3kdIE6/SKU-s_SGC?node-id=9987-129846&m=dev |
| Alta SKU desde CERO NAC | https://www.figma.com/design/gYTM6PwHzQPGycic3kdIE6/SKU-s_SGC?node-id=3870-111363&m=dev |
| Alta SKU desde CERO IMPO | https://www.figma.com/design/gYTM6PwHzQPGycic3kdIE6/SKU-s_SGC?node-id=10069-145036&m=dev |
