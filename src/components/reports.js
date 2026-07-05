import Swal from 'sweetalert2';

export function initReportModal(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('click', () => {
    Swal.fire({
      title: '<span class="text-2xl font-extrabold text-slate-900">Nuevo Reporte</span>',
      html: `
        <div class="text-left space-y-4">
          <div>
            <h4 class="text-xs font-semibold text-slate-500 uppercase">Categoría del incidente</h4>
            <div class="mt-3 flex gap-3">
              <button type="button" data-cat="robo" class="report-cat px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm flex-1">Robo</button>
              <button type="button" data-cat="vandalismo" class="report-cat px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm flex-1">Vandalismo</button>
              <button type="button" data-cat="peligro" class="report-cat px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm flex-1">Peligro</button>
            </div>
          </div>

          <div>
            <h4 class="text-xs font-semibold text-slate-500 uppercase">Descripción detallada</h4>
            <textarea id="report-desc" class="w-full mt-3 p-3 border border-slate-200 rounded-lg min-h-[120px] text-sm" placeholder="Escriba aquí los detalles de lo sucedido..."></textarea>
          </div>

          <div>
            <h4 class="text-xs font-semibold text-slate-500 uppercase">Evidencia (fotos/video)</h4>
            <div id="dropzone" class="mt-3 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center text-sm text-slate-500">
              <input id="report-files" type="file" accept="image/*,video/*" multiple class="hidden" />
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">☁️</div>
                <div>Arrastre archivos aquí o haga clic para seleccionar</div>
              </div>
            </div>
            <div id="files-list" class="mt-2 text-xs text-slate-600"></div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-slate-600"><input id="use-location" type="checkbox" class="w-4 h-4" /> Mi ubicación actual</label>
            <div id="loc-status" class="text-xs text-slate-500"></div>
          </div>

          <div id="report-error" class="text-sm text-red-500 text-center"></div>

          <div class="pt-2">
            <button id="report-submit" class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg">Enviar Reporte</button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 bg-white max-w-md w-full',
        cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg'
      },
      didOpen: () => {
        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('report-files');
        const filesList = document.getElementById('files-list');
        const errorEl = document.getElementById('report-error');
        const locStatus = document.getElementById('loc-status');
        let selectedCat = null;
        let files = [];

        // Category buttons
        document.querySelectorAll('.report-cat').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.report-cat').forEach(b => b.classList.remove('bg-slate-900','text-white'));
            btn.classList.add('bg-slate-900','text-white');
            selectedCat = btn.dataset.cat;
          });
        });

        // Dropzone click -> open file picker
        dropzone.addEventListener('click', () => fileInput.click());

        // Handle file input change
        fileInput.addEventListener('change', (e) => {
          files = Array.from(e.target.files);
          renderFilesList();
        });

        // Drag & drop
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('bg-slate-50'); });
        dropzone.addEventListener('dragleave', () => { dropzone.classList.remove('bg-slate-50'); });
        dropzone.addEventListener('drop', (e) => {
          e.preventDefault(); dropzone.classList.remove('bg-slate-50');
          const dropped = Array.from(e.dataTransfer.files || []);
          files = files.concat(dropped).slice(0, 8);
          renderFilesList();
        });

        function renderFilesList() {
          if (!files.length) {
            filesList.textContent = '';
            return;
          }
          filesList.innerHTML = files.map(f => `<div class="py-1">${f.name} <span class="text-xs text-slate-400">(${Math.round(f.size/1024)} KB)</span></div>`).join('');
        }

        // Location toggle
        document.getElementById('use-location').addEventListener('change', (e) => {
          if (e.target.checked) {
            locStatus.textContent = 'Obteniendo ubicación...';
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                locStatus.textContent = `Lat ${pos.coords.latitude.toFixed(4)}, Lon ${pos.coords.longitude.toFixed(4)}`;
              }, () => { locStatus.textContent = 'Permiso denegado'; });
            } else {
              locStatus.textContent = 'Geolocalización no disponible';
            }
          } else {
            locStatus.textContent = '';
          }
        });

        // Submit
        document.getElementById('report-submit').addEventListener('click', (ev) => {
          ev.preventDefault();
          if (errorEl) errorEl.textContent = '';
          const desc = document.getElementById('report-desc')?.value?.trim();
          if (!selectedCat) { if (errorEl) errorEl.textContent = 'Seleccione una categoría.'; return; }
          if (!desc) { if (errorEl) errorEl.textContent = 'Agregue una descripción.'; return; }

          // Simulate upload / send
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Reporte enviado',
            html: '<p class="text-sm text-slate-600">Gracias por reportar. Su reporte será revisado.</p>',
            timer: 2000,
            showConfirmButton: false,
            buttonsStyling: false,
            customClass: { popup: 'rounded-3xl p-6 shadow-xl' }
          });
        });
      }
    });
  });
}

export default initReportModal;
