import { inicializarDashboard as initPolicia } from './components/perfilpolicia.js';
import { inicializarDashboard as initBomberos } from './components/perfilbomberos.js';
import { inicializarDashboard as initAmbulancia } from './components/perfilambulancia.js';

import './style.css';

function renderizarLogin() {
  const app = document.getElementById('app');
  if (!app) return;

  document.body.className = "bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center p-4 selection:bg-[#3b82f6] selection:text-white";

  app.innerHTML = `
    <div class="w-full max-w-md space-y-8 animate-fade-in py-12 mx-auto">
      
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-lg text-[#3b82f6] font-bold text-2xl shadow-xl select-none">
          K
        </div>
        <div class="space-y-1">
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-sans">
            Acceso KeeperR
          </h1>
          <p class="text-xs text-zinc-400 font-mono uppercase tracking-widest">
            Terminal de Monitoreo Ciudadano
          </p>
        </div>
      </div>

      <div class="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 shadow-2xl">
        <form id="login-form" class="space-y-4">
          <div>
            <label class="block text-xs font-mono text-zinc-400 mb-1">Identificación / Placa</label>
            <input type="text" id="login-user" class="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors" placeholder="Ej: PL-984572" required>
          </div>
          <div>
            <label class="block text-xs font-mono text-zinc-400 mb-1">Contraseña</label>
            <input type="password" id="login-pass" class="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors" placeholder="••••••••" required>
          </div>
          
          <div class="pt-2">
            <button type="submit" class="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2 rounded-md transition-colors">
              Iniciar Sesión
            </button>
          </div>
        </form>
        
        <div class="mt-4 p-3 bg-zinc-900/50 border border-zinc-800 rounded-md text-[10px] text-zinc-400 font-mono">
          <p class="mb-1 font-bold text-zinc-300">Simulador de Base de Datos (Roles):</p>
          <ul class="space-y-1">
            <li>Rol_ID = 1 (Policía): Usa <b>policia</b></li>
            <li>Rol_ID = 2 (Bomberos): Usa <b>bombero</b></li>
            <li>Rol_ID = 3 (Ambulancia): Usa <b>ambulancia</b></li>
          </ul>
        </div>
      </div>

    </div>
  `;

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('login-user').value.toLowerCase();
      
      // Simulador de consulta a la base de datos para obtener el Rol ID
      // 1 = Policía, 2 = Bomberos, 3 = Ambulancia
      let rol_id = null;
      if (user.includes('policia')) rol_id = 1;
      else if (user.includes('bombero')) rol_id = 2;
      else if (user.includes('ambulancia')) rol_id = 3;
      
      // Enrutamiento dinámico según el Rol ID (como en la BD)
      if (rol_id === 1) {
        cargarDashboardPolicia();
      } else if (rol_id === 2) {
        cargarDashboardBomberos();
      } else if (rol_id === 3) {
        cargarDashboardAmbulancia();
      } else {
        alert('Credenciales incorrectas o rol no encontrado en la base de datos.');
      }
    });
  }
}

function cargarDashboardPolicia() {
  document.body.className = "bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#ff5d00] selection:text-white";
  const app = document.getElementById('app');
  if (app) app.innerHTML = '';
  
  initPolicia();
  sobreescribirBotonSalir();
}

function cargarDashboardBomberos() {
  document.body.className = "bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#dc2626] selection:text-white";
  const app = document.getElementById('app');
  if (app) app.innerHTML = '';
  
  initBomberos();
  sobreescribirBotonSalir();
}

function cargarDashboardAmbulancia() {
  document.body.className = "bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#3b82f6] selection:text-white";
  const app = document.getElementById('app');
  if (app) app.innerHTML = '';
  
  initAmbulancia();
  sobreescribirBotonSalir();
}

function sobreescribirBotonSalir() {
  window.salirAlLogin = () => {
    window.location.reload();
  };

  const btnSalir = document.getElementById('btn-salir');
  if (btnSalir) {
    btnSalir.addEventListener('click', () => {
      const interval = setInterval(() => {
        const swalPopup = document.querySelector('.swal2-popup');
        if (swalPopup && swalPopup.textContent.includes('Sesión Finalizada')) {
          clearInterval(interval);
          
          const okButton = swalPopup.querySelector('.swal2-confirm');
          if (okButton) {
            okButton.addEventListener('click', () => {
              window.salirAlLogin();
            });
          }
          
          setTimeout(() => {
            window.salirAlLogin();
          }, 3000);
        }
      }, 200);

      setTimeout(() => clearInterval(interval), 15000);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarLogin();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderizarLogin();
}
