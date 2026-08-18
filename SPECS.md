# SPECS.md — Documento de Especificaciones Técnicas

---

### 1. Rol y Descripción del Producto
Plataforma SaaS de orquestación y gestión de agentes de inteligencia artificial autónomos. Permite a las empresas alquilar, configurar y monitorear agentes especializados equipados con diferentes habilidades (*skills*).
- **Usuario Administrador**: Personal técnico u operacional encargado de supervisar el estado global de la plataforma, gestionar las cuentas de clientes/usuarios, configurar prompts del sistema, revisar el catálogo e impacto monetario de las skills, auditar contratos de alquiler y resolver errores de ejecución de los agentes en tiempo real.

---

### 2. Stack Tecnológico y Restricciones
- **HTML**: HTML5 semántico puro (`<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<article>`, `<table>`, `<thead>`, `<tbody>`, `<footer>`, `<dialog>`).
- **Estilos**: Tailwind CSS únicamente vía CDN script (`<script src="https://cdn.tailwindcss.com"></script>`). Se deben utilizar las utilidades nativas de Tailwind (incluyendo variantes `dark:`).
- **JavaScript**: JavaScript Vanilla (ES6+) moderno y modular sin frameworks ni librerías externas (no React, no Vue, no jQuery, no Alpine.js).
- **Backend / Datos**: Sin backend ni conexiones a API externa. Todos los datos, estados iniciales y registros deben estar completamente **hardcodeados** en el cliente.
- **Restricciones de Código**: Sin archivos CSS personalizados ni atributos `style` en línea. Separación clara de responsabilidades entre el marcado semántico HTML y el comportamiento interactivo JS.

---

### 3. Criterios de Accesibilidad Web (WCAG 2.2 Nivel AAA)
- **HTML Semántico**: Uso de marcas semánticas nativas.
- **Navegación completa por teclado**: Operable mediante teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, flechas direccionales) con orden de foco lógico.
- **Foco visible**: Indicadores de foco de alto contraste y claramente visibles en todos los elementos interactivos.
- **Soporte para Lectores de Pantalla**: Nombres accesibles claros, roles apropiados, gestión del estado con atributos ARIA adecuados (`aria-expanded`, `aria-hidden`, `aria-modal`, `aria-live`, etc.) y atajos de salto (*skip links*).
- **Contraste de Color de Nivel AAA**: Mínimo 7:1 para texto normal y 4.5:1 para texto grande en modo claro y oscuro.
- **Formularios Accesibles**: Etiquetas vinculadas explícitamente (`<label for="...">`), instrucciones asociadas y mensajes de error con `aria-describedby` o `aria-invalid`.
- **Reducción de Movimiento**: Respetar las preferencias del sistema mediante `prefers-reduced-motion`.
- **Uso de ARIA**: Solo cuando sea estrictamente necesario y cuando el HTML semántico nativo no sea suficiente.

---

### 4. Inventario de Componentes UI Reutilizables
1. **Sidebar (`<aside>`)**: Navegación lateral persistente con marca, enlaces con iconos y gestión accesible de estado activo (`aria-current="page"`).
2. **Toggle de Modo Oscuro**: Botón interactivo en el header que alterna la clase `dark` en el elemento `<html>` y preserva la preferencia.
3. **Tarjeta de Métrica (Metric Card)**: Contenedor visual reutilizable compuesto por icono descriptivo, título/etiqueta y valor destacado hardcodeado.
4. **Dropdown de Acciones (Botón ⋮)**: Menú desplegable flotante relativo activado por botón `⋮` con opciones contextuales. Se cierra al hacer clic fuera o pulsar `Escape`.
5. **Modal Overlay**: Diálogo emergente sobrepuesto con backdrop oscuro, trampa de foco (*focus trap*), encabezado, cuerpo de contenido y acciones de cierre (`✕`, botón explícito, clic en backdrop o `Escape`).
6. **Badge de Estado**: Indicador de etiqueta compacta con código de color de alto contraste para representar estados.
7. **Lista de Skills Colapsable**: Contenedor acordeón/desplegable con botón de control interactivo que conmuta el estado de visibilidad (`aria-expanded`).

---

### 5. Especificaciones Detalladas por Sección

#### 5.1. Dashboard
- **Tarjetas de Métricas**: 4 tarjetas (`<section>`) con icono decorativo (`aria-hidden="true"`), etiqueta y valores hardcodeados: Ingresos Totales (`$48,250.00`), Pérdida por Descuentos (`$3,120.00`), Agentes Activos (`124`), Agentes Fallando (`3`).
- **Marcador de Gráfico de Actividad**: Contenedor visual de ancho completo que representa el gráfico de actividad semanal con descripción o alternativa textual para lectores de pantalla.
- **Header & Migas de Pan**: Encabezado superior con título "Dashboard General", indicador de salud de la plataforma y atajo de salto (*skip link*).

