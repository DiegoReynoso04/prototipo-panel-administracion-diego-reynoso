/**
 * vistas.js — Render de las 6 secciones y acciones de negocio.
 *
 * Todo el marcado repetible se genera clonando los <template> del documento
 * y rellenando sus huecos `data-campo`. Las acciones de los menús (⋮) se
 * resuelven por delegación sobre el atributo `data-accion`.
 */

import {
  metricas,
  actividadSemanal,
  usuarios,
  agentes,
  skills,
  contratos,
  errores,
  ESTADOS,
  TIPO_IVA,
} from './datos.js';

import {
  qs,
  qsa,
  clonar,
  anunciar,
  formatearMoneda,
  formatearNumero,
  formatearFecha,
  formatearFechaHora,
} from './utilidades.js';

import { prepararInteractivos, cerrarMenus } from './componentes.js';
import { abrirModal, cerrarModal } from './modales.js';

/* ── Ayudantes comunes ───────────────────────────────────────────── */

const textoEstado = (clave) => ESTADOS[clave] ?? clave;

/** Escribe el texto y el estado semántico de un badge. */
function pintarBadge(badge, clave) {
  if (!badge) return;
  badge.textContent = textoEstado(clave);
  badge.dataset.estado = clave;
}

/** Rellena un hueco `data-campo` de un nodo clonado. */
function campo(nodo, nombre, valor) {
  const destino = qs(`[data-campo="${nombre}"]`, nodo);
  if (destino) destino.textContent = valor;
  return destino;
}

/** Rellena una lista de definiciones `<dl>` dentro de un diálogo. */
const rellenar = (dialogo, valores) => {
  Object.entries(valores).forEach(([nombre, valor]) => campo(dialogo, nombre, valor));
};

/** Suma de las líneas de un contrato, sin impuestos. */
const subtotalContrato = (contrato) =>
  contrato.lineas.reduce((suma, linea) => suma + linea.precio, 0);

const totalContrato = (contrato) => subtotalContrato(contrato) * (1 + TIPO_IVA);

/**
 * Devuelve el botón ⋮ que contiene al elemento indicado y cierra su menú.
 * Se usa para que el foco vuelva a un elemento que seguirá existiendo.
 */
function botonDelMenu(elemento) {
  const contenedor = elemento.closest('[data-componente="dropdown"]');
  const boton = contenedor ? qs('[data-disparador="dropdown"]', contenedor) : null;
  cerrarMenus();
  return boton;
}

/**
 * Deja la opción «Marcar como resuelto» inoperativa pero aún enfocable
 * (`aria-disabled`), para que quien navega con lector de pantalla siga
 * percibiendo la opción y su nuevo estado.
 */
function marcarOpcionResuelta(opcion) {
  if (!opcion) return;
  opcion.setAttribute('aria-disabled', 'true');
  opcion.textContent = 'Ya resuelto';
}

/** Tras eliminar una fila o tarjeta, lleva el foco a un destino razonable. */
function reubicarFoco(contenedor, indice) {
  const botones = qsa('[data-disparador="dropdown"]', contenedor);
  const destino = botones[indice] ?? botones[botones.length - 1];
  if (destino) destino.focus();
  else qs('#contenido-principal').focus();
}

/* ── 5.1 · Dashboard ─────────────────────────────────────────────── */

export function renderDashboard() {
  qs('[data-metrica="ingresos"]').textContent = formatearMoneda(metricas.ingresos);
  qs('[data-metrica="descuentos"]').textContent = formatearMoneda(metricas.descuentos);
  qs('[data-metrica="activos"]').textContent = formatearNumero(metricas.agentesActivos);
  qs('[data-metrica="fallando"]').textContent = formatearNumero(metricas.agentesFallando);

  // Alternativa textual del gráfico, derivada de los propios datos.
  const total = actividadSemanal.reduce((suma, dia) => suma + dia.ejecuciones, 0);
  const ordenados = [...actividadSemanal].sort((a, b) => b.ejecuciones - a.ejecuciones);
  const detalle = actividadSemanal
    .map((dia) => `${dia.dia.toLowerCase()} ${formatearNumero(dia.ejecuciones)}`)
    .join(', ');

  qs('#descripcion-grafico').textContent =
    `Gráfico de barras con las ejecuciones diarias de la última semana: ${detalle}. ` +
    `Total acumulado: ${formatearNumero(total)} ejecuciones. ` +
    `Máximo el ${ordenados[0].dia.toLowerCase()} y mínimo el ` +
    `${ordenados[ordenados.length - 1].dia.toLowerCase()}.`;
}

