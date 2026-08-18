/**
 * router.js — Enrutado SPA basado en `location.hash`.
 *
 * Alterna la visibilidad de las 6 vistas sin recargar la página y mantiene
 * sincronizados: el indicador `aria-current="page"` del menú lateral, el
 * <h1>, las migas de pan, el <title> del documento y el anuncio aria-live.
 */

import { qs, qsa, anunciar } from './utilidades.js';
import { cerrarMenus } from './componentes.js';

const RUTAS = new Map([
  ['dashboard', 'Dashboard General'],
  ['usuarios', 'Gestión de Usuarios'],
  ['agentes', 'Gestión de Agentes'],
  ['skills', 'Skills'],
  ['contrataciones', 'Contrataciones de Agentes'],
  ['errores', 'Log de Errores'],
]);

const RUTA_POR_DEFECTO = 'dashboard';

let rutaActual = null;

const rutaDelHash = () => decodeURIComponent(location.hash.replace('#', ''));

/**
 * Muestra una vista y actualiza todos los indicadores asociados.
 * @param {string} id — clave de la ruta
 * @param {{moverFoco?: boolean}} opciones
 */
export function mostrarVista(id, { moverFoco = false } = {}) {
  if (!RUTAS.has(id)) return;

  const titulo = RUTAS.get(id);
  const esCambio = id !== rutaActual;
  rutaActual = id;

  cerrarMenus();

  qsa('main > section[data-vista]').forEach((vista) => {
    vista.hidden = vista.dataset.vista !== id;
  });

  qsa('#navegacion-principal a[data-ruta]').forEach((enlace) => {
    if (enlace.dataset.ruta === id) enlace.setAttribute('aria-current', 'page');
    else enlace.removeAttribute('aria-current');
  });

  qs('#titulo-pagina').textContent = titulo;
  qs('#migas-de-pan [aria-current="page"]').textContent = titulo;
  document.title = `${titulo} — AgentHub`;

  if (moverFoco) {
    // El foco viaja al contenido para que el lector de pantalla comience
    // a leer la nueva vista en lugar de quedarse en el menú lateral.
    qs('#contenido-principal').focus();
    if (esCambio) anunciar(`Sección ${titulo} cargada.`);
  }
}

export function inicializarRouter() {
  const inicial = RUTAS.has(rutaDelHash()) ? rutaDelHash() : RUTA_POR_DEFECTO;
  mostrarVista(inicial);

  window.addEventListener('hashchange', () => {
    const id = rutaDelHash();
    // Los hash ajenos al enrutado (p. ej. los skip links) no cambian la vista.
    if (RUTAS.has(id)) mostrarVista(id, { moverFoco: true });
  });

  // Volver a pulsar el enlace ya activo no dispara `hashchange`:
  // devolvemos el foco al contenido para no dejar al usuario sin respuesta.
  qs('#navegacion-principal').addEventListener('click', (evento) => {
    const enlace = evento.target.closest('a[data-ruta]');
    if (enlace && enlace.dataset.ruta === rutaActual) {
      qs('#contenido-principal').focus();
    }
  });
}