#### 5.2. Gestión de Usuarios
- **Tabla de Usuarios (`<table>`)**: Tabla con al menos 5 filas hardcodeadas. Columnas: Nombre, Email, Plan y Badge de Estado.
- **Dropdown de Acciones por Usuario**: Botón `⋮` en cada fila con las opciones "Ver detalle" y "Eliminar".
- **Modal de Registro Completo de Usuario**: Modal overlay con detalles extendidos (ID, fecha de alta, nivel de uso, dirección de facturación). Se activa al seleccionar "Ver detalle".

#### 5.3. Gestión de Agentes
- **Listado de Agentes**: Tarjetas o filas (`<section>`) con al menos 4 agentes. Campos: Nombre del agente, Propietario y Badge de estado (Activo / Inactivo / Fallando).
- **Desplegable Colapsable de Skills por Agente**: Sublista de skills asociadas al agente oculta por defecto y botón disparador ("Ver skills") que conmuta `aria-expanded`.
- **Modal de Configuración de System Prompt**: Modal overlay con el prompt del sistema dentro de un área de texto editable (`<textarea>`) etiquetada explícitamente. Se activa mediante la opción "Configurar" del dropdown `⋮`.

#### 5.4. Skills
- **Panel Informativo Explicativo**: Bloque destacado que explica qué es una "skill" en AgentHub.
- **Catálogo de Cards de Skills**: Grid con al menos 4 skills (Nombre, Descripción breve e Indicador numérico de agentes activos).
- **Dropdown de Acciones de Skill**: Menú `⋮` en cada tarjeta con opciones "Ver detalle" y "Eliminar".

#### 5.5. Contrataciones de Agentes
- **Tabla de Contratos de Alquiler**: Tabla (`<table>`) con al menos 4 filas. Columnas: Cliente, Agente alquilado, Skills contratadas, Fechas de inicio/fin e Importe total pagado.
- **Dropdown de Acciones de Contrato**: Menú `⋮` en cada fila con la opción "Ver detalle".
- **Modal de Desglose de Contrato**: Modal overlay con el desglose detallado del contrato (skills contratadas, precios individuales, impuestos y método de pago).

#### 5.6. Log de Errores
- **Registro de Entradas de Error**: Listado o tabla con al menos 6 entradas hardcodeadas (Timestamp, Nombre del agente, Badge de tipo/gravedad y Descripción corta).
- **Modal de Traza Completa de Error**: Modal overlay con el detalle técnico completo del error (*stack trace*) y el contexto de ejecución del agente.
- **Acción "Marcar como Resuelto"**: Opción interactiva en el dropdown `⋮` que cambia visualmente el badge a "Resuelto" y lo anuncia a lectores de pantalla vía `aria-live`.

---

### 6. Criterios de Aceptación (Condiciones Verificables)
1. **[Navegación SPA / Sidebar]**: Al hacer clic en cualquiera de los 6 enlaces de la barra lateral (`<aside>`), el contenido de la sección seleccionada se muestra sin recargar la página, actualizando el indicador visual de activo y el atributo `aria-current="page"`.
2. **[Modo Oscuro]**: El toggle de modo claro/oscuro alterna la clase `dark` en el elemento `<html>`, cambiando la paleta de colores de todo el panel y conservando la preferencia durante la navegación.
3. **[Interacción Dropdown]**: Todos los menús desplegables (`⋮`) se abren al ser activados y se cierran al hacer clic fuera o presionar `Escape`.
4. **[Interacción Modal y Focus Trap]**: Al abrir un modal, el foco del teclado queda atrapado dentro y se restaura al cerrar (vía backdrop, botón `✕` o `Escape`).
5. **[Interacción Colapsable de Skills]**: El control expandible de skills conmuta el atributo `aria-expanded` entre `true` y `false`.
6. **[Resolución de Errores]**: "Marcar como resuelto" cambia el badge a "Resuelto" con notificación accesible vía `aria-live`.
7. **[Accesibilidad por Teclado]**: Toda la interfaz es completamente navegable y operable utilizando únicamente el teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`) con foco visible de alto contraste.
8. **[Pruebas y Auditoría AAA]**: Supera las auditorías automáticas con **axe-core** y **Lighthouse** (0 errores de accesibilidad) cumpliendo los criterios de WCAG 2.2 Nivel AAA.