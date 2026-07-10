import { renderSidebar } from "./sidebar.js";
import { openLugarFormModal } from "./lugaresmodal.js";
import Swal from "sweetalert2";

let listContactos = [
  {
    id: 1,
    nombre: "María Morales",
    email: "maria@family.com",
    parentesco: "Familiar",
  },
  {
    id: 2,
    nombre: "Carlos Ruiz",
    email: "carlos.vecino@gmail.com",
    parentesco: "Vecino",
  },
];

let listLugares = [
  {
    id: 1,
    nombre: "Mi Casa",
    tipo: "Casa",
    metros: 100,
    coordenadas: "40.4167° N, 3.7037° W",
  },
  {
    id: 2,
    nombre: "Oficina Central",
    tipo: "Trabajo",
    metros: 200,
    coordenadas: "40.4230° N, 3.6980° W",
  },
];

// Lista local de reportes para el Homepage
let listReportes = [
  {
    id: "KP-8821",
    tipo: "Vandalismo",
    descripcion: "Graffiti y rayados en la fachada del centro comunitario.",
    ubicacion: "Calle 8 #12-42",
    fecha: "Hace 2 min",
    estado: "Pendiente",
  },
  {
    id: "KP-8819",
    tipo: "Peligro",
    descripcion: "Cables de alta tensión caídos sobre la acera peatonal.",
    ubicacion: "Plaza Central",
    fecha: "Hace 14 min",
    estado: "Verificado",
  },
];

