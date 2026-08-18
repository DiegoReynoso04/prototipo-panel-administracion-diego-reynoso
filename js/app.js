/**
 * app.js — Punto de entrada de AgentHub.
 *
 * Orquesta el arranque de los módulos en el orden correcto:
 *   1. tema          — sincroniza el toggle con la preferencia ya aplicada
 *   2. barra lateral — cajón de navegación en móvil
 *   3. componentes   — delegación de dropdowns y colapsables
 *   4. modales       — trampa de foco, backdrop y retorno de foco
 *   5. vistas        — render de los datos y acciones de negocio
 *   6. router        — muestra la vista indicada por el hash
 *
 * El router va el último: necesita que las vistas ya estén pobladas para
 * que la sección inicial se muestre completa.
 */

import { inicializarTema } from './tema.js';
import { inicializarBarraLateral } from './barra-lateral.js';
import { inicializarComponentes } from './componentes.js';
import { inicializarModales } from './modales.js';
import { inicializarVistas } from './vistas.js';
import { inicializarRouter } from './router.js';

function arrancar() {
  inicializarTema();
  inicializarBarraLateral();
  inicializarComponentes();
  inicializarModales();
  inicializarVistas();
  inicializarRouter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', arrancar, { once: true });
} else {
  arrancar();
}
