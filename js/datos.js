/**
 * datos.js — Estado inicial de la aplicación.
 *
 * AgentHub es un prototipo sin backend: todos los registros están
 * hardcodeados en el cliente. Este módulo es la única fuente de verdad;
 * las vistas se renderizan a partir de él y las acciones lo mutan.
 */

/* ── 5.1 · Dashboard ─────────────────────────────────────────────── */

export const metricas = {
  ingresos: 48250.0,
  descuentos: 3120.0,
  agentesActivos: 124,
  agentesFallando: 3,
};

export const actividadSemanal = [
  { dia: 'Lunes', ejecuciones: 1240 },
  { dia: 'Martes', ejecuciones: 1480 },
  { dia: 'Miércoles', ejecuciones: 1310 },
  { dia: 'Jueves', ejecuciones: 1620 },
  { dia: 'Viernes', ejecuciones: 1755 },
  { dia: 'Sábado', ejecuciones: 890 },
  { dia: 'Domingo', ejecuciones: 640 },
];

/* ── Diccionario de estados (texto accesible por clave) ──────────── */

export const ESTADOS = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  fallando: 'Fallando',
  suspendido: 'Suspendido',
  prueba: 'Periodo de prueba',
  moroso: 'Pago pendiente',
  critico: 'Crítico',
  error: 'Error',
  advertencia: 'Advertencia',
  resuelto: 'Resuelto',
};

/* ── 5.2 · Usuarios ──────────────────────────────────────────────── */

export const usuarios = [
  {
    id: 'USR-1042',
    nombre: 'Elena Ruiz Vidal',
    email: 'elena.ruiz@nordika.io',
    plan: 'Enterprise',
    estado: 'activo',
    alta: '2024-03-12',
    uso: '87 % de 500.000 ejecuciones/mes',
    facturacion: 'Gran Vía 41, 3.º B · 28013 Madrid · España',
  },
  {
    id: 'USR-1078',
    nombre: 'Marcos Antúnez Gil',
    email: 'm.antunez@delta-logistics.com',
    plan: 'Business',
    estado: 'activo',
    alta: '2024-07-01',
    uso: '54 % de 150.000 ejecuciones/mes',
    facturacion: 'Av. Diagonal 622, planta 4 · 08021 Barcelona · España',
  },
  {
    id: 'USR-1103',
    nombre: 'Sofía Iglesias Bravo',
    email: 'sofia.iglesias@vertexlab.eu',
    plan: 'Enterprise',
    estado: 'moroso',
    alta: '2023-11-24',
    uso: '112 % de 500.000 ejecuciones/mes (excedido)',
    facturacion: 'Rue de la Loi 155 · 1040 Bruselas · Bélgica',
  },
  {
    id: 'USR-1156',
    nombre: 'Javier Cabrera Nieto',
    email: 'jcabrera@artemisa-health.es',
    plan: 'Starter',
    estado: 'prueba',
    alta: '2025-06-18',
    uso: '31 % de 20.000 ejecuciones/mes',
    facturacion: 'Calle Larios 8, 2.º · 29005 Málaga · España',
  },
  {
    id: 'USR-1189',
    nombre: 'Nadia Ferrer Soler',
    email: 'nadia.ferrer@quantumseed.ai',
    plan: 'Business',
    estado: 'suspendido',
    alta: '2024-01-09',
    uso: '0 % — cuenta suspendida el 02/08/2026',
    facturacion: 'Paseo de la Castellana 200 · 28046 Madrid · España',
  },
  {
    id: 'USR-1204',
    nombre: 'Tomás Beltrán Ocaña',
    email: 'tomas.beltran@helios-retail.mx',
    plan: 'Enterprise',
    estado: 'activo',
    alta: '2025-02-27',
    uso: '68 % de 500.000 ejecuciones/mes',
    facturacion: 'Av. Reforma 505, piso 12 · 06500 Ciudad de México · México',
  },
];

/* ── 5.4 · Catálogo de skills ────────────────────────────────────── */