export function renderHomepage() {
  return `
    <section class="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <div class="flex min-h-screen flex-col lg:flex-row">
        ${renderSidebar()}
        
        <main class="flex-1 p-3 sm:p-4 lg:p-6">
          <div class="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.45)]">
            
            <!-- CONTENIDO TAB: INICIO (El mapa y alertas de la página de inicio) -->
            <div id="homepage-content-inicio" class="grid flex-1 lg:grid-cols-[1.45fr_0.75fr] bg-[#f9fafb]">
              
              <!-- Contenedor del Mapa -->
              <div class="relative p-4 lg:p-6 flex flex-col min-h-[500px]">
                <div class="relative flex-1 rounded-md border border-zinc-200 bg-zinc-950 overflow-hidden shadow-sm">
                  
                  <!-- ID para la inserción del mapa real en el homepage -->
                  <div id="homepage-map-container" class="absolute inset-0 z-0">
                    <!-- Imagen SVG de calles como placeholder de fondo del mapa -->
                    <div class="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_#27272a_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
                    <svg viewBox="0 0 700 480" class="w-full h-full stroke-orange-500/10 fill-none pointer-events-none" stroke-width="1.5">
                      <path d="M 50,0 Q 200,120 350,180 T 650,480" stroke-width="8" stroke="rgba(234, 88, 12, 0.08)"/>
                      <path d="M 0,80 C 250,40 400,380 700,320" stroke-width="6" stroke="rgba(234, 88, 12, 0.05)"/>
                      <line x1="120" y1="0" x2="120" y2="480" stroke-width="3"/>
                      <line x1="420" y1="0" x2="420" y2="480" stroke-width="4"/>
                      <line x1="0" y1="200" x2="700" y2="200" stroke-width="4"/>
                      <circle cx="280" cy="180" r="70" stroke="#ea580c" stroke-width="1" stroke-dasharray="3 3" fill="rgba(234, 88, 12, 0.01)"/>
                    </svg>

                    <!-- Mensaje para el desarrollador -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div class="bg-zinc-900/90 border border-zinc-800 rounded p-4 text-center max-w-xs">
                        <p class="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Mapa del Vecindario</p>
                        <p class="text-[9px] text-zinc-400">Contenedor listo con ID <code class="text-orange-400">#homepage-map-container</code>.</p>
                      </div>
                    </div>
                  </div>

                  <!-- HUD: Indicador de conexión live -->
                  <div class="absolute bottom-4 left-4 z-10 bg-zinc-950/90 border border-zinc-850 rounded px-2.5 py-1 flex items-center gap-2 text-white shadow-md backdrop-blur-sm">
                    <span class="relative flex h-1.5 w-1.5">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span class="text-[9px] font-bold tracking-wide uppercase text-zinc-400">GPS Live</span>
                  </div>

                  <!-- HUD: Ruta segura e incidentes -->
                  <div class="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                    <div class="bg-zinc-950/95 border border-zinc-850 rounded p-3 text-white shadow-md backdrop-blur-sm w-44">
                      <p class="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Ruta Protegida</p>
                      <p class="text-xs font-semibold text-zinc-100 mt-1">Parque Central</p>
                    </div>
                    <div class="bg-zinc-950/95 border border-zinc-850 rounded p-3 text-white shadow-md backdrop-blur-sm w-44">
                      <p class="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Estado del Sector</p>
                      <p class="text-xs font-semibold text-orange-500 mt-1">2 Alertas Activas</p>
                    </div>
                  </div>

                  <!-- Botón SOS Flotante (Arriba Derecha) -->
                  <div class="absolute top-4 right-4 z-10">
                    <button id="homepage-sos-btn" class="bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.97] text-white px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded border border-[#c2410c] shadow-[0_4px_12px_rgba(234,88,12,0.18)] transition-all">
                      SOS
                    </button>
                  </div>

                  <!-- Botón Reportar Flotante (Abajo Derecha) -->
                  <div class="absolute bottom-4 right-4 z-10">
                    <button id="homepage-report-btn" class="bg-zinc-900 hover:bg-zinc-850 active:scale-[0.97] text-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded border border-zinc-950 shadow-md transition-all">
                      Hacer reporte
                    </button>
                  </div>

                </div>
              </div>

              <!-- Sidebar Derecho de Inicio -->
              <aside class="flex flex-col gap-4 bg-zinc-50 p-4 lg:p-6 border-l border-zinc-200">
                <!-- Tarjeta Confianza (Oscura) -->
                <div class="rounded bg-zinc-950 border border-zinc-900 p-5 text-white shadow-sm flex flex-col justify-between h-40">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Confianza Vecinal</p>
                      <p class="mt-2 text-4xl font-extrabold text-orange-500">94%</p>
                    </div>
                    <span class="rounded bg-zinc-900 border border-zinc-850 px-2 py-1 text-[9px] font-bold text-zinc-300 uppercase tracking-wider">Live</span>
                  </div>
                  <div>
                    <div class="h-1.5 w-full rounded bg-zinc-900 overflow-hidden">
                      <div class="h-full w-[94%] bg-orange-500 rounded"></div>
                    </div>
                    <p class="mt-2.5 text-xs text-zinc-400 leading-snug">Tu zona presenta baja actividad sospechosa.</p>
                  </div>
                </div>

                <!-- Tarjeta Alertas Recientes -->
                <div class="rounded bg-white border border-zinc-200 p-5 shadow-sm flex-1 flex flex-col">
                  <div class="mb-4 flex items-center justify-between">
                    <div>
                      <p class="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Notificaciones</p>
                      <h3 class="text-xs font-bold text-zinc-900 mt-0.5">Alertas recientes</h3>
                    </div>
                    <span class="rounded bg-zinc-50 border border-zinc-150 px-2 py-0.5 text-[9px] font-semibold text-zinc-500">Hoy</span>
                  </div>
                  
                  <div class="space-y-2 flex-1">
                    <div class="rounded border border-zinc-100 bg-zinc-50/50 p-3">
                      <div class="flex items-center justify-between">
                        <p class="text-xs font-bold text-zinc-800">Calle 8</p>
                        <span class="text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded">Urgente</span>
                      </div>
                      <p class="mt-1 text-[10px] text-zinc-500">Tráfico lento · 5 min</p>
                    </div>
                    <div class="rounded border border-zinc-100 bg-zinc-50/50 p-3">
                      <div class="flex items-center justify-between">
                        <p class="text-xs font-bold text-zinc-800">Plaza Norte</p>
                        <span class="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">Normal</span>
                      </div>
                      <p class="mt-1 text-[10px] text-zinc-500">Vigilancia activa · 12 min</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <!-- CONTENIDO TAB: LUGARES SEGUROS (CRUD completo) -->
            <div id="homepage-content-lugares" class="hidden p-6 sm:p-8 space-y-6 flex-1 bg-[#f9fafb]">
              <!-- Header Section -->
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Seguridad Vecinal</p>
                  <h1 class="text-xl font-bold text-zinc-900 mt-1">Lugares Seguros</h1>
                  <p class="text-xs text-zinc-500 mt-1">Administra tus perímetros de seguridad y geovallas.</p>
                </div>
                <div>
                  <button id="btn-homepage-create-lugar" class="rounded bg-zinc-950 hover:bg-zinc-850 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors">Nuevo Lugar</button>
                </div>
              </div>

              <!-- Places Table Card -->
              <div class="bg-white border border-zinc-200 rounded-md p-6">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs text-zinc-700 border-collapse">
                    <thead>
                      <tr class="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[9px] pb-2">
                        <th class="pb-3 pr-4">Nombre del Lugar</th>
                        <th class="pb-3 pr-4">Tipo</th>
                        <th class="pb-3 pr-4">Rango (metros)</th>
                        <th class="pb-3 pr-4">Ubicación (GPS)</th>
                        <th class="pb-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="homepage-lugares-table-body" class="divide-y divide-zinc-100">
                      <!-- Renderizado Dinámico del CRUD -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- CONTENIDO TAB: REPORTES (Solo Actualizar) -->
            <div id="homepage-content-reportes" class="hidden p-6 sm:p-8 space-y-6 flex-1 bg-[#f9fafb]">
              <!-- Header Section -->
              <div class="mb-2">
                <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Comunidad</p>
                <h1 class="text-xl font-bold text-zinc-900 mt-1">Incidentes Reportados</h1>
                <p class="text-xs text-zinc-500 mt-1">Listado completo de reportes enviados por miembros del vecindario.</p>
              </div>

              <!-- Reports Table Card -->
              <div class="bg-white border border-zinc-200 rounded-md p-6">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs text-zinc-700 border-collapse">
                    <thead>
                      <tr class="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[9px] pb-2">
                        <th class="pb-3 pr-4">ID</th>
                        <th class="pb-3 pr-4">Tipo</th>
                        <th class="pb-3 pr-4">Descripción</th>
                        <th class="pb-3 pr-4">Ubicación</th>
                        <th class="pb-3 pr-4">Fecha</th>
                        <th class="pb-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="homepage-reportes-table-body" class="divide-y divide-zinc-100">
                      <!-- Renderizado Dinámico del Listado -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- CONTENIDO TAB: PERSONAS DE CONFIANZA (CRUD completo) -->
            <div id="homepage-content-contactos" class="hidden p-6 sm:p-8 space-y-6 flex-1 bg-[#f9fafb]">
              <!-- Header Section -->
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Seguridad Vecinal</p>
                  <h1 class="text-xl font-bold text-zinc-900 mt-1">Personas de Confianza</h1>
                  <p class="text-xs text-zinc-500 mt-1">Contactos de emergencia que serán alertados automáticamente mediante SMS.</p>
                </div>
                <div>
                  <button id="btn-homepage-create-contacto" class="rounded bg-zinc-950 hover:bg-zinc-850 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors">Nuevo Contacto</button>
                </div>
              </div>

              <!-- Contacts Table Card -->
              <div class="bg-white border border-zinc-200 rounded-md p-6">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs text-zinc-700 border-collapse">
                    <thead>
                      <tr class="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[9px] pb-2">
                        <th class="pb-3 pr-4">Nombre Completo</th>
                        <th class="pb-3 pr-4">Correo Electrónico</th>
                        <th class="pb-3 pr-4">Parentesco</th>
                        <th class="pb-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="homepage-contactos-table-body" class="divide-y divide-zinc-100">
                      <!-- Renderizado Dinámico del CRUD -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </section>
  `;
}

