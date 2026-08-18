/**
 * tema.js — Modo claro / oscuro.
 *
 * La clase `dark` se aplica sobre <html> (estrategia `darkMode: 'class'`
 * de Tailwind). La preferencia se conserva en localStorage y, si no hay
 * ninguna guardada, se respeta `prefers-color-scheme` del sistema.
 *
 * Nota: un script en línea del <head> aplica la clase antes del primer
 * pintado para evitar el parpadeo de tema (FOUC). Este módulo solo
 * sincroniza el botón y gestiona los cambios posteriores.
 */

import { qs, anunciar } from './utilidades.js';

export const CLAVE_TEMA = 'agenthub:tema';

const leerPreferencia = () => {
  try {
    return localStorage.getItem(CLAVE_TEMA);
  } catch {
    return null; // modo privado o almacenamiento bloqueado
  }
};

const guardarPreferencia = (valor) => {
  try {
    localStorage.setItem(CLAVE_TEMA, valor);
  } catch {
    /* la preferencia no persistirá, pero la sesión sigue siendo usable */
  }
};

export function inicializarTema() {
  const boton = qs('#toggle-tema');
  const etiqueta = qs('#etiqueta-tema');
  if (!boton || !etiqueta) return;

  const aplicar = (oscuro, { anunciarCambio = false } = {}) => {
    document.documentElement.classList.toggle('dark', oscuro);
    boton.setAttribute('aria-pressed', String(oscuro));
    etiqueta.textContent = oscuro ? 'Desactivar modo oscuro' : 'Activar modo oscuro';
    if (anunciarCambio) {
      anunciar(oscuro ? 'Modo oscuro activado.' : 'Modo claro activado.');
    }
  };

  // Sincroniza el botón con el estado que dejó el script del <head>.
  aplicar(document.documentElement.classList.contains('dark'));

  boton.addEventListener('click', () => {
    const oscuro = !document.documentElement.classList.contains('dark');
    guardarPreferencia(oscuro ? 'oscuro' : 'claro');
    aplicar(oscuro, { anunciarCambio: true });
  });

  // Si el usuario no ha fijado preferencia propia, seguimos al sistema.
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (evento) => {
      if (!leerPreferencia()) aplicar(evento.matches);
    });
}