export const skills = [
  {
    id: 'SKL-01',
    nombre: 'Búsqueda web avanzada',
    descripcion: 'Consulta, filtra y resume fuentes de internet en tiempo real con citación de origen.',
    agentesActivos: 86,
    precio: 149.0,
  },
  {
    id: 'SKL-02',
    nombre: 'Análisis documental',
    descripcion: 'Extrae entidades, cláusulas y tablas de PDF, DOCX y correos electrónicos.',
    agentesActivos: 64,
    precio: 220.0,
  },
  {
    id: 'SKL-03',
    nombre: 'Generación de informes',
    descripcion: 'Redacta informes ejecutivos periódicos a partir de los datos procesados por el agente.',
    agentesActivos: 41,
    precio: 180.0,
  },
  {
    id: 'SKL-04',
    nombre: 'Integración CRM',
    descripcion: 'Lee y escribe registros de clientes en Salesforce, HubSpot y Zoho.',
    agentesActivos: 37,
    precio: 260.0,
  },
  {
    id: 'SKL-05',
    nombre: 'Análisis de imágenes',
    descripcion: 'Clasifica, describe y detecta anomalías en material fotográfico y escaneado.',
    agentesActivos: 23,
    precio: 310.0,
  },
  {
    id: 'SKL-06',
    nombre: 'Traducción multilingüe',
    descripcion: 'Traduce y localiza contenido en 34 idiomas conservando el tono corporativo.',
    agentesActivos: 19,
    precio: 95.0,
  },
];

/* ── 5.3 · Agentes ───────────────────────────────────────────────── */

export const agentes = [
  {
    id: 'AGT-204',
    nombre: 'Atlas Research',
    propietario: 'Elena Ruiz Vidal',
    estado: 'activo',
    skills: ['Búsqueda web avanzada', 'Análisis documental', 'Generación de informes'],
    systemPrompt:
      'Eres Atlas Research, un analista documental senior. Responde siempre en español ' +
      'neutro, cita la fuente de cada afirmación y descarta cualquier dato que no puedas ' +
      'verificar en al menos dos fuentes independientes.',
  },
  {
    id: 'AGT-217',
    nombre: 'Nova Support',
    propietario: 'Marcos Antúnez Gil',
    estado: 'activo',
    skills: ['Integración CRM', 'Traducción multilingüe'],
    systemPrompt:
      'Eres Nova Support, agente de atención al cliente de Delta Logistics. Sé breve y ' +
      'resolutivo, no prometas plazos de entrega sin consultar el CRM y escala a un humano ' +
      'cualquier incidencia con importe superior a 500 €.',
  },
  {
    id: 'AGT-231',
    nombre: 'Orion Billing',
    propietario: 'Sofía Iglesias Bravo',
    estado: 'fallando',
    skills: ['Análisis documental', 'Integración CRM', 'Generación de informes'],
    systemPrompt:
      'Eres Orion Billing, responsable de conciliar facturas emitidas contra los contratos ' +
      'activos. Nunca modifiques importes: limítate a señalar discrepancias y adjuntar el ' +
      'identificador de contrato afectado.',
  },
  {
    id: 'AGT-248',
    nombre: 'Vega Vision',
    propietario: 'Javier Cabrera Nieto',
    estado: 'inactivo',
    skills: ['Análisis de imágenes', 'Generación de informes'],
    systemPrompt:
      'Eres Vega Vision, asistente de triaje de imágenes clínicas. No emites diagnósticos: ' +
      'describes hallazgos, indicas el grado de incertidumbre y derivas siempre la decisión ' +
      'final al personal facultativo.',
  },
  {
    id: 'AGT-259',
    nombre: 'Lyra Insights',
    propietario: 'Tomás Beltrán Ocaña',
    estado: 'activo',
    skills: ['Búsqueda web avanzada', 'Análisis de imágenes', 'Traducción multilingüe', 'Generación de informes'],
    systemPrompt:
      'Eres Lyra Insights, analista de tendencias de retail. Trabaja con datos de los ' +
      'últimos 90 días, expresa siempre las variaciones en puntos porcentuales y señala de ' +
      'forma explícita cuándo una muestra no es estadísticamente significativa.',
  },
];

/* ── 5.5 · Contratos de alquiler ─────────────────────────────────── */

