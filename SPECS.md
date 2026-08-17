# SPECS.md — Documento de Especificaciones Técnicas y Prompt de Desarrollo

## Prompt para la Inteligencia Artificial

---

### 1. Rol y Descripción del Producto
Eres un **Desarrollador Fullstack Senior** especializado en frontend, accesibilidad web avanzada (A11y) y arquitectura de interfaces de usuario modernas, accesibles y responsivas. Tu objetivo es construir un prototipo interactivo y profesional para el panel de administración de **AgentHub** siguiendo al pie de la letra todas las especificaciones estéticas, funcionales, de arquitectura y de accesibilidad.

#### Descripción del Producto
- **¿Qué es AgentHub?**: Es una plataforma SaaS de orquestación y gestión de agentes de inteligencia artificial autónomos. Permite a las empresas alquilar, configurar y monitorear agentes especializados equipados con diferentes habilidades (*skills*).
- **¿Quién es el Usuario Administrador?**: Es el personal técnico u operacional encargado de supervisar el estado global de la plataforma, gestionar las cuentas de clientes/usuarios, configurar prompts del sistema, revisar el catálogo e impacto monetario de las skills, auditar contratos de alquiler y resolver errores de ejecución de los agentes en tiempo real.

---

### 2. Stack Tecnológico y Restricciones
- **HTML**: HTML5 semántico puro (`<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<article>`, `<table>`, `<thead>`, `<tbody>`, `<footer>`, `<dialog>`).
- **Estilos**: Tailwind CSS únicamente vía CDN script (`<script src="https://cdn.tailwindcss.com"></script>`). Se deben utilizar las utilidades nativas de Tailwind (incluyendo variantes `dark:`).
- **JavaScript**: JavaScript Vanilla (ES6+) moderno y modular sin frameworks ni librerías externas (no React, no Vue, no jQuery, no Alpine.js).
- **Backend / Datos**: Sin backend ni conexiones a API externa. Todos los datos, estados iniciales y registros deben estar completamente **hardcodeados** en el cliente.
- **Restricciones de Código**: Sin archivos CSS personalizados ni atributos `style` en línea. Separación clara de responsabilidades entre el marcado semántico HTML y el comportamiento interactivo JS.

---

### 3. Accesibilidad Web (WCAG 2.2 Nivel AAA)
Crea esta aplicación siguiendo **WCAG 2.2 Nivel AAA**. Cumple todos los criterios aplicables de los niveles A, AA y AAA, priorizando:
- **HTML Semántico**: Uso riguroso de marcas semánticas nativas antes de recurrir a atributos ARIA.
- **Navegación completa por teclado**: Todos los elementos interactivos (botones, enlaces, modales, menús desplegables, controles expandibles) deben ser completamente operables mediante teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, flechas direccionales) con orden de foco lógico.
- **Foco visible**: Indicadores de foco de alto contraste y claramente visibles en todos los elementos interactivos.
- **Soporte para Lectores de Pantalla**: Nombres accesibles claros, roles apropiados, gestión del estado con atributos ARIA adecuados (`aria-expanded`, `aria-hidden`, `aria-modal`, `aria-live`, etc.) y atajos de salto (*skip links*).
- **Contraste de Color de Nivel AAA**: Ratios de contraste elevados (mínimo 7:1 para texto normal y 4.5:1 para texto grande) tanto en modo claro como en modo oscuro.
- **Formularios Accesibles**: Etiquetas vinculadas explícitamente (`<label for="...">`), instrucciones asociadas y mensajes de error comprensibles con `aria-describedby` o `aria-invalid`.
- **Subtítulos y Transcripciones**: Alternativas textuales completas para cualquier elemento multimedia o visual abstracto.
- **Lenguaje Claro y Comprensible**: Etiquetas, opciones de menú e instrucciones redactadas de forma sencilla y directa.
- **Ausencia de Destellos**: Garantizar que ningún elemento parpadee o destelle más de 3 veces por segundo para evitar ataques fotosensibles.
- **Reducción de Movimiento**: Respetar las preferencias del sistema mediante `prefers-reduced-motion` reduciendo o desactivando animaciones y transiciones.
- **Alternativas a Gestos y Arrastrar**: Todas las acciones deben ser ejecutables con clics o pulsaciones simples.
- **Uso de ARIA**: Usa ARIA solo cuando sea estrictamente necesario y cuando el HTML semántico nativo no sea suficiente.
- **Pruebas y Auditoría**:
  - Incluye guía o scripts de pruebas automáticas con **axe-core** y **Lighthouse**.
  - Detalla pruebas manuales con navegación por teclado y lectores de pantalla (e.g. NVDA, JAWS, VoiceOver).
  - Incluye una **auditoría final** en la documentación que indique qué criterios de WCAG 2.2 se cumplen, cuáles no y por qué. No declares conformidad AAA sin pruebas.

---