// -------------------------------------------------------------
// CRUD: PERSONAS DE CONFIANZA
// -------------------------------------------------------------
function renderContactosTable() {
  const tbody = document.getElementById("homepage-contactos-table-body");
  if (!tbody) return;

  if (listContactos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="py-8 text-center text-zinc-400 font-medium">No hay personas de confianza registradas.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listContactos
    .map(
      (contacto) => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-900">${contacto.nombre}</td>
      <td class="py-4 pr-4 text-zinc-500">${contacto.email}</td>
      <td class="py-4 pr-4">
        <span class="inline-flex items-center rounded bg-orange-50 px-2.5 py-0.5 text-[10px] font-medium text-orange-700 border border-orange-100">${contacto.parentesco}</span>
      </td>
      <td class="py-4 text-right space-x-2 font-bold text-[11px] whitespace-nowrap">
        <button data-id="${contacto.id}" class="btn-contacto-edit inline-flex items-center gap-1 rounded border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-2.5 py-1 text-[10px] font-bold transition-colors">
          <svg class="h-3 w-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Actualizar</span>
        </button>
        <button data-id="${contacto.id}" class="btn-contacto-delete inline-flex items-center gap-1 rounded border border-red-100 hover:bg-red-50 text-red-650 px-2.5 py-1 text-[10px] font-bold transition-colors">
          <svg class="h-3 w-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Eliminar</span>
        </button>
      </td>
    </tr>
  `,
    )
    .join("");

  attachContactoActions();
}

function attachContactoActions() {
  document.querySelectorAll(".btn-contacto-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const contacto = listContactos.find((c) => c.id === id);
      if (contacto) openContactoFormModal(contacto);
    });
  });

  document.querySelectorAll(".btn-contacto-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const contacto = listContactos.find((c) => c.id === id);
      if (!contacto) return;

      Swal.fire({
        title:
          '<h3 class="text-sm font-semibold text-zinc-900 text-left">Confirmar Eliminación</h3>',
        html: `<p class="text-xs text-zinc-500 text-left">¿Estás seguro de que deseas eliminar permanentemente a <strong>${contacto.nombre}</strong> de tus contactos de confianza?</p>`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        buttonsStyling: false,
        customClass: {
          popup:
            "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full font-sans",
          confirmButton:
            "bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors mr-2",
          cancelButton:
            "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded transition-colors",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          listContactos = listContactos.filter((c) => c.id !== id);
          renderContactosTable();

          Swal.fire({
            icon: "success",
            title:
              '<h3 class="text-sm font-semibold text-zinc-900 text-left">Contacto Eliminado</h3>',
            html: '<p class="text-xs text-zinc-500 text-left">El contacto ha sido removido con éxito de la lista.</p>',
            showConfirmButton: false,
            timer: 2000,
            buttonsStyling: false,
            customClass: {
              popup:
                "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
            },
          });
        }
      });
    });
  });
}

function openContactoFormModal(contacto = null) {
  Swal.fire({
    title: `<div class="text-left font-sans"><h3 class="text-base font-semibold text-zinc-900">${contacto ? "Editar Persona de Confianza" : "Nueva Persona de Confianza"}</h3><p class="text-zinc-500 mt-1 text-xs leading-relaxed">Completa los datos de tu contacto de emergencia.</p></div>`,
    html: `
      <form id="swal-contacto-crud-form" class="space-y-4 mt-4 text-left font-sans">
        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Nombre Completo</label>
          <input id="contacto-nombre" type="text" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Ej. María Morales" value="${contacto ? contacto.nombre : ""}">
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Correo electrónico</label>
          <input id="contacto-email" type="email" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="ejemplo@correo.com" value="${contacto ? contacto.email : ""}">
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Parentesco</label>
          <select id="contacto-parentesco" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 bg-white">
            <option value="Familiar" ${contacto && contacto.parentesco === "Familiar" ? "selected" : ""}>Familiar</option>
            <option value="Vecino" ${contacto && contacto.parentesco === "Vecino" ? "selected" : ""}>Vecino</option>
            <option value="Amigo" ${contacto && contacto.parentesco === "Amigo" ? "selected" : ""}>Amigo</option>
            <option value="Otro" ${contacto && contacto.parentesco === "Otro" ? "selected" : ""}>Otro</option>
          </select>
        </div>

        <div id="contacto-modal-error" class="text-xs font-semibold text-red-500 text-center"></div>

        <button id="contacto-modal-submit" type="button" class="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium py-2.5 rounded text-xs transition-colors mt-2 uppercase tracking-wider font-semibold">
          ${contacto ? "Guardar Cambios" : "Registrar Contacto"}
        </button>
      </form>
    `,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    buttonsStyling: false,
    customClass: {
      popup:
        "rounded-md p-6 border border-zinc-200 bg-white max-w-md w-full font-sans",
      cancelButton:
        "w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold py-2 rounded transition-colors text-center",
    },
    didOpen: () => {
      const submitBtn = document.getElementById("contacto-modal-submit");
      const errorEl = document.getElementById("contacto-modal-error");

      submitBtn.addEventListener("click", () => {
        const nombre = document.getElementById("contacto-nombre").value.trim();
        const email = document.getElementById("contacto-email").value.trim();
        const parentesco = document.getElementById("contacto-parentesco").value;

        if (!nombre || !email || !parentesco) {
          errorEl.textContent = "Por favor, complete todos los campos.";
          return;
        }

        if (contacto) {
          contacto.nombre = nombre;
          contacto.email = email;
          contacto.parentesco = parentesco;
        } else {
          const newContacto = {
            id: Date.now(),
            nombre,
            email,
            parentesco,
          };
          listContactos.push(newContacto);
        }

        renderContactosTable();
        Swal.close();

        Swal.fire({
          icon: "success",
          title: `<h3 class="text-sm font-semibold text-zinc-900 text-left">${contacto ? "Contacto Actualizado" : "Contacto Registrado"}</h3>`,
          html: `<p class="text-xs text-zinc-500 text-left">La persona de confianza ha sido ${contacto ? "modificada" : "añadida"} exitosamente.</p>`,
          showConfirmButton: false,
          timer: 2000,
          buttonsStyling: false,
          customClass: {
            popup:
              "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
          },
        });
      });
    },
  });
}

// -------------------------------------------------------------
// CRUD: LUGARES SEGUROS
// -------------------------------------------------------------
function renderLugaresTable() {
  const tbody = document.getElementById("homepage-lugares-table-body");
  if (!tbody) return;

  if (listLugares.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-8 text-center text-zinc-400 font-medium">No hay lugares seguros registrados.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listLugares
    .map(
      (lugar) => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-900">${lugar.nombre}</td>
      <td class="py-4 pr-4 text-zinc-500">${lugar.tipo}</td>
      <td class="py-4 pr-4 font-mono text-zinc-800">${lugar.metros} metros</td>
      <td class="py-4 pr-4 text-zinc-450 font-mono">${lugar.coordenadas}</td>
      <td class="py-4 text-right space-x-2 font-bold text-[11px] whitespace-nowrap">
        <button data-id="${lugar.id}" class="btn-lugar-edit inline-flex items-center gap-1 rounded border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-2.5 py-1 text-[10px] font-bold transition-colors">
          <svg class="h-3 w-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Actualizar</span>
        </button>
        <button data-id="${lugar.id}" class="btn-lugar-delete inline-flex items-center gap-1 rounded border border-red-100 hover:bg-red-50 text-red-650 px-2.5 py-1 text-[10px] font-bold transition-colors">
          <svg class="h-3 w-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Eliminar</span>
        </button>
      </td>
    </tr>
  `,
    )
    .join("");

  attachLugarActions();
}

function attachLugarActions() {
  document.querySelectorAll(".btn-lugar-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const lugar = listLugares.find((l) => l.id === id);
      if (lugar) {
        openLugarFormModal(lugar, (nombre, tipo, metros) => {
          lugar.nombre = nombre;
          lugar.tipo = tipo;
          lugar.metros = metros;
          renderLugaresTable();

          Swal.fire({
            icon: "success",
            title:
              '<h3 class="text-sm font-semibold text-zinc-900 text-left">Lugar Actualizado</h3>',
            html: '<p class="text-xs text-zinc-500 text-left">El lugar seguro ha sido modificado exitosamente.</p>',
            showConfirmButton: false,
            timer: 2000,
            buttonsStyling: false,
            customClass: {
              popup:
                "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
            },
          });
        });
      }
    });
  });

  document.querySelectorAll(".btn-lugar-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const lugar = listLugares.find((l) => l.id === id);
      if (!lugar) return;

      Swal.fire({
        title:
          '<h3 class="text-sm font-semibold text-zinc-900 text-left">Confirmar Eliminación</h3>',
        html: `<p class="text-xs text-zinc-500 text-left">¿Estás seguro de que deseas eliminar permanentemente <strong>${lugar.nombre}</strong> de tus lugares seguros?</p>`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        buttonsStyling: false,
        customClass: {
          popup:
            "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full font-sans",
          confirmButton:
            "bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors mr-2",
          cancelButton:
            "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded transition-colors",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          listLugares = listLugares.filter((l) => l.id !== id);
          renderLugaresTable();

          Swal.fire({
            icon: "success",
            title:
              '<h3 class="text-sm font-semibold text-zinc-900 text-left">Lugar Eliminado</h3>',
            html: '<p class="text-xs text-zinc-500 text-left">El lugar seguro ha sido removido con éxito.</p>',
            showConfirmButton: false,
            timer: 2000,
            buttonsStyling: false,
            customClass: {
              popup:
                "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
            },
          });
        }
      });
    });
  });
}