export const contratos = [
  {
    id: 'CTR-3301',
    cliente: 'Elena Ruiz Vidal',
    agente: 'Atlas Research',
    inicio: '2026-01-15',
    fin: '2027-01-14',
    metodoPago: 'Transferencia SEPA · ES•• •••• •••• •••• 4417',
    lineas: [
      { skill: 'Búsqueda web avanzada', precio: 1788.0 },
      { skill: 'Análisis documental', precio: 2640.0 },
      { skill: 'Generación de informes', precio: 2160.0 },
    ],
  },
  {
    id: 'CTR-3318',
    cliente: 'Marcos Antúnez Gil',
    agente: 'Nova Support',
    inicio: '2026-03-01',
    fin: '2026-08-31',
    metodoPago: 'Tarjeta de crédito · VISA •••• 2098',
    lineas: [
      { skill: 'Integración CRM', precio: 1560.0 },
      { skill: 'Traducción multilingüe', precio: 570.0 },
    ],
  },
  {
    id: 'CTR-3342',
    cliente: 'Sofía Iglesias Bravo',
    agente: 'Orion Billing',
    inicio: '2025-09-01',
    fin: '2026-08-31',
    metodoPago: 'Domiciliación bancaria · BE•• •••• •••• 7723',
    lineas: [
      { skill: 'Análisis documental', precio: 2640.0 },
      { skill: 'Integración CRM', precio: 3120.0 },
      { skill: 'Generación de informes', precio: 2160.0 },
    ],
  },
  {
    id: 'CTR-3367',
    cliente: 'Javier Cabrera Nieto',
    agente: 'Vega Vision',
    inicio: '2026-06-18',
    fin: '2026-09-17',
    metodoPago: 'Tarjeta de crédito · Mastercard •••• 5511',
    lineas: [
      { skill: 'Análisis de imágenes', precio: 930.0 },
      { skill: 'Generación de informes', precio: 540.0 },
    ],
  },
  {
    id: 'CTR-3390',
    cliente: 'Tomás Beltrán Ocaña',
    agente: 'Lyra Insights',
    inicio: '2026-04-01',
    fin: '2027-03-31',
    metodoPago: 'Transferencia internacional · MX•• •••• •••• 8802',
    lineas: [
      { skill: 'Búsqueda web avanzada', precio: 1788.0 },
      { skill: 'Análisis de imágenes', precio: 3720.0 },
      { skill: 'Traducción multilingüe', precio: 1140.0 },
      { skill: 'Generación de informes', precio: 2160.0 },
    ],
  },
];

/** Tipo impositivo aplicado al desglose de los contratos. */
export const TIPO_IVA = 0.21;

/* ── 5.6 · Log de errores ────────────────────────────────────────── */

