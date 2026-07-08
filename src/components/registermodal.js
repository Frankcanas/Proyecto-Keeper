import Swal from 'sweetalert2';

export function initRegisterModal(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('click', () => {
    Swal.fire({
      title: '<div class="text-left"><h2 class="text-2xl font-bold text-slate-900">Únete a keepeR</h2><p class="text-slate-600 mt-2 text-sm">Sé parte de una red colaborativa dedicada a la vigilancia y seguridad de nuestra comunidad.</p></div>',
      html: `
        <form id="swal-register-form" class="space-y-4 mt-4 text-left">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1">Nombre</label>
              <input id="reg-nombre" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Ej. Juan">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1">Apellido</label>
              <input id="reg-apellido" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Ej. Pérez">
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Cédula</label>
            <input id="reg-cedula" type="text" inputmode="numeric" pattern="[0-9]*" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Número de cédula">
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Correo electrónico</label>
            <input id="reg-email" type="email" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="tu@email.com">
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Teléfono</label>
            <input id="reg-telefono" type="tel" inputmode="tel" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Ej. +57 320 530 22 45">
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Fecha de nacimiento</label>
            <input id="reg-fecha-nacimiento" type="date" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
              <input id="reg-password" type="password" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Mínimo 8 caracteres">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1">Confirmar contraseña</label>
              <input id="reg-password-confirm" type="password" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Repetir contraseña">
            </div>
          </div>

          <div id="reg-error" class="text-sm text-red-500 text-center"></div>

          <button id="reg-submit" class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg transition mt-2">
            Crear cuenta →
          </button>

          <div class="flex items-center my-4">
            <div class="flex-1 h-px bg-slate-300"></div>
            <span class="px-3 text-xs text-slate-500 uppercase">O regístrate con</span>
            <div class="flex-1 h-px bg-slate-300"></div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button type="button" class="border border-slate-300 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50">Google</button>
            <button type="button" class="border border-slate-300 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50">Apple</button>
          </div>

          <p class="text-center text-sm text-slate-600 mt-4">
            ¿Ya tienes cuenta? <a href="#" id="switch-to-login" class="text-orange-700 font-semibold">Inicia sesión</a>
          </p>
          
          <p class="text-[10px] text-slate-500 text-center mt-4">
            Al registrarte, aceptas nuestros <a href="#" class="underline">Términos de Servicio</a> y <a href="#" class="underline">Política de Privacidad</a>.
          </p>
        </form>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 bg-white max-w-md w-full',
      },
      didOpen: () => {
        const switchLink = document.getElementById('switch-to-login');
        if (switchLink) {
          switchLink.addEventListener('click', (event) => {
            event.preventDefault();
            Swal.close();
            document.getElementById('btn-login')?.click();
          });
        }

        const submitBtn = document.getElementById('reg-submit');
        const errEl = document.getElementById('reg-error');
        if (submitBtn) {
          submitBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (errEl) errEl.textContent = '';

            const nombre = document.getElementById('reg-nombre')?.value?.trim();
            const apellido = document.getElementById('reg-apellido')?.value?.trim();
            const cedula = document.getElementById('reg-cedula')?.value?.trim();
            const email = document.getElementById('reg-email')?.value?.trim();
            const telefono = document.getElementById('reg-telefono')?.value?.trim();
            const fechaNacimiento = document.getElementById('reg-fecha-nacimiento')?.value?.trim();
            const password = document.getElementById('reg-password')?.value || '';
            const passwordConfirm = document.getElementById('reg-password-confirm')?.value || '';

            if (!nombre || !apellido || !cedula || !email || !telefono || !fechaNacimiento || !password || !passwordConfirm) {
              if (errEl) errEl.textContent = 'Por favor completa todos los campos.';
              return;
            }
            if (password.length < 8) {
              if (errEl) errEl.textContent = 'La contraseña debe tener al menos 8 caracteres.';
              return;
            }
            if (password !== passwordConfirm) {
              if (errEl) errEl.textContent = 'Las contraseñas no coinciden.';
              return;
            }

            // Aquí podrías enviar los datos al servidor vía fetch/ajax.
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Registro enviado',
              html: '<p class="text-sm text-slate-600">Revisa tu correo para confirmar tu cuenta.</p>',
              showConfirmButton: false,
              timer: 2000,
              buttonsStyling: false,
              customClass: { popup: 'rounded-3xl p-6 shadow-xl' }
            });
          });
        }
      }
    });
  });
}