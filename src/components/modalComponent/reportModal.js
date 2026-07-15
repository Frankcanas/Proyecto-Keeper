import Swal from "sweetalert2";
import { getTargetLocation } from "../../controllers/mapManager.controller.js";
import { geolocator } from "../../models/locationModel.js";
import { findMailingAddress } from "../../services/findMailingAddress.js";
import { get_location } from "../../models/locationModel.js";

export function initReportModal(buttonId, onSubmitCallback) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener("click", async () => {
        Swal.fire({
            title: '<h3 class="text-base font-semibold text-zinc-900 text-left">Nuevo Reporte</h3>',
            html: `
        <form id="report-form" class="text-left space-y-4 font-sans">
          <div>
            <h4 class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Categoría del incidente</h4>
            <div class="mt-2.5 flex gap-2">
              <button type="button" data-cat="robo" class="report-cat px-3 py-2 rounded border border-zinc-200 bg-white text-xs flex-1 font-medium transition-colors hover:bg-zinc-50 text-zinc-700">Robo</button>
              <button type="button" data-cat="vandalismo" class="report-cat px-3 py-2 rounded border border-zinc-200 bg-white text-xs flex-1 font-medium transition-colors hover:bg-zinc-50 text-zinc-700">Vandalismo</button>
              <button type="button" data-cat="peligro" class="report-cat px-3 py-2 rounded border border-zinc-200 bg-white text-xs flex-1 font-medium transition-colors hover:bg-zinc-50 text-zinc-700">Peligro</button>
            </div>
          </div>

          <div>
            <h4 class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Descripción detallada</h4>
            <textarea id="report-desc" class="w-full mt-2 p-3 border border-zinc-200 rounded text-xs min-h-[100px] focus:outline-none focus:border-zinc-400 bg-white text-zinc-800 placeholder-zinc-400" placeholder="Escriba aquí los detalles de lo sucedido..."></textarea>
          </div>

          <div>
            <h4 class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Evidencia (fotos/video)</h4>
            <div id="dropzone" class="mt-2 border border-dashed border-zinc-300 rounded p-5 text-center text-xs text-zinc-500 hover:bg-zinc-50 transition-colors cursor-pointer">
              <input id="report-files" type="file" accept="image/*,video/*" multiple class="hidden" />
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mb-2 text-sm">☁️</div>
                <div class="font-medium">Arrastre archivos aquí o haga clic para seleccionar</div>
              </div>
            </div>
            <div id="files-list" class="mt-2 text-xs text-zinc-650"></div>
          </div>

          <!-- CONTENEDOR DE UBICACIONES CON DISEÑO IDÉNTICO simétrico -->
          <div class="flex flex-col gap-2.5 border-t border-zinc-100 pt-3">
            
            <!-- Opción 1: GPS Actual -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                <input id="use-location" type="checkbox" class="w-3.5 h-3.5 border-zinc-300 rounded text-zinc-900 focus:ring-0" />
                <span>Usar mi ubicación actual (GPS)</span>
              </label>
              <div id="loc-status" class="text-[10px] text-zinc-400 font-medium max-w-[180px] text-right truncate"></div>
            </div>

            <!-- Opción 2: Punto Objetivo del Mapa (Mismo diseño exacto) -->
            <div class="flex items-center justify-between">
              <label id="use-target-label" class="flex items-center gap-2 text-xs text-zinc-400 cursor-not-allowed select-none">
                <input id="use-target-location" type="checkbox" class="w-3.5 h-3.5 border-zinc-300 rounded text-zinc-900 focus:ring-0 disabled:opacity-50" disabled />
                <span>Usar punto seleccionado en el mapa</span>
              </label>
              <div id="target-status" class="text-[10px] text-zinc-400 font-medium max-w-[180px] text-right truncate"></div>
            </div>
          </div>

          <div id="report-error" class="text-xs font-semibold text-red-500 text-center"></div>

          <div class="pt-2">
            <button type="submit" id="report-submit" class="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium py-2.5 rounded text-xs transition-colors uppercase tracking-wider font-semibold">Enviar Reporte</button>
          </div>
        </form>
      `,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            buttonsStyling: false,
            customClass: {
                popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-md w-full font-sans",
                cancelButton:
                    "w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-755 text-xs font-semibold py-2 rounded transition-colors text-center",
            },
            didOpen: async () => {
                const dropzone = document.getElementById("dropzone");
                const fileInput = document.getElementById("report-files");
                const filesList = document.getElementById("files-list");
                const errorEl = document.getElementById("report-error");

                // Elementos de tracking visual
                const chkGPS = document.getElementById("use-location");
                const locStatus = document.getElementById("loc-status");

                const chkTarget = document.getElementById(
                    "use-target-location",
                );
                const labelTarget = document.getElementById("use-target-label");
                const targetStatus = document.getElementById("target-status");

                let selectedCat = null;
                let files = [];

                chkGPS.addEventListener("change", () => {
                    if (chkGPS.checked) chkTarget.checked = false;
                });

                chkTarget.addEventListener("change", () => {
                    if (chkTarget.checked) chkGPS.checked = false;
                });

                // === CONTROL DEL MARCADOR OBJETIVO (PUNTO ROJO) ===
                const targetCoords = getTargetLocation();

                Promise.resolve()
                    .then(async () => {
                        // === CONTROL DE LA UBICACIÓN ACTUAL (GPS) ===
                        locStatus.textContent = "Obteniendo ubicación...";

                        const currentCoords = await get_location();
                        console.log(
                            "Ubicación actual obtenida:",
                            currentCoords,
                        );
                        locStatus.textContent = "Buscando dirección...";

                        const address = await findMailingAddress(
                            currentCoords.lat,
                            currentCoords.lon,
                        );
                        locStatus.textContent = address;
                    })
                    .catch((error) => {
                        console.error(error);
                        locStatus.textContent =
                            "Problemas obteniendo la dirección.";
                    });
                Promise.resolve()
                    .then(async () => {
                        if (!targetCoords) return;
                        chkTarget.removeAttribute("disabled");
                        labelTarget.className =
                            "flex items-center gap-2 text-xs text-zinc-600 cursor-pointer";

                        targetStatus.textContent = "Buscando dirección...";

                        // Salvavidas: Extraemos 'lon' o 'lng' por si la librería usa la nomenclatura estándar de mapas
                        const longitude = targetCoords.lon ?? targetCoords.lng;

                        targetStatus.textContent = await findMailingAddress(
                            targetCoords.lat,
                            longitude,
                        );
                    })
                    .catch((error) => {
                        console.error(error);

                        if (!targetStatus.textContent) {
                            targetStatus.textContent = "No disponible";
                        }
                        locStatus.textContent =
                            "Problemas obteniendo la dirección.";
                    });

                // Botones de categoría
                document.querySelectorAll(".report-cat").forEach((btn) => {
                    btn.style.backgroundColor = "#ffffff";
                    btn.style.color = "#3f3f46";
                    btn.style.borderColor = "#e4e4e7";
                    btn.style.fontWeight = "500";
                    btn.addEventListener("click", () => {
                        document
                            .querySelectorAll(".report-cat")
                            .forEach((b) => {
                                b.style.backgroundColor = "#ffffff";
                                b.style.color = "#3f3f46";
                                b.style.borderColor = "#e4e4e7";
                                b.style.fontWeight = "500";
                            });
                        btn.style.backgroundColor = "#f4f4f5";
                        btn.style.color = "#09090b";
                        btn.style.borderColor = "#71717a";
                        btn.style.fontWeight = "600";
                        selectedCat = btn.dataset.cat;
                    });
                });

                // Drag and drop setup
                dropzone.addEventListener("click", () => fileInput.click());
                fileInput.addEventListener("change", (e) => {
                    files = Array.from(e.target.files);
                    renderFilesList();
                });
                dropzone.addEventListener("dragover", (e) => {
                    e.preventDefault();
                    dropzone.classList.add("bg-zinc-100");
                });
                dropzone.addEventListener("dragleave", () => {
                    dropzone.classList.remove("bg-zinc-100");
                });
                dropzone.addEventListener("drop", (e) => {
                    e.preventDefault();
                    dropzone.classList.remove("bg-zinc-100");
                    const dropped = Array.from(e.dataTransfer.files || []);
                    files = files.concat(dropped).slice(0, 8);
                    renderFilesList();
                });

                function renderFilesList() {
                    if (!files.length) {
                        filesList.textContent = "";
                        return;
                    }
                    filesList.innerHTML = files
                        .map(
                            (f) =>
                                `<div class="py-1">${f.name} <span class="text-zinc-400">(${Math.round(f.size / 1024)} KB)</span></div>`,
                        )
                        .join("");
                }

                // === SUBMIT DEL FORMULARIO ===
                document
                    .getElementById("report-form")
                    .addEventListener("submit", (ev) => {
                        ev.preventDefault();
                        if (errorEl) errorEl.textContent = "";
                        const desc = document
                            .getElementById("report-desc")
                            ?.value?.trim();
                        if (!selectedCat) {
                            if (errorEl)
                                errorEl.textContent =
                                    "Seleccione una categoría.";
                            return;
                        }
                        if (!desc) {
                            if (errorEl)
                                errorEl.textContent =
                                    "Agregue una descripción.";
                            return;
                        }

                        // Capturamos el texto de la dirección limpia guardada en los estados visuales
                        let finalLocation = "Ubicación Manual";
                        if (chkGPS.checked) {
                            finalLocation = locStatus.textContent;
                        } else if (chkTarget.checked) {
                            finalLocation = targetStatus.textContent;
                        }

                        const reportData = {
                            id: `KP-${Math.floor(1000 + Math.random() * 9000)}`,
                            tipo:
                                selectedCat.charAt(0).toUpperCase() +
                                selectedCat.slice(1),
                            descripcion: desc,
                            ubicacion: finalLocation, // Guardará la calle legible
                            fecha: "Hace un momento",
                            estado: "Pendiente",
                        };

                        if (onSubmitCallback) {
                            onSubmitCallback(reportData);
                        }

                        Swal.close();
                        Swal.fire({
                            icon: "success",
                            title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Reporte enviado</h3>',
                            html: '<p class="text-xs text-zinc-500 text-left">Gracias por colaborar. Su reporte será evaluado por moderadores.</p>',
                            timer: 2000,
                            showConfirmButton: false,
                            buttonsStyling: false,
                            customClass: {
                                popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full",
                            },
                        });
                    });
            },
        });
    });
}
