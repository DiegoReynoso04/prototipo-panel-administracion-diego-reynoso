/**
 * modales.js — Gestión de los <dialog> nativos.
 *
 * `showModal()` ya aporta backdrop, semántica de diálogo modal, inercia del
 * resto de la página y cierre con Escape. Sobre esa base añadimos:
 *   - trampa de foco explícita (Tab / Shift+Tab circulan dentro del diálogo)
 *   - foco inicial controlado mediante `[data-foco-inicial]`
 *   - retorno del foco al elemento que abrió el diálogo, con alternativa
 *     segura si ese elemento ha desaparecido del DOM (p. ej. fila eliminada)
 *   - cierre al hacer clic en el backdrop
 */

import { qs, qsa, focalizables } from './utilidades.js';

/** Elemento que abrió cada diálogo, para restaurar el foco al cerrarlo. */
const disparadores = new WeakMap();

/**
 * Abre un diálogo modal.
 * @param {HTMLDialogElement} dialogo
 * @param {HTMLElement} [disparador] — elemento que recibirá el foco al cerrar
 */
export function abrirModal(dialogo, disparador = document.activeElement) {
  if (!dialogo || dialogo.open) return;
  disparadores.set(dialogo, disparador);
  dialogo.showModal();

  const inicial = qs('[data-foco-inicial]', dialogo) || focalizables(dialogo)[0];
  inicial?.focus();
}

/** Cierra un diálogo abierto. */
export function cerrarModal(dialogo) {
  if (dialogo?.open) dialogo.close();
}

/* ── Trampa de foco ──────────────────────────────────────────────── */

function atraparFoco(evento) {
  if (evento.key !== 'Tab') return;

  const dialogo = evento.currentTarget;
  const elementos = focalizables(dialogo);
  if (!elementos.length) {
    evento.preventDefault();
    return;
  }

  const primero = elementos[0];
  const ultimo = elementos[elementos.length - 1];
  const activo = document.activeElement;

  if (evento.shiftKey && (activo === primero || !dialogo.contains(activo))) {
    evento.preventDefault();
    ultimo.focus();
  } else if (!evento.shiftKey && (activo === ultimo || !dialogo.contains(activo))) {
    evento.preventDefault();
    primero.focus();
  }
}

/* ── Cierre por clic en el backdrop ──────────────────────────────── */

function clicEnBackdrop(evento) {
  const dialogo = evento.currentTarget;
  // Un clic en el contenido tiene como destino un descendiente; solo el
  // backdrop y el propio marco del diálogo apuntan al elemento <dialog>.
  if (evento.target !== dialogo) return;

  const marco = dialogo.getBoundingClientRect();
  const dentro =
    evento.clientX >= marco.left &&
    evento.clientX <= marco.right &&
    evento.clientY >= marco.top &&
    evento.clientY <= marco.bottom;

  if (!dentro) dialogo.close('backdrop');
}

/* ── Retorno del foco ────────────────────────────────────────────── */

function alCerrar(evento) {
  const dialogo = evento.currentTarget;
  const disparador = disparadores.get(dialogo);
  disparadores.delete(dialogo);

  if (disparador?.isConnected) disparador.focus();
  else qs('#contenido-principal')?.focus(); // el origen ya no existe
}

export function inicializarModales() {
  qsa('dialog').forEach((dialogo) => {
    dialogo.addEventListener('keydown', atraparFoco);
    dialogo.addEventListener('click', clicEnBackdrop);
    dialogo.addEventListener('close', alCerrar);
  });
}
