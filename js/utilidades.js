/**
 * utilidades.js — Ayudantes transversales de DOM, formato y accesibilidad.
 */

/* ── Selección de elementos ──────────────────────────────────────── */

export const qs = (selector, contexto = document) => contexto.querySelector(selector);
export const qsa = (selector, contexto = document) => Array.from(contexto.querySelectorAll(selector));

/* ── Identificadores únicos para enlazar aria-controls ───────────── */

let contadorId = 0;
export const nuevoId = (prefijo) => `${prefijo}-${(++contadorId).toString(36)}`;

/* ── Clonado de plantillas ───────────────────────────────────────── */

/**
 * Clona el primer elemento de un <template> y devuelve el nodo resultante.
 * @param {string} selectorPlantilla
 * @returns {HTMLElement}
 */
export function clonar(selectorPlantilla) {
  const plantilla = qs(selectorPlantilla);
  if (!plantilla) throw new Error(`Plantilla no encontrada: ${selectorPlantilla}`);
  return plantilla.content.firstElementChild.cloneNode(true);
}

/* ── Anuncios para lectores de pantalla (región aria-live única) ─── */

let temporizadorAnuncio;

/**
 * Publica un mensaje en la región aria-live global.
 * Se vacía primero y se reescribe en el siguiente tick para que los
 * lectores de pantalla vuelvan a anunciar mensajes idénticos consecutivos.
 * @param {string} mensaje
 */
export function anunciar(mensaje) {
  const region = qs('#anuncios-a11y');
  if (!region) return;
  clearTimeout(temporizadorAnuncio);
  region.textContent = '';
  temporizadorAnuncio = setTimeout(() => {
    region.textContent = mensaje;
  }, 80);
}

/* ── Foco ────────────────────────────────────────────────────────── */

const SELECTOR_FOCALIZABLES = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'summary',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Devuelve los elementos focalizables y visibles dentro de un contenedor.
 * @param {ParentNode} contenedor
 * @returns {HTMLElement[]}
 */
export function focalizables(contenedor) {
  return qsa(SELECTOR_FOCALIZABLES, contenedor).filter(
    (elemento) => !elemento.hasAttribute('hidden') && elemento.getClientRects().length > 0
  );
}

/* ── Formato de datos ────────────────────────────────────────────── */

const MONEDA = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const FECHA_LARGA = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const FECHA_HORA = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

const NUMERO = new Intl.NumberFormat('es-ES');

export const formatearMoneda = (valor) => MONEDA.format(valor);
export const formatearNumero = (valor) => NUMERO.format(valor);
export const formatearFecha = (iso) => FECHA_LARGA.format(new Date(`${iso}T00:00:00`));
export const formatearFechaHora = (iso) => FECHA_HORA.format(new Date(iso));
