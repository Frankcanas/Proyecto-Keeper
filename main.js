// Importamos los estilos globales de Tailwind
import "./style.css";

// Importamos los componentes modales
import { initRegisterModal } from "./src/components/registermodal.js";
import { initLoginModal } from "./src/components/loginmodal.js";
import { renderFeed, initFeed, addFeedReport } from "./src/views/feed.js";
import { initSOSModal } from "./src/components/sos.js";
import {
    renderHomepage,
    initHomepage,
    addHomepageReport,
} from "./src/views/homepage.js";
import { initReportModal } from "./src/components/reports.js";
import { landingPage } from "./src/views/landingPage.js";
import {
    initMap,
    cleanupMap,
    startRealTimeTracking,
} from "./src/controllers/mapManager.controller.js";

// Importamos los dashboards de Victoria
import { inicializarDashboard as initPolicia } from './src/components/perfilpolicia.js';
import { inicializarDashboard as initBomberos } from './src/components/perfilbomberos.js';
import { inicializarDashboard as initAmbulancia } from './src/components/perfilambulancia.js';

function renderLandingPage() {
    const app = document.querySelector("#app");
    app.innerHTML = landingPage;
}

// Enrutador de Login Unificado
function handleLoginSuccess(loginData) {
    let email = loginData.email.toLowerCase();
    // Normalizar acentos
    email = email.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (email.includes('policia')) {
        cargarDashboardPolicia();
    } else if (email.includes('bombero')) {
        cargarDashboardBomberos();
    } else if (email.includes('ambulancia')) {
        cargarDashboardAmbulancia();
    } else {
        renderFeedPage();
    }
}

async function renderFeedPage() {
    const app = document.querySelector("#app");
    app.innerHTML = renderFeed();
    initFeed();
    await initSOSModal("btn-sos");
    // Conectar botón Salir del panel
    document
        .getElementById("feed-btn-logout")
        ?.addEventListener("click", async() => {
            await cleanupMap();
            renderLandingPagePage();
        });
    //Integracion del mapa
    await initMap();
    startRealTimeTracking();
}

async function renderHomepagePage() {
    const app = document.querySelector("#app");
    app.innerHTML = renderHomepage();
    initHomepage();
    initReportModal("homepage-report-btn", (report) => {
        addHomepageReport(report);
        addFeedReport(report);
    });
    await initSOSModal("homepage-sos-btn", (report) => {
        addHomepageReport(report);
        addFeedReport(report);
    });
    //Integracion del mapa
    await initMap();
    startRealTimeTracking();
    // Conectar botón Salir del panel
    document
        .getElementById("homepage-btn-logout")
        ?.addEventListener("click", async () => {
            await cleanupMap();
            renderLandingPagePage();
        });
}

function renderLandingPagePage() {
    // Asegurar clases del body para el Landing Page
    document.body.className = "bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white";
    renderLandingPage();

    // Conectamos los botones de la interfaz con sus respectivos modales
    initRegisterModal("btn-unirme");
    initLoginModal("btn-login", handleLoginSuccess);
    initLoginModal("btn-login-mobile", (loginData) => {
        document.getElementById("mobile-menu")?.classList.add("hidden");
        handleLoginSuccess(loginData);
    });

    // Hamburguer menu toggle logic
    const toggleBtn = document.getElementById("btn-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        // Close menu when clicking on any link
        mobileMenu.querySelectorAll(".mobile-menu-link").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

    document
        .getElementById("btn-preview-homepage")
        ?.addEventListener("click", async () => {
            await renderHomepagePage();
        });
}

// Funciones para cargar los dashboards del perfil de Victoria
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
    // Limpiamos mapa en caso de que esté inicializado (seguridad)
    cleanupMap();
    // Recargamos al estado inicial (Landing Page)
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

// Inicializamos la aplicación y conectamos los eventos
document.addEventListener("DOMContentLoaded", () => {
    renderLandingPagePage();
});
