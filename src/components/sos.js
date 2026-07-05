import Swal from 'sweetalert2';

export function initSOSModal(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('click', () => {
    Swal.fire({
      title: '<div class="flex items-center gap-3"><svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-xl font-extrabold">ALERTA GLOBAL SOS</span></div>',
      html: `
        <div class="text-left space-y-4 mt-3">
          <p class="text-sm text-slate-400">Localización en tiempo real</p>
          <div class="grid gap-3">
            <div class="p-4 rounded-2xl bg-slate-800 text-white flex items-center justify-between">
              <div>
                <div class="text-sm font-bold">POLICÍA</div>
                <div class="text-xs text-orange-400">112 / 091</div>
              </div>
              <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-800">👮</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-800 text-white flex items-center justify-between">
              <div>
                <div class="text-sm font-bold">AMBULANCIA</div>
                <div class="text-xs text-orange-400">112 / 061</div>
              </div>
              <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-800">🚑</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-800 text-white flex items-center justify-between">
              <div>
                <div class="text-sm font-bold">BOMBEROS</div>
                <div class="text-xs text-orange-400">112 / 080</div>
              </div>
              <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-800">🚒</div>
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="text-sm font-medium">Contactos de Confianza</div>
            <label class="inline-flex items-center gap-2"><input id="sos-contacts-toggle" type="checkbox" class="w-5 h-5" checked /><span class="text-xs text-slate-500">Enviar SMS con tu ubicación</span></label>
          </div>

          <div class="mt-4">
            <div id="sos-progress" class="w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-2" style="display:none;"></div>
            <button id="sos-button" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 rounded-xl text-lg">⚠️ ALERTA GLOBAL SOS</button>
            <div id="sos-hint" class="text-xs text-slate-500 text-center mt-2">Mantén presionado para cancelar en 3s</div>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-900 bg-black text-white max-w-md w-full',
        closeButton: 'text-slate-400'
      },
      didOpen: () => {
        const sosBtn = document.getElementById('sos-button');
        const progress = document.getElementById('sos-progress');
        let holdTimer = null;
        let startTs = null;

        function triggerAlert() {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Alerta enviada',
            html: '<p class="text-sm text-slate-600">Se ha activado la alerta global. Servicios de emergencia y contactos han sido notificados.</p>',
            showConfirmButton: false,
            timer: 2500,
            buttonsStyling: false,
            customClass: { popup: 'rounded-3xl p-6 shadow-xl' }
          });
        }

        function startHold() {
          if (!progress) return;
          progress.style.display = 'block';
          progress.innerHTML = '';
          startTs = Date.now();
          const bar = document.createElement('div');
          bar.style.height = '100%';
          bar.style.width = '0%';
          bar.style.background = '#ffedd5';
          bar.style.transition = 'width 3s linear';
          progress.appendChild(bar);
          // force reflow then set width
          void bar.offsetWidth;
          bar.style.width = '100%';
          holdTimer = setTimeout(() => {
            triggerAlert();
          }, 3000);
        }

        function cancelHold() {
          if (holdTimer) clearTimeout(holdTimer);
          holdTimer = null;
          if (progress) { progress.style.display = 'none'; progress.innerHTML = ''; }
        }

        // mouse/touch support
        sosBtn.addEventListener('mousedown', startHold);
        sosBtn.addEventListener('touchstart', startHold);
        window.addEventListener('mouseup', cancelHold);
        window.addEventListener('touchend', cancelHold);

        // also allow click as fallback (quick press)
        sosBtn.addEventListener('click', (e) => {
          // prevent quick click from immediately triggering - require hold
          e.preventDefault();
          // show a confirmation modal for quick clicks
          Swal.fire({
            title: 'Confirmar Alerta',
            text: '¿Desea enviar una alerta global ahora?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            customClass: { confirmButton: 'bg-orange-600 text-white px-4 py-2 rounded-lg', cancelButton: 'bg-slate-100 px-4 py-2 rounded-lg' },
            buttonsStyling: false
          }).then(result => {
            if (result.isConfirmed) triggerAlert();
          });
        });
      }
    });
  });
}

export default initSOSModal;