### 4. Inventario de Componentes UI Reutilizables
1. **Sidebar (`<aside>`)**: Navegación lateral persistente con marca, enlaces con iconos y gestión visual/accesible de estado activo (`aria-current="page"`).
2. **Toggle de Modo Oscuro**: Switch/botón interactivo en el header que alterna la clase `dark` en el elemento `<html>` y preserva la preferencia del usuario.
3. **Tarjeta de Métrica (Metric Card)**: Contenedor visual reutilizable compuesto por icono descriptivo, título/etiqueta y valor destacado hardcodeado.
4. **Dropdown de Acciones (Botón ⋮)**: Menú desplegable flotante relativo activado por un botón `⋮` con opciones contextuales. Se cierra al hacer clic fuera (*click outside*) o al presionar `Escape`.
5. **Modal Overlay**: Diálogo emergente sobrepuesto con backdrop oscuro, trampa de foco (*focus trap*), encabezado, cuerpo de contenido y acciones de cierre (`✕`, botón explícito, clic en backdrop o `Escape`).
6. **Badge de Estado**: Indicador de etiqueta compacta con código de color de alto contraste para representar estados (e.g., Activo, Inactivo, Fallando, Resuelto, Niveles de Error).
7. **Lista de Skills Colapsable**: Contenedor acordeón/desplegable con botón de control interactivo que conmuta el estado de visibilidad (`aria-expanded`) mediante animaciones o transiciones suaves.

---

### 5. Especificaciones Detalladas por Sección (Mínimo 3 specs por sección)

#### 5.1. Dashboard
- **Componente: Tarjetas de Métricas (Metric Cards)**
  - *Contenido*: 4 tarjetas organizadas en una cuadrícula (`<section>`) con icono decorativo (`aria-hidden="true"`), etiqueta y valor hardcodeado: (1) Ingresos Totales Generados: `$48,250.00`, (2) Pérdida Total por Descuentos: `$3,120.00`, (3) Agentes Activos: `124`, (4) Agentes Fallando: `3`.
  - *Comportamiento*: Diseño responsive adaptable; en modo oscuro cambia el fondo y mantiene ratios de contraste AAA.
- **Componente: Marcador de Gráfico de Actividad**
  - *Contenido*: Contenedor visual de ancho completo situado debajo de las tarjetas que representa el área del gráfico de actividad semanal.
  - *Comportamiento*: Incluye una descripción o alternativa textual en atributos/elementos accesibles para lectores de pantalla.
- **Componente: Header & Migas de Pan del Dashboard**
  - *Contenido*: Encabezado superior con el título "Dashboard General" e indicador del estado de salud de la plataforma.
  - *Comportamiento*: Permite acceso rápido mediante atajo de salto (*skip link*) al contenido principal del dashboard.

#### 5.2. Gestión de Usuarios
- **Componente: Tabla de Usuarios (`<table>`)**
  - *Contenido*: Tabla con al menos 5 filas hardcodeadas. Columnas: Nombre, Email, Plan (e.g. Pro, Enterprise, Basic) y Badge de Estado (e.g. Activo, Inactivo, Suspendido).
  - *Comportamiento*: Fila enfocable por teclado con contraste visual en cada celda.
- **Componente: Dropdown de Acciones por Usuario**
  - *Contenido*: Botón `⋮` en cada fila que despliega un menú con las opciones "Ver detalle" y "Eliminar".
  - *Comportamiento*: Al hacer clic o presionar `Enter/Space`, abre el menú. Se cierra al seleccionar una opción, presionar `Escape` o hacer clic fuera del menú.
- **Componente: Modal de Registro Completo de Usuario**
  - *Contenido*: Modal de overlay que muestra los detalles extendidos del usuario (ID, fecha de alta, nivel de uso, dirección de facturación).
  - *Comportamiento*: Se activa al seleccionar "Ver detalle". Retiene el foco dentro del modal (*focus trap*) y devuelve el foco al botón disparador al cerrarse.

#### 5.3. Gestión de Agentes
- **Componente: Listado de Agentes**
  - *Contenido*: Estructura de tarjetas o filas (`<section>`) con al menos 4 agentes. Campos: Nombre del agente, Propietario (Cliente/Usuario) y Badge de estado (Activo / Inactivo / Fallando).
  - *Comportamiento*: Cambia dinámicamente de apariencia según el estado del agente (e.g., borde rojo de alerta para agentes fallando).
- **Componente: Desplegable Colapsable de Skills por Agente**
  - *Contenido*: Sublista de skills asociadas al agente que permanece oculta por defecto y botón disparador ("Ver skills").
  - *Comportamiento*: Al pulsar el botón, conmuta el atributo `aria-expanded` y expanda/colapsa la lista con una transición suave (respetando `prefers-reduced-motion`).
- **Componente: Modal de Configuración de System Prompt**
  - *Contenido*: Modal de overlay con el prompt del sistema del agente dentro de un área de texto editable (`<textarea>`) etiquetada explícitamente.
  - *Comportamiento*: Se activa mediante la opción "Configurar" del dropdown `⋮`. Permite editar el texto hardcodeado y guardar/cerrar de forma accesible.