// -------------------------------------------------------------
// CRUD: REPORTES (Actualizar Solamente)
// -------------------------------------------------------------
export function addHomepageReport(report) {
  listReportes.unshift(report);
  renderReportesTable();
}

function renderReportesTable() {
  const tbody = document.getElementById("homepage-reportes-table-body");
  if (!tbody) return;

  if (listReportes.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-zinc-400 font-medium">No hay incidentes reportados.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listReportes
    .map(
      (report) => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-900 font-mono">${report.id}</td>
      <td class="py-4 pr-4">
        <span class="inline-flex items-center gap-1.5 rounded bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-755 border border-zinc-200">
          ${report.tipo}
        </span>
      </td>
      <td class="py-4 pr-4 text-zinc-650 max-w-xs truncate">${report.descripcion}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.ubicacion}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.fecha}</td>
      <td class="py-4 text-right whitespace-nowrap">
        <button data-id="${report.id}" class="btn-report-edit inline-flex items-center gap-1 rounded border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-2.5 py-1 text-[10px] font-bold transition-colors">
          <svg class="h-3 w-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Actualizar</span>
        </button>
      </td>
    </tr>
  `,
    )
    .join("");

  attachReportActions();
}

function attachReportActions() {
  document.querySelectorAll(".btn-report-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const report = listReportes.find((r) => r.id === id);
      if (!report) return;

      Swal.fire({
        title: `<div class="text-left font-sans"><h3 class="text-base font-semibold text-zinc-900">Actualizar Reporte</h3><p class="text-zinc-500 mt-1 text-xs leading-relaxed">Modifica los detalles del incidente reportado.</p></div>`,
        html: `
          <form id="swal-report-edit-form" class="space-y-4 mt-4 text-left font-sans">
            <div>
              <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Tipo de Incidente</label>
              <select id="edit-report-tipo" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 bg-white">
                <option value="Robo" ${report.tipo === "Robo" ? "selected" : ""}>Robo</option>
                <option value="Vandalismo" ${report.tipo === "Vandalismo" ? "selected" : ""}>Vandalismo</option>
                <option value="Peligro" ${report.tipo === "Peligro" ? "selected" : ""}>Peligro</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Descripción detallada</label>
              <textarea id="edit-report-desc" class="w-full p-3 border border-zinc-200 rounded text-xs min-h-[100px] focus:outline-none focus:border-zinc-400 bg-white text-zinc-855" placeholder="Detalla lo ocurrido...">${report.descripcion}</textarea>
            </div>

            <div>
              <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Ubicación</label>
              <input id="edit-report-ubicacion" type="text" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 bg-white" value="${report.ubicacion}">
            </div>

            <div id="edit-report-error" class="text-xs font-semibold text-red-500 text-center"></div>

            <button id="edit-report-submit" type="button" class="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium py-2.5 rounded text-xs transition-colors mt-2 uppercase tracking-wider font-semibold">
              Guardar Cambios
            </button>
          </form>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        buttonsStyling: false,
        customClass: {
          popup:
            "rounded-md p-6 border border-zinc-200 bg-white max-w-md w-full font-sans",
          cancelButton:
            "w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold py-2 rounded transition-colors text-center",
        },
        didOpen: () => {
          const submitBtn = document.getElementById("edit-report-submit");
          const errorEl = document.getElementById("edit-report-error");

          submitBtn.addEventListener("click", () => {
            const tipo = document.getElementById("edit-report-tipo").value;
            const desc = document
              .getElementById("edit-report-desc")
              .value.trim();
            const ubicacion = document
              .getElementById("edit-report-ubicacion")
              .value.trim();

            if (!tipo || !desc || !ubicacion) {
              errorEl.textContent = "Por favor, complete todos los campos.";
              return;
            }

            report.tipo = tipo;
            report.descripcion = desc;
            report.ubicacion = ubicacion;

            renderReportesTable();
            Swal.close();

            Swal.fire({
              icon: "success",
              title:
                '<h3 class="text-sm font-semibold text-zinc-900 text-left">Reporte Modificado</h3>',
              html: '<p class="text-xs text-zinc-500 text-left">El incidente ha sido actualizado con éxito.</p>',
              showConfirmButton: false,
              timer: 2000,
              buttonsStyling: false,
              customClass: {
                popup:
                  "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
              },
            });
          });
        },
      });
    });
  });
}

