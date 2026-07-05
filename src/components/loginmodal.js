import Swal from 'sweetalert2';

export function initLoginModal(buttonId, onSuccess) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('click', () => {
    Swal.fire({
      title: '<span class="text-2xl font-extrabold text-slate-900 tracking-tight">Iniciar Sesión</span>',
      html: `
        <p class="text-sm text-slate-500 mb-6 leading-relaxed">
          Ingresa a tu cuenta de <strong class="text-slate-800">keepeR</strong> para ver alertas y reportes en tiempo real.
        </p>
        <div class="space-y-4 text-left">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Correo Electrónico</label>
            <input id="swal-login-email" type="email" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition text-slate-800 placeholder-slate-400" placeholder="tucorreo@ejemplo.com" autocomplete="email">
          </div>
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Contraseña</label>
              <a href="#" class="text-xs text-orange-600 hover:text-orange-700 font-semibold transition">¿Olvidaste tu contraseña?</a>
            </div>
            <input id="swal-login-password" type="password" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition text-slate-800 placeholder-slate-400" placeholder="••••••••" autocomplete="current-password">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Entrar a mi cuenta',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      buttonsStyling: false, // Desactivamos estilos nativos para usar Tailwind
      customClass: {
        popup: 'rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 bg-white max-w-md w-full',
        title: 'p-0 mb-2',
        htmlContainer: 'm-0 p-0',
        actions: 'mt-8 flex justify-end space-x-3 w-full',
        confirmButton: 'bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition transform active:scale-95 text-sm',
        cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-6 py-3 rounded-xl transition text-sm'
      },
      preConfirm: () => {
        const email = document.getElementById('swal-login-email').value;
        const password = document.getElementById('swal-login-password').value;
        
        if (!email || !password) {
          Swal.showValidationMessage(
            '<span class="text-xs font-semibold text-red-500">Por favor, ingresa tu correo y contraseña.</span>'
          );
          return false;
        }
        return { email, password };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Alerta o Toast de bienvenida al iniciar sesión
        Swal.fire({
          icon: 'success',
          title: '<span class="text-xl font-bold text-slate-900">¡Sesión Iniciada!</span>',
          html: `<p class="text-sm text-slate-600">Bienvenido de nuevo. Conectando con el servidor de seguridad...</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-3xl p-6 shadow-2xl border border-slate-100 bg-white max-w-sm w-full'
          }
        }).then(() => {
          if (typeof onSuccess === 'function') {
            onSuccess();
          }
        });
      }
    });
  });
}