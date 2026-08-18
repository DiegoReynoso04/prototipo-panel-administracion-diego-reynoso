/**
 * barra-lateral.js — Cajón de navegación en móvil.
 *
 * En escritorio (≥ 1024 px) la barra lateral es persistente y este módulo no
 * interviene. Por debajo de ese ancho se comporta como un cajón deslizante:
 *
 *   - `invisible` (visibility: hidden), no solo desplazado fuera de pantalla,
 *     para que sus enlaces no sean alcanzables con el tabulador mientras
 *     está cerrado.
 *   - Trampa de foco mientras está abierto, cierre con Escape, con la
 *     cortina o al elegir una sección, y retorno del foco al disparador.
 */

import { qs, focalizables } from './utilidades.js';

const CONSULTA_ESCRITORIO = '(min-width: 1024px)';

export function inicializarBarraLateral() {
  const boton = qs('#boton-menu');
  const cajon = qs('#barra-lateral');
  const cortina = qs('#fondo-menu');
  const botonCerrar = qs('#cerrar-menu');
  if (!boton || !cajon || !cortina) return;

  let abierto = false;

  const aplicar = (nuevoEstado) => {
    abierto = nuevoEstado;
    cajon.classList.toggle('invisible', !abierto);
    cajon.classList.toggle('-translate-x-full', !abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    cortina.hidden = !abierto;
    // Evita que el contenido de fondo se desplace mientras el cajón está abierto.
    document.body.classList.toggle('overflow-hidden', abierto);
  };

  const abrir = () => {
    aplicar(true);
    focalizables(cajon)[0]?.focus();
  };

  const cerrar = ({ devolverFoco = true } = {}) => {
    if (!abierto) return;
    aplicar(false);
    if (devolverFoco && boton.isConnected) boton.focus();
  };

  const atraparFoco = (evento) => {
    const elementos = focalizables(cajon);
    if (!elementos.length) return;
    const primero = elementos[0];
    const ultimo = elementos[elementos.length - 1];
    const activo = document.activeElement;

    if (evento.shiftKey && (activo === primero || !cajon.contains(activo))) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && (activo === ultimo || !cajon.contains(activo))) {
      evento.preventDefault();
      primero.focus();
    }
  };

  boton.addEventListener('click', () => (abierto ? cerrar() : abrir()));
  botonCerrar?.addEventListener('click', () => cerrar());
  cortina.addEventListener('click', () => cerrar());

  document.addEventListener('keydown', (evento) => {
    if (!abierto) return;
    if (evento.key === 'Escape') cerrar();
    else if (evento.key === 'Tab') atraparFoco(evento);
  });

  // Elegir una sección cierra el cajón; el foco lo gestiona el router,
  // que lo lleva al contenido principal.
  cajon.addEventListener('click', (evento) => {
    if (evento.target.closest('a[data-ruta]')) cerrar({ devolverFoco: false });
  });

  // Al ensanchar hasta escritorio el cajón deja de tener sentido.
  window.matchMedia(CONSULTA_ESCRITORIO).addEventListener('change', (evento) => {
    if (evento.matches) cerrar({ devolverFoco: false });
  });

  aplicar(false);
}