// -------------------------------------------------------------
// CONTROLADOR DE PESTAÑAS (HOMEPAGE)
// -------------------------------------------------------------
export function initHomepage() {
  const btnInicio = document.getElementById("homepage-btn-inicio");
  const btnLugares = document.getElementById("homepage-btn-rutas");
  const btnReportes = document.getElementById("homepage-btn-reportes");
  const btnContactos = document.getElementById("homepage-btn-contactos");

  const contentInicio = document.getElementById("homepage-content-inicio");
  const contentLugares = document.getElementById("homepage-content-lugares");
  const contentReportes = document.getElementById("homepage-content-reportes");
  const contentContactos = document.getElementById(
    "homepage-content-contactos",
  );

  // Inicializar renderizado de tablas
  renderContactosTable();
  renderLugaresTable();
  renderReportesTable();

  // Conectar botones de creación
  const createContactoBtn = document.getElementById(
    "btn-homepage-create-contacto",
  );
  if (createContactoBtn) {
    createContactoBtn.addEventListener("click", () => openContactoFormModal());
  }

  const createLugarBtn = document.getElementById("btn-homepage-create-lugar");
  if (createLugarBtn) {
    createLugarBtn.addEventListener("click", () => {
      openLugarFormModal(null, (nombre, tipo, metros) => {
        const newLugar = {
          id: Date.now(),
          nombre,
          tipo,
          metros,
          coordenadas: "40.4167° N, 3.7037° W",
        };
        listLugares.push(newLugar);
        renderLugaresTable();

        Swal.fire({
          icon: "success",
          title:
            '<h3 class="text-sm font-semibold text-zinc-900 text-left">Lugar Registrado</h3>',
          html: '<p class="text-xs text-zinc-500 text-left">El lugar seguro ha sido registrado con éxito.</p>',
          showConfirmButton: false,
          timer: 2000,
          buttonsStyling: false,
          customClass: {
            popup:
              "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
          },
        });
      });
    });
  }

  const buttons = [
    { btn: btnInicio, tab: contentInicio },
    { btn: btnLugares, tab: contentLugares },
    { btn: btnReportes, tab: contentReportes },
    { btn: btnContactos, tab: contentContactos },
  ];

  function switchTab(activeBtn, activeTab) {
    buttons.forEach((item) => {
      if (item.btn && item.tab) {
        if (item.btn === activeBtn) {
          // Activo
          item.btn.className =
            "homepage-nav-btn flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs font-medium bg-zinc-900 text-white border border-zinc-800";
          const icon = item.btn.querySelector("svg");
          if (icon) {
            icon.classList.remove("text-zinc-500");
            icon.classList.add("text-zinc-400");
          }
          item.tab.classList.remove("hidden");
        } else {
          // Inactivo
          item.btn.className =
            "homepage-nav-btn flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/50";
          const icon = item.btn.querySelector("svg");
          if (icon) {
            icon.classList.remove("text-zinc-400");
            icon.classList.add("text-zinc-550");
          }
          item.tab.classList.add("hidden");
        }
      }
    });
  }

  if (btnInicio)
    btnInicio.addEventListener("click", () =>
      switchTab(btnInicio, contentInicio),
    );
  if (btnLugares)
    btnLugares.addEventListener("click", () =>
      switchTab(btnLugares, contentLugares),
    );
  if (btnReportes)
    btnReportes.addEventListener("click", () =>
      switchTab(btnReportes, contentReportes),
    );
  if (btnContactos)
    btnContactos.addEventListener("click", () =>
      switchTab(btnContactos, contentContactos),
    );
}

export default renderHomepage;