#### 5.4. Skills
- **Componente: Panel Informativo Explicativo**
  - *Contenido*: Bloque destacado que explica qué es una "skill" en AgentHub (capacidades o herramientas modulares asignables a los agentes).
  - *Comportamiento*: Bloque de lectura accesible con encabezado H3 e icono temático.
- **Componente: Catálogo de Cards de Skills**
  - *Contenido*: Grid con al menos 4 skills. Cada card incluye: Nombre, Descripción breve e Indicador numérico de agentes que la tienen activa.
  - *Comportamiento*: Las tarjetas destacan visualmente al recibir foco por teclado o hovering.
- **Componente: Dropdown de Acciones de Skill**
  - *Contenido*: Menú `⋮` en cada tarjeta de skill con opciones "Ver detalle" y "Eliminar".
  - *Comportamiento*: Funcionalidad estándar de dropdown accesible con cierre por `Escape` o clic fuera.

#### 5.5. Contrataciones de Agentes
- **Componente: Tabla de Contratos de Alquiler**
  - *Contenido*: Tabla (`<table>`) con al menos 4 filas. Columnas: Cliente, Agente alquilado, Skills contratadas, Fechas de inicio/fin e Importe total pagado.
  - *Comportamiento*: Encabezados de tabla (`<th>`) configurados correctamente para lectura ordenada en lector de pantalla.
- **Componente: Dropdown de Acciones de Contrato**
  - *Contenido*: Menú `⋮` en cada fila con la opción "Ver detalle".
  - *Comportamiento*: Apertura fluida sin alterar el flujo visual del resto de la tabla.
- **Componente: Modal de Desglose de Contrato**
  - *Contenido*: Modal de overlay con el desglose detallado del contrato: lista de skills contratadas con sus precios individuales, impuestos y método de pago.
  - *Comportamiento*: Apertura desde "Ver detalle" con cierre por botón `✕`, backdrop o `Escape`.

#### 5.6. Log de Errores
- **Componente: Registro de Entradas de Error**
  - *Contenido*: Listado o tabla con al menos 6 entradas de error hardcodeadas. Campos: Timestamp, Nombre del agente, Badge de tipo/gravedad (Crítico, Advertencia, Timeout) y Descripción corta.
  - *Comportamiento*: Badges con códigos de color de alto contraste (rojo, amarillo, naranja).
- **Componente: Modal de Traza Completa de Error**
  - *Contenido*: Modal de overlay con el detalle técnico completo del error (*stack trace*) y el contexto de ejecución del agente.
  - *Comportamiento*: Se abre al hacer clic en "Ver detalle" desde el dropdown de la entrada.
- **Componente: Acción "Marcar como Resuelto"**
  - *Contenido*: Opción interactiva dentro del dropdown `⋮` de cada error.
  - *Comportamiento*: Cambia visualmente el badge de la entrada a "Resuelto" (verde de alto contraste) y anuncia la actualización a lectores de pantalla mediante `aria-live`.

---

### 6. Criterios de Aceptación (Condiciones Verificables)
1. **[Navegación SPA / Sidebar]**: Al hacer clic en cualquiera de los 6 enlaces de la barra lateral (`<aside>`), el contenido de la sección seleccionada debe mostrarse sin recargar la página, actualizando el indicador visual de activo y el atributo `aria-current="page"`.
2. **[Modo Oscuro]**: El toggle de modo claro/oscuro en la barra superior debe alternar la clase `dark` en el elemento `<html>`, cambiando la paleta de colores de todo el panel y conservando la preferencia durante la navegación entre secciones.
3. **[Interacción Dropdown]**: Todos los menús desplegables (`⋮`) deben abrirse al ser activados y cerrarse automáticamente si el usuario hace clic fuera de su área o presiona la tecla `Escape`.
4. **[Interacción Modal y Focus Trap]**: Al seleccionar "Ver detalle" o "Configurar", el modal correspondiente debe abrirse sobre un backdrop translúcido; el foco del teclado debe ser atrapado dentro del modal mientras permanezca abierto, y cerrarse correctamente al hacer clic en el backdrop, pulsar el botón de cierre `✕` o presionar `Escape`.
5. **[Interacción Colapsable de Skills]**: En la sección *Gestión de Agentes*, pulsar el control expandible de un agente debe mostrar u ocultar la lista de skills asociadas mediante una transición suave, conmutando el atributo `aria-expanded` entre `true` y `false`.
6. **[Resolución de Errores]**: En la sección *Log de Errores*, seleccionar la opción "Marcar como resuelto" debe cambiar el badge de gravedad a estado "Resuelto" con notificación accesible vía `aria-live`.
7. **[Accesibilidad por Teclado]**: Toda la interfaz debe ser completamente navegable y operable utilizando únicamente el teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`), mostrando un indicador de foco visible de alto contraste en todo momento.
8. **[Pruebas y Auditoría AAA]**: El prototipo debe superar las auditorías automáticas con **axe-core** y **Lighthouse** (0 errores de accesibilidad) e incluir en su documentación una auditoría final justificando el cumplimiento de los criterios aplicables de WCAG 2.2 Nivel AAA.