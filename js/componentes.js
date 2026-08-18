/**
 * componentes.js — Dropdown de acciones (⋮) y lista de skills colapsable.
 *
 * Ambos componentes se gestionan por delegación de eventos en `document`,
 * de modo que el marcado clonado desde las plantillas funciona sin
 * necesidad de volver a registrar listeners tras cada render.
 *
 * Patrón del dropdown: botón de menú (WAI-ARIA «menu button»).
 *   - `aria-haspopup="true"` + `aria-expanded` + `aria-controls`
 *   - Flechas ↑/↓, Inicio y Fin recorren las opciones
 *   - Escape cierra y devuelve el foco al botón; Tab y el clic fuera cierran
 */

import { qs, qsa, nuevoId, focalizables } from './utilidades.js';

/* ── Preparación del marcado clonado ─────────────────────────────── */

/**
 * Asigna identificadores y relaciones ARIA a los componentes interactivos
 * contenidos en un nodo recién clonado de una plantilla.
 * @param {ParentNode} raiz
 */
export function prepararInteractivos(raiz) {
  qsa('[data-componente="dropdown"]', raiz).forEach((contenedor) => {
    const boton = qs('[data-disparador="dropdown"]', contenedor);
    const menu = qs('[data-menu]', contenedor);
    if (!boton || !menu) return;
    menu.id ||= nuevoId('menu');
    boton.setAttribute('aria-controls', menu.id);
    boton.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  });

  qsa('[data-disparador="colapsable"]', raiz).forEach((boton) => {
    const panel = boton.nextElementSibling;
    if (!panel) return;
    panel.id ||= nuevoId('panel');
    boton.setAttribute('aria-controls', panel.id);
    boton.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
  });
}

/* ── Dropdown de acciones ────────────────────────────────────────── */

const menuDe = (boton) => document.getElementById(boton.getAttribute('aria-controls'));

const estaAbierto = (boton) => boton.getAttribute('aria-expanded') === 'true';

function abrirMenu(boton, { focoEn = 'primero' } = {}) {
  cerrarMenus(boton);
  const menu = menuDe(boton);
  if (!menu) return;
  boton.setAttribute('aria-expanded', 'true');
  menu.hidden = false;
  const opciones = focalizables(menu);
  if (!opciones.length) return;
  (focoEn === 'ultimo' ? opciones[opciones.length - 1] : opciones[0]).focus();
}

function cerrarMenu(boton, { devolverFoco = false } = {}) {
  const menu = menuDe(boton);
  boton.setAttribute('aria-expanded', 'false');
  if (menu) menu.hidden = true;
  if (devolverFoco && boton.isConnected) boton.focus();
}

/**
 * Cierra todos los menús abiertos.
 * @param {HTMLElement|null} excepto — botón cuyo menú debe permanecer abierto
 */
export function cerrarMenus(excepto = null) {
  qsa('[data-disparador="dropdown"][aria-expanded="true"]').forEach((boton) => {
    if (boton !== excepto) cerrarMenu(boton);
  });
}

/* ── Lista de skills colapsable ──────────────────────────────────── */

function alternarColapsable(boton) {
  const panel = document.getElementById(boton.getAttribute('aria-controls'));
  if (!panel) return;
  const expandido = estaAbierto(boton);
  boton.setAttribute('aria-expanded', String(!expandido));
  panel.hidden = expandido;
  const texto = qs('[data-texto]', boton);
  if (texto) texto.textContent = expandido ? 'Ver skills' : 'Ocultar skills';
}

/* ── Delegación de eventos ───────────────────────────────────────── */

function gestionarClic(evento) {
  const disparadorMenu = evento.target.closest('[data-disparador="dropdown"]');
  if (disparadorMenu) {
    if (estaAbierto(disparadorMenu)) cerrarMenu(disparadorMenu, { devolverFoco: true });
    else abrirMenu(disparadorMenu);
    return;
  }

  const disparadorColapsable = evento.target.closest('[data-disparador="colapsable"]');
  if (disparadorColapsable) {
    alternarColapsable(disparadorColapsable);
    return;
  }

  // Clic fuera de cualquier dropdown: se cierran todos.
  if (!evento.target.closest('[data-componente="dropdown"]')) cerrarMenus();
}

function gestionarTeclado(evento) {
  const { key } = evento;

  const disparadorMenu = evento.target.closest('[data-disparador="dropdown"]');
  if (disparadorMenu && (key === 'ArrowDown' || key === 'ArrowUp')) {
    evento.preventDefault();
    abrirMenu(disparadorMenu, { focoEn: key === 'ArrowUp' ? 'ultimo' : 'primero' });
    return;
  }

  const menu = evento.target.closest('[data-menu]');
  if (!menu) return;

  const boton = qs(`[data-disparador="dropdown"][aria-controls="${menu.id}"]`);
  if (!boton) return;
  const opciones = focalizables(menu);
  const indice = opciones.indexOf(document.activeElement);

  switch (key) {
    case 'Escape':
      evento.preventDefault();
      cerrarMenu(boton, { devolverFoco: true });
      break;
    case 'ArrowDown':
      evento.preventDefault();
      opciones[(indice + 1) % opciones.length]?.focus();
      break;
    case 'ArrowUp':
      evento.preventDefault();
      opciones[(indice - 1 + opciones.length) % opciones.length]?.focus();
      break;
    case 'Home':
      evento.preventDefault();
      opciones[0]?.focus();
      break;
    case 'End':
      evento.preventDefault();
      opciones[opciones.length - 1]?.focus();
      break;
    case 'Tab':
      // Tabular fuera del menú lo cierra sin secuestrar el orden de foco.
      cerrarMenu(boton);
      break;
    default:
      break;
  }
}

export function inicializarComponentes() {
  document.addEventListener('click', gestionarClic);
  document.addEventListener('keydown', gestionarTeclado);

  // Escape con el foco en cualquier punto de la página cierra los menús.
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && !evento.target.closest('[data-menu]')) cerrarMenus();
  });
}
