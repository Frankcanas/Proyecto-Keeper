// Importamos los estilos globales de Tailwind
import './style.css';

// Importamos los componentes modales
import { initRegisterModal } from './src/components/registermodal.js';
import { initLoginModal } from './src/components/loginmodal.js';
import { renderFeed, initFeed, addFeedReport } from './src/views/feed.js';
import { initSOSModal } from './src/components/sos.js';
import { renderHomepage, initHomepage, addHomepageReport } from './src/views/homepage.js';
import { initReportModal } from './src/components/reports.js';
import { landingPage } from './src/views/landingPage.js';
import { initMap } from './src/controllers/mapManager.controller.js';

function renderLandingPage() {
  const app = document.querySelector('#app');
  app.innerHTML = landingPage
}

function renderFeedPage() {
  const app = document.querySelector('#app');
  app.innerHTML = renderFeed();
  initFeed();
  initSOSModal('btn-sos');

  // Conectar botón Salir del panel
  document.getElementById('feed-btn-logout')?.addEventListener('click', () => {
    renderLandingPagePage();
  });
}

async function renderHomepagePage() {
  const app = document.querySelector('#app');
  app.innerHTML = renderHomepage();  
  initHomepage();
  //Integracion del mapa
  await initMap();
  initReportModal('homepage-report-btn', (report) => {
    addHomepageReport(report);
    addFeedReport(report);
  });
  initSOSModal('homepage-sos-btn', (report) => {
    addHomepageReport(report);
    addFeedReport(report);
  });

  // Conectar botón Salir del panel
  document.getElementById('homepage-btn-logout')?.addEventListener('click', async () => {
    await renderLandingPagePage();
  });
}

async function renderLandingPagePage() {
  renderLandingPage();

  // Conectamos los botones de la interfaz con sus respectivos modales
  initRegisterModal('btn-unirme');
  initLoginModal('btn-login', renderFeedPage);
  initLoginModal('btn-login-mobile', () => {
    document.getElementById('mobile-menu')?.classList.add('hidden');
    renderFeedPage();
  });

  // Hamburguer menu toggle logic
  const toggleBtn = document.getElementById('btn-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking on any link
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  document.getElementById('btn-preview-homepage')?.addEventListener('click', async() => {
    await renderHomepagePage()
  });
}

// Inicializamos la aplicación y conectamos los eventos
document.addEventListener('DOMContentLoaded', () => {
  renderLandingPagePage();
});