export const errores = [
  {
    id: 'ERR-90114',
    timestamp: '2026-08-18T09:42:17',
    agente: 'Orion Billing',
    gravedad: 'critico',
    descripcion: 'Conciliación abortada: contrato de referencia inexistente.',
    resuelto: false,
    contexto: 'Ejecución programada #4471 · skill «Análisis documental» · reintentos 3/3',
    stack: [
      'Traceback (most recent call last):',
      '  File "/srv/agenthub/runtime/executor.py", line 218, in run_step',
      '    contrato = registry.fetch(step.payload["contract_id"])',
      '  File "/srv/agenthub/registry/contracts.py", line 77, in fetch',
      '    raise ContractNotFound(contract_id)',
      'agenthub.errors.ContractNotFound: CTR-3342-B no existe en el índice activo',
    ].join('\n'),
  },
  {
    id: 'ERR-90108',
    timestamp: '2026-08-18T08:15:03',
    agente: 'Lyra Insights',
    gravedad: 'advertencia',
    descripcion: 'Muestra insuficiente: se omitieron 2 categorías del informe semanal.',
    resuelto: false,
    contexto: 'Ejecución programada #4468 · skill «Generación de informes»',
    stack: [
      'WARNING agenthub.analytics.sampling:',
      '  Categorías "outlet" y "corner" con n < 30 registros en la ventana de 90 días.',
      '  Acción aplicada: exclusión silenciosa del agregado semanal.',
      '  Sugerencia: ampliar ventana temporal o fusionar categorías residuales.',
    ].join('\n'),
  },
  {
    id: 'ERR-90097',
    timestamp: '2026-08-17T23:58:41',
    agente: 'Nova Support',
    gravedad: 'error',
    descripcion: 'Tiempo de espera agotado al escribir en el CRM del cliente.',
    resuelto: false,
    contexto: 'Conversación #88213 · skill «Integración CRM» · endpoint hubspot.v3.contacts',
    stack: [
      'Traceback (most recent call last):',
      '  File "/srv/agenthub/skills/crm/client.py", line 142, in upsert_contact',
      '    response = self._session.post(url, json=payload, timeout=15)',
      '  File "/usr/lib/python3.11/site-packages/requests/sessions.py", line 637, in post',
      '    return self.request("POST", url, data=data, json=json, **kwargs)',
      'requests.exceptions.ReadTimeout: HTTPSConnectionPool(host="api.hubapi.com", port=443): Read timed out. (timeout=15)',
    ].join('\n'),
  },
  {
    id: 'ERR-90085',
    timestamp: '2026-08-17T19:04:56',
    agente: 'Orion Billing',
    gravedad: 'error',
    descripcion: 'Documento PDF cifrado: no se pudo extraer el texto de la factura.',
    resuelto: false,
    contexto: 'Ejecución manual #4459 · skill «Análisis documental» · factura FRA-2026-0871.pdf',
    stack: [
      'Traceback (most recent call last):',
      '  File "/srv/agenthub/skills/docs/extractor.py", line 63, in extract_text',
      '    pages = reader.load(path)',
      '  File "/srv/agenthub/skills/docs/backends/pdf.py", line 29, in load',
      '    raise EncryptedDocument(path)',
      'agenthub.errors.EncryptedDocument: FRA-2026-0871.pdf requiere contraseña de propietario',
    ].join('\n'),
  },
  {
    id: 'ERR-90072',
    timestamp: '2026-08-17T14:37:12',
    agente: 'Vega Vision',
    gravedad: 'critico',
    descripcion: 'Memoria de GPU agotada durante el lote de inferencia de imágenes.',
    resuelto: false,
    contexto: 'Lote #331 · skill «Análisis de imágenes» · 512 imágenes · nodo gpu-eu-west-2',
    stack: [
      'Traceback (most recent call last):',
      '  File "/srv/agenthub/skills/vision/batch.py", line 96, in infer_batch',
      '    logits = model(tensor.to("cuda"))',
      'torch.cuda.OutOfMemoryError: CUDA out of memory. Tried to allocate 2.44 GiB',
      '  (GPU 0; 23.68 GiB total capacity; 21.02 GiB already allocated)',
    ].join('\n'),
  },
  {
    id: 'ERR-90060',
    timestamp: '2026-08-16T11:22:08',
    agente: 'Atlas Research',
    gravedad: 'advertencia',
    descripcion: 'Límite de peticiones alcanzado en el proveedor de búsqueda web.',
    resuelto: false,
    contexto: 'Ejecución programada #4402 · skill «Búsqueda web avanzada» · cuota 1.000/h',
    stack: [
      'WARNING agenthub.skills.websearch.ratelimit:',
      '  HTTP 429 recibido del proveedor tras 1.000 peticiones en 58 minutos.',
      '  Backoff exponencial aplicado: 4 reintentos espaciados entre 2 s y 16 s.',
      '  Resultado: consulta completada de forma degradada (12 de 20 fuentes).',
    ].join('\n'),
  },
  {
    id: 'ERR-90041',
    timestamp: '2026-08-15T17:49:35',
    agente: 'Nova Support',
    gravedad: 'error',
    descripcion: 'Respuesta del modelo rechazada por el validador de esquema JSON.',
    resuelto: true,
    contexto: 'Conversación #87940 · skill «Integración CRM» · esquema ticket.v2',
    stack: [
      'Traceback (most recent call last):',
      '  File "/srv/agenthub/runtime/validation.py", line 51, in enforce_schema',
      '    jsonschema.validate(instance=payload, schema=self.schema)',
      'jsonschema.exceptions.ValidationError: "priority" debe ser uno de ["low","normal","high"]',
      '  Valor recibido: "urgentísimo"',
    ].join('\n'),
  },
];