/* ── 5.2 · Usuarios ──────────────────────────────────────────────── */

function crearFilaUsuario(usuario) {
  const fila = clonar('#tpl-fila-usuario');
  fila.dataset.id = usuario.id;

  campo(fila, 'nombre', usuario.nombre);
  campo(fila, 'email', usuario.email);
  campo(fila, 'plan', usuario.plan);
  campo(fila, 'etiqueta-acciones', `Acciones del usuario ${usuario.nombre}`);
  pintarBadge(qs('[data-componente="badge"]', fila), usuario.estado);

  prepararInteractivos(fila);
  return fila;
}

export function renderUsuarios() {
  qs('#tbody-usuarios').replaceChildren(...usuarios.map(crearFilaUsuario));
}

/* ── 5.3 · Agentes ───────────────────────────────────────────────── */

function crearTarjetaAgente(agente) {
  const item = clonar('#tpl-tarjeta-agente');
  item.dataset.id = agente.id;

  campo(item, 'nombre', agente.nombre);
  campo(item, 'propietario', agente.propietario);
  campo(item, 'etiqueta-acciones', `Acciones del agente ${agente.nombre}`);
  pintarBadge(qs('[data-componente="badge"]', item), agente.estado);

  prepararInteractivos(item);

  // La sublista de skills se rellena tras preparar el colapsable, que es
  // quien le asigna el `id` enlazado desde `aria-controls`.
  const panel = qs('[data-panel="skills"]', item);
  panel.replaceChildren(
    ...agente.skills.map((nombre) => {
      const li = document.createElement('li');
      li.textContent = nombre;
      return li;
    })
  );

  // Nombre accesible del colapsable: «Ver skills de Atlas Research».
  // El texto visible («Ver skills») queda contenido en él, como exige
  // el criterio WCAG 2.5.3 «La etiqueta está en el nombre».
  campo(item, 'skills-de', `de ${agente.nombre}`);

  return item;
}

export function renderAgentes() {
  qs('#lista-agentes').replaceChildren(...agentes.map(crearTarjetaAgente));
}

/* ── 5.4 · Skills ────────────────────────────────────────────────── */

function crearTarjetaSkill(skill) {
  const item = clonar('#tpl-tarjeta-skill');
  item.dataset.id = skill.id;

  campo(item, 'nombre', skill.nombre);
  campo(item, 'descripcion', skill.descripcion);
  campo(item, 'agentes', formatearNumero(skill.agentesActivos));
  campo(item, 'etiqueta-acciones', `Acciones de la skill ${skill.nombre}`);

  prepararInteractivos(item);
  return item;
}

export function renderSkills() {
  qs('#catalogo-skills').replaceChildren(...skills.map(crearTarjetaSkill));
}

/* ── 5.5 · Contrataciones ────────────────────────────────────────── */

function crearFilaContrato(contrato) {
  const fila = clonar('#tpl-fila-contrato');
  fila.dataset.id = contrato.id;

  campo(fila, 'cliente', contrato.cliente);
  campo(fila, 'agente', contrato.agente);
  campo(fila, 'skills', contrato.lineas.map((linea) => linea.skill).join(', '));
  campo(fila, 'importe', formatearMoneda(totalContrato(contrato)));
  campo(fila, 'etiqueta-acciones', `Acciones del contrato ${contrato.id}`);

  const inicio = campo(fila, 'inicio', formatearFecha(contrato.inicio));
  const fin = campo(fila, 'fin', formatearFecha(contrato.fin));
  inicio.setAttribute('datetime', contrato.inicio);
  fin.setAttribute('datetime', contrato.fin);

  prepararInteractivos(fila);
  return fila;
}

