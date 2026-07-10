import Swal from 'sweetalert2';

export function initReportModal(buttonId, onSubmitCallback) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('click', () => {
    Swal.fire({
      title: '<h3 class="text-base font-semibold text-zinc-900 text-left">Nuevo Reporte</h3>',
      html: `
        <div class="text-left space-y-4 font-sans">
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

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
              <input id="use-location" type="checkbox" class="w-3.5 h-3.5 border-zinc-300 rounded text-zinc-900 focus:ring-0" />
              <span>Usar mi ubicación actual</span>
            </label>
            <div id="loc-status" class="text-[10px] text-zinc-400 font-medium"></div>
          </div>

          <div id="report-error" class="text-xs font-semibold text-red-500 text-center"></div>

          <div class="pt-2">
            <button id="report-submit" class="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium py-2.5 rounded text-xs transition-colors uppercase tracking-wider font-semibold">Enviar Reporte</button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-md w-full font-sans',
        cancelButton: 'w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-755 text-xs font-semibold py-2 rounded transition-colors text-center'
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
          // Initialize style explicitly
          btn.style.backgroundColor = '#ffffff';
          btn.style.color = '#3f3f46';
          btn.style.borderColor = '#e4e4e7';
          btn.style.fontWeight = '500';

          btn.addEventListener('click', () => {
            document.querySelectorAll('.report-cat').forEach(b => {
              b.style.backgroundColor = '#ffffff';
              b.style.color = '#3f3f46';
              b.style.borderColor = '#e4e4e7';
              b.style.fontWeight = '500';
            });
            btn.style.backgroundColor = '#f4f4f5'; 
            btn.style.color = '#09090b';           
            btn.style.borderColor = '#71717a';     
            btn.style.fontWeight = '600';
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
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('bg-zinc-100'); });
        dropzone.addEventListener('dragleave', () => { dropzone.classList.remove('bg-zinc-100'); });
        dropzone.addEventListener('drop', (e) => {
          e.preventDefault(); dropzone.classList.remove('bg-zinc-100');
          const dropped = Array.from(e.dataTransfer.files || []);
          files = files.concat(dropped).slice(0, 8);
          renderFilesList();
        });

        function renderFilesList() {
          if (!files.length) {
            filesList.textContent = '';
            return;
          }
          filesList.innerHTML = files.map(f => `<div class="py-1">${f.name} <span class="text-zinc-400">(${Math.round(f.size/1024)} KB)</span></div>`).join('');
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

          const reportData = {
            id: `KP-${Math.floor(1000 + Math.random() * 9000)}`,
            tipo: selectedCat.charAt(0).toUpperCase() + selectedCat.slice(1),
            descripcion: desc,
            ubicacion: document.getElementById('use-location')?.checked ? (locStatus.textContent || 'Ubicación GPS') : 'Ubicación Manual',
            fecha: 'Hace un momento',
            estado: 'Pendiente'
          };

          if (onSubmitCallback) {
            onSubmitCallback(reportData);
          }

          Swal.close();
          Swal.fire({
            icon: 'success',
            title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Reporte enviado</h3>',
            html: '<p class="text-xs text-zinc-500 text-left">Gracias por colaborar. Su reporte será evaluado por moderadores.</p>',
            timer: 2000,
            showConfirmButton: false,
            buttonsStyling: false,
            customClass: { popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full' }
          });
        });
      }
    });
  });
}

export default initReportModal;

