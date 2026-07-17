import Swal from "sweetalert2";
import { openLugarFormModal } from "./lugaresmodal.js";
import {
    listReportes,
    listLugares,
    listContactos,
    renderReportesTable,
    renderLugaresTable,
    renderContactosTable,
    openContactoFormModal,
    renderAlertasRecientes,
    renderConfianzaVecinal,
} from "../../views/homepage.js";

export function attachReportActions() {
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
                    popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-md w-full font-sans",
                    cancelButton:
                        "w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold py-2 rounded transition-colors text-center",
                },
                didOpen: () => {
                    const submitBtn =
                        document.getElementById("edit-report-submit");
                    const errorEl =
                        document.getElementById("edit-report-error");

                    submitBtn.addEventListener("click", () => {
                        const tipo =
                            document.getElementById("edit-report-tipo").value;
                        const desc = document
                            .getElementById("edit-report-desc")
                            .value.trim();
                        const ubicacion = document
                            .getElementById("edit-report-ubicacion")
                            .value.trim();

                        if (!tipo || !desc || !ubicacion) {
                            errorEl.textContent =
                                "Por favor, complete todos los campos.";
                            return;
                        }

                        report.tipo = tipo;
                        report.descripcion = desc;
                        report.ubicacion = ubicacion;

                        renderReportesTable();
                        renderAlertasRecientes();
                        renderConfianzaVecinal();
                        Swal.close();

                        Swal.fire({
                            icon: "success",
                            title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Reporte Modificado</h3>',
                            html: '<p class="text-xs text-zinc-500 text-left">El incidente ha sido actualizado con éxito.</p>',
                            showConfirmButton: false,
                            timer: 2000,
                            buttonsStyling: false,
                            customClass: {
                                popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
                            },
                        });
                    });
                },
            });
        });
    });
}

export function attachLugarActions() {
    document.querySelectorAll(".btn-lugar-edit").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const lugar = listLugares.find((l) => l.id === id);
            if (lugar) {
                openLugarFormModal(lugar, (nombre, tipo, metros, coordinatesText, lat, lng) => {
                    lugar.nombre = nombre;
                    lugar.tipo = tipo;
                    lugar.metros = metros;
                    lugar.coordenadas = coordinatesText;
                    lugar.lat = lat;
                    lugar.lng = lng;
                    renderLugaresTable();

                    Swal.fire({
                        icon: "success",
                        title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Lugar Actualizado</h3>',
                        html: '<p class="text-xs text-zinc-500 text-left">El lugar seguro ha sido modificado exitosamente.</p>',
                        showConfirmButton: false,
                        timer: 2000,
                        buttonsStyling: false,
                        customClass: {
                            popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
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
                title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Confirmar Eliminación</h3>',
                html: `<p class="text-xs text-zinc-500 text-left">¿Estás seguro de que deseas eliminar permanentemente <strong>${lugar.nombre}</strong> de tus lugares seguros?</p>`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
                buttonsStyling: false,
                customClass: {
                    popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full font-sans",
                    confirmButton:
                        "bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors mr-2",
                    cancelButton:
                        "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded transition-colors",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const index = listLugares.findIndex((l) => l.id === id);
                    if (index > -1) {
                        listLugares.splice(index, 1);
                    }
                    renderLugaresTable();

                    Swal.fire({
                        icon: "success",
                        title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Lugar Eliminado</h3>',
                        html: '<p class="text-xs text-zinc-500 text-left">El lugar seguro ha sido removido con éxito.</p>',
                        showConfirmButton: false,
                        timer: 2000,
                        buttonsStyling: false,
                        customClass: {
                            popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
                        },
                    });
                }
            });
        });
    });
}

export function attachContactoActions() {
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
                title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Confirmar Eliminación</h3>',
                html: `<p class="text-xs text-zinc-500 text-left">¿Estás seguro de que deseas eliminar permanentemente a <strong>${contacto.nombre}</strong> de tus contactos de confianza?</p>`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
                buttonsStyling: false,
                customClass: {
                    popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full font-sans",
                    confirmButton:
                        "bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors mr-2",
                    cancelButton:
                        "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded transition-colors",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const index = listContactos.findIndex((c) => c.id === id);
                    if (index > -1) {
                        listContactos.splice(index, 1);
                    }
                    renderContactosTable();

                    Swal.fire({
                        icon: "success",
                        title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Contacto Eliminado</h3>',
                        html: '<p class="text-xs text-zinc-500 text-left">El contacto ha sido removido con éxito de la lista.</p>',
                        showConfirmButton: false,
                        timer: 2000,
                        buttonsStyling: false,
                        customClass: {
                            popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
                        },
                    });
                }
            });
        });
    });
}