export function renderContratos() {
  qs('#tbody-contratos').replaceChildren(...contratos.map(crearFilaContrato));
}

/* ── 5.6 · Log de errores ────────────────────────────────────────── */

function crearFilaError(error) {
  const fila = clonar('#tpl-fila-error');
  fila.dataset.id = error.id;

  const marca = campo(fila, 'timestamp', formatearFechaHora(error.timestamp));
  marca.setAttribute('datetime', error.timestamp);

  campo(fila, 'agente', error.agente);
  campo(fila, 'descripcion', error.descripcion);
  campo(fila, 'etiqueta-acciones', `Acciones del error ${error.id}`);
  pintarBadge(qs('[data-componente="badge"]', fila), error.resuelto ? 'resuelto' : error.gravedad);

  if (error.resuelto) {
    marcarOpcionResuelta(qs('[data-accion="resolver-error"]', fila));
  }

  prepararInteractivos(fila);
  return fila;
}

export function renderErrores() {
  qs('#tbody-errores').replaceChildren(...errores.map(crearFilaError));
}

/* ── Acciones de los menús ⋮ ─────────────────────────────────────── */

const buscarPorId = (coleccion, elemento) => {
  const id = elemento.closest('[data-id]')?.dataset.id;
  return coleccion.find((registro) => registro.id === id);
};

const ACCIONES = {
  /* Usuarios ---------------------------------------------------- */
  'ver-usuario'(origen) {
    const usuario = buscarPorId(usuarios, origen);
    const dialogo = qs('#modal-usuario');
    rellenar(dialogo, {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      plan: usuario.plan,
      estado: textoEstado(usuario.estado),
      alta: formatearFecha(usuario.alta),
      uso: usuario.uso,
      facturacion: usuario.facturacion,
    });
    abrirModal(dialogo, botonDelMenu(origen));
  },

  'eliminar-usuario'(origen) {
    const usuario = buscarPorId(usuarios, origen);
    const indice = usuarios.indexOf(usuario);
    cerrarMenus();
    usuarios.splice(indice, 1);
    renderUsuarios();
    reubicarFoco(qs('#tbody-usuarios'), indice);
    anunciar(`Usuario ${usuario.nombre} eliminado. Quedan ${usuarios.length} usuarios.`);
  },

  /* Agentes ----------------------------------------------------- */
  'configurar-agente'(origen) {
    const agente = buscarPorId(agentes, origen);
    const dialogo = qs('#modal-prompt');
    const formulario = qs('#form-prompt');
    const campoPrompt = qs('#campo-system-prompt');

    formulario.dataset.agenteId = agente.id;
    campo(dialogo, 'agente', agente.nombre);
    campoPrompt.value = agente.systemPrompt;
    campoPrompt.removeAttribute('aria-invalid');
    qs('#error-system-prompt').hidden = true;

    abrirModal(dialogo, botonDelMenu(origen));
  },

  'eliminar-agente'(origen) {
    const agente = buscarPorId(agentes, origen);
    const indice = agentes.indexOf(agente);
    cerrarMenus();
    agentes.splice(indice, 1);
    renderAgentes();
    reubicarFoco(qs('#lista-agentes'), indice);
    anunciar(`Agente ${agente.nombre} eliminado. Quedan ${agentes.length} agentes.`);
  },

  /* Skills ------------------------------------------------------ */
  'ver-skill'(origen) {
    const skill = buscarPorId(skills, origen);
    const dialogo = qs('#modal-skill');
    rellenar(dialogo, {
      nombre: skill.nombre,
      descripcion: skill.descripcion,
      agentes: `${formatearNumero(skill.agentesActivos)} agentes`,
      precio: `${formatearMoneda(skill.precio)} por agente y mes`,
    });
    abrirModal(dialogo, botonDelMenu(origen));
  },

  'eliminar-skill'(origen) {
    const skill = buscarPorId(skills, origen);
    const indice = skills.indexOf(skill);
    cerrarMenus();
    skills.splice(indice, 1);
    renderSkills();
    reubicarFoco(qs('#catalogo-skills'), indice);
    anunciar(`Skill ${skill.nombre} eliminada del catálogo. Quedan ${skills.length} skills.`);
  },

  /* Contratos --------------------------------------------------- */
  'ver-contrato'(origen) {
    const contrato = buscarPorId(contratos, origen);
    const dialogo = qs('#modal-contrato');
    const subtotal = subtotalContrato(contrato);

    rellenar(dialogo, {
      cliente: contrato.cliente,
      agente: contrato.agente,
      periodo: `${formatearFecha(contrato.inicio)} — ${formatearFecha(contrato.fin)}`,
      pago: contrato.metodoPago,
      subtotal: formatearMoneda(subtotal),
      impuestos: formatearMoneda(subtotal * TIPO_IVA),
      total: formatearMoneda(subtotal * (1 + TIPO_IVA)),
    });

    qs('[data-campo="lineas"]', dialogo).replaceChildren(
      ...contrato.lineas.map((linea) => {
        const fila = document.createElement('tr');
        const nombre = document.createElement('th');
        nombre.scope = 'row';
        nombre.textContent = linea.skill;
        const precio = document.createElement('td');
        precio.textContent = formatearMoneda(linea.precio);
        fila.append(nombre, precio);
        return fila;
      })
    );

    qs('#modal-contrato-titulo').textContent = `Desglose del contrato ${contrato.id}`;
    abrirModal(dialogo, botonDelMenu(origen));
  },

  /* Errores ----------------------------------------------------- */
  'ver-error'(origen) {
    const error = buscarPorId(errores, origen);
    const dialogo = qs('#modal-error');
    rellenar(dialogo, {
      timestamp: formatearFechaHora(error.timestamp),
      agente: error.agente,
      gravedad: error.resuelto ? textoEstado('resuelto') : textoEstado(error.gravedad),
      contexto: error.contexto,
      stack: error.stack,
    });
    qs('#modal-error-titulo').textContent = `Traza completa del error ${error.id}`;
    abrirModal(dialogo, botonDelMenu(origen));
  },

  'resolver-error'(origen) {
    const error = buscarPorId(errores, origen);
    if (error.resuelto) return;

    const fila = origen.closest('[data-id]');
    const boton = botonDelMenu(origen);

    error.resuelto = true;
    pintarBadge(qs('[data-componente="badge"]', fila), 'resuelto');

    marcarOpcionResuelta(qs('[data-accion="resolver-error"]', fila));

    boton?.focus();
    anunciar(
      `Error ${error.id} del agente ${error.agente} marcado como resuelto. ` +
        `Quedan ${errores.filter((e) => !e.resuelto).length} incidencias abiertas.`
    );
  },
};

