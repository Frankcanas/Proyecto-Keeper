import { inicializarDashboard as initPolicia } from './components/perfilpolicia.js';
import { inicializarDashboard as initBomberos } from './components/perfilbomberos.js';
import { inicializarDashboard as initAmbulancia } from './components/perfilambulancia.js';


import './style.css';


function renderizarSeleccionRoles() {
  const app = document.getElementById('app');
  if (!app) return;

  
  document.body.className = "bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center p-4 selection:bg-[#3b82f6] selection:text-white";

  app.innerHTML = `
    <div class="w-full max-w-6xl space-y-8 animate-fade-in py-12">
      
      <!-- Cabecera Principal -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-lg text-[#3b82f6] font-bold text-2xl shadow-xl select-none">
          K
        </div>
        <div class="space-y-1">
          <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-sans">
            keeperR Control
          </h1>
          <p class="text-xs text-zinc-400 font-mono uppercase tracking-widest">
            Terminal de Monitoreo Ciudadano & Emergencias
          </p>
        </div>
        <div class="h-[1px] w-24 bg-zinc-800 mx-auto mt-4"></div>
      </div>

      <!-- Tarjetas de Selección de Roles (3 Columnas para Policía, Bomberos y Ambulancia) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
        
        <!-- CARD POLICÍA (Tema Verde Militar) -->
        <div id="card-rol-policia" class="group relative bg-[#070f0b] border border-zinc-800 hover:border-emerald-500/50 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between h-72">
          <div class="absolute top-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <!-- Icono Policía/Escudo -->
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white tracking-tight">Policía Nacional</h3>
              <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
                Consola táctica de vigilancia, registro de delitos, alteración del orden público y control del cuadrante de seguridad ciudadana.
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono font-bold text-zinc-550 group-hover:text-emerald-400 transition-colors">
            <span>OPERACIÓN DE PATRULLAS</span>
            <span class="flex items-center gap-1">INGRESAR <span class="transform group-hover:translate-x-1 transition-transform">&rarr;</span></span>
          </div>
        </div>

        <!-- CARD BOMBEROS (Tema Rojo) -->
        <div id="card-rol-bomberos" class="group relative bg-[#100909] border border-zinc-800 hover:border-red-500/50 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] flex flex-col justify-between h-72">
          <div class="absolute top-0 left-0 right-0 h-1 bg-red-500 rounded-t-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <!-- Icono Fuego/Bombero -->
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white tracking-tight">Cuerpo de Bomberos</h3>
              <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
                Consola de atención prioritaria de incendios estructurales/forestales, fugas de gas, derrames químicos y rescate urbano.
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono font-bold text-zinc-550 group-hover:text-red-400 transition-colors">
            <span>CONTROL DE INCENDIOS & RESCATE</span>
            <span class="flex items-center gap-1">INGRESAR <span class="transform group-hover:translate-x-1 transition-transform">&rarr;</span></span>
          </div>
        </div>

        <!-- CARD AMBULANCIA (Tema Azul) -->
        <div id="card-rol-ambulancia" class="group relative bg-[#090e1a] border border-zinc-800 hover:border-blue-500/50 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col justify-between h-72">
          <div class="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              <!-- Icono Emergencias Médicas/Corazón -->
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white tracking-tight">Servicio de Ambulancia</h3>
              <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
                Consola de control para atención prehospitalaria, reporte de accidentes de tránsito, crisis cardiovasculares y traslados de urgencia.
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono font-bold text-zinc-550 group-hover:text-blue-400 transition-colors">
            <span>ATENCIÓN PREHOSPITALARIA Y TRAUMA</span>
            <span class="flex items-center gap-1">INGRESAR <span class="transform group-hover:translate-x-1 transition-transform">&rarr;</span></span>
          </div>
        </div>

      </div>

      <!-- Footer Info -->
      <p class="text-center text-[10px] text-zinc-650 font-mono">
        keeperR Inc. &copy; 2026 &bull; Conexión encriptada SSL
      </p>

    </div>
  `;

  
  const cardPolicia = document.getElementById('card-rol-policia');
  if (cardPolicia) {
    cardPolicia.addEventListener('click', () => {
      cargarDashboardPolicia();
    });
  }

  const cardBomberos = document.getElementById('card-rol-bomberos');
  if (cardBomberos) {
    cardBomberos.addEventListener('click', () => {
      cargarDashboardBomberos();
    });
  }

  const cardAmbulancia = document.getElementById('card-rol-ambulancia');
  if (cardAmbulancia) {
    cardAmbulancia.addEventListener('click', () => {
      cargarDashboardAmbulancia();
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
  renderizarSeleccionRoles();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderizarSeleccionRoles();
}
