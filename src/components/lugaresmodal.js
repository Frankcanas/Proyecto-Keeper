import Swal from 'sweetalert2';

export function openLugarFormModal(lugar = null, onSaveCallback) {
  Swal.fire({
    title: `<div class="text-left font-sans"><h3 class="text-base font-semibold text-zinc-900">${lugar ? 'Editar Lugar Seguro' : 'Nuevo Lugar Seguro'}</h3><p class="text-zinc-500 mt-1 text-xs leading-relaxed">Configura perímetros de seguridad para geolocalización.</p></div>`,
    html: `
      <form id="swal-lugar-crud-form" class="space-y-4 mt-4 text-left font-sans">
        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Nombre del Lugar</label>
          <input id="lugar-nombre" type="text" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Ej. Mi Casa" value="${lugar ? lugar.nombre : ''}">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Tipo</label>
            <select id="lugar-tipo" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 bg-white">
              <option value="Casa" ${lugar && lugar.tipo === 'Casa' ? 'selected' : ''}>Casa</option>
              <option value="Trabajo" ${lugar && lugar.tipo === 'Trabajo' ? 'selected' : ''}>Trabajo</option>
              <option value="Otro" ${lugar && lugar.tipo === 'Otro' ? 'selected' : ''}>Otro</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Rango (metros)</label>
            <input id="lugar-metros" type="number" min="10" max="2000" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Ej. 100" value="${lugar ? lugar.metros : '100'}">
          </div>
        </div>

        <!-- Div / Área de Mapa para Geolocalización -->
        <div class="rounded border border-zinc-200 bg-zinc-50 p-3 mt-2 flex flex-col gap-1.5">
          <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ubicar en el Mapa</div>
          <div class="relative h-28 w-full bg-zinc-950 border border-zinc-850 rounded overflow-hidden flex items-center justify-center">
            <!-- Calles vectoriales (SVG) -->
            <div class="absolute inset-0 opacity-40 pointer-events-none">
              <svg viewBox="0 0 400 150" class="h-full w-full stroke-orange-500/60" stroke-width="1.5" stroke-linecap="round">
                <line x1="50" y1="0" x2="100" y2="150" />
                <line x1="0" y1="60" x2="400" y2="90" />
                <line x1="180" y1="0" x2="180" y2="150" stroke-width="3" stroke="#ea580c" />
                <circle cx="180" cy="80" r="6" fill="#ea580c" class="animate-pulse" />
                <line x1="300" y1="0" x2="250" y2="150" />
              </svg>
            </div>
            
            <!-- Indicador de señal -->
            <span class="text-[9px] font-bold text-white flex items-center gap-1.5 z-10 bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-800">
              <span class="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Ubicación Actual Detectada (GPS)
            </span>
          </div>
        </div>

        <div id="lugar-modal-error" class="text-xs font-semibold text-red-500 text-center"></div>

        <button id="lugar-modal-submit" type="button" class="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium py-2.5 rounded text-xs transition-colors mt-2 uppercase tracking-wider font-semibold">
          ${lugar ? 'Guardar Cambios' : 'Registrar Lugar'}
        </button>
      </form>
    `,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    buttonsStyling: false,
    customClass: {
      popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-md w-full font-sans',
      cancelButton: 'w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold py-2 rounded transition-colors text-center'
    },
    didOpen: () => {
      const submitBtn = document.getElementById('lugar-modal-submit');
      const errorEl = document.getElementById('lugar-modal-error');

      submitBtn.addEventListener('click', () => {
        const nombre = document.getElementById('lugar-nombre').value.trim();
        const tipo = document.getElementById('lugar-tipo').value;
        const metros = parseInt(document.getElementById('lugar-metros').value.trim());

        if (!nombre || !tipo || isNaN(metros) || metros <= 0) {
          errorEl.textContent = 'Por favor, complete todos los campos.';
          return;
        }

        onSaveCallback(nombre, tipo, metros);
        Swal.close();
      });
    }
  });
}