/* ── Cableado ────────────────────────────────────────────────────── */

const inhabilitado = (elemento) =>
  elemento.disabled || elemento.getAttribute('aria-disabled') === 'true';

function gestionarAcciones(evento) {
  const disparador = evento.target.closest('[data-accion]');
  if (!disparador || inhabilitado(disparador)) return;
  const accion = ACCIONES[disparador.dataset.accion];
  if (accion) accion(disparador);
}

function gestionarFormularioPrompt() {
  const formulario = qs('#form-prompt');
  const campoPrompt = qs('#campo-system-prompt');
  const mensajeError = qs('#error-system-prompt');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const valor = campoPrompt.value.trim();

    if (valor.length < 20) {
      campoPrompt.setAttribute('aria-invalid', 'true');
      mensajeError.textContent =
        `El system prompt debe tener al menos 20 caracteres (actualmente ${valor.length}).`;
      mensajeError.hidden = false;
      campoPrompt.focus();
      return;
    }

    campoPrompt.removeAttribute('aria-invalid');
    mensajeError.hidden = true;

    const agente = agentes.find((registro) => registro.id === formulario.dataset.agenteId);
    if (agente) agente.systemPrompt = valor;

    cerrarModal(qs('#modal-prompt'));
    anunciar(`System prompt del agente ${agente?.nombre ?? ''} guardado correctamente.`);
  });
}

export function inicializarVistas() {
  renderDashboard();
  renderUsuarios();
  renderAgentes();
  renderSkills();
  renderContratos();
  renderErrores();

  document.addEventListener('click', gestionarAcciones);
  gestionarFormularioPrompt();
}
