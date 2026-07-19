// Importamos los estilos globales de Tailwind
import "./style.css";
import Swal from "sweetalert2";

// Importamos los componentes modales
import { initRegisterModal } from "./src/components/modalComponent/registermodal.js";
import { initLoginModal } from "./src/components/modalComponent/loginmodal.js";
import { renderFeed, initFeed, addFeedReport } from "./src/views/feed.js";
import { initSOSModal } from "./src/components/modalComponent/sosModal.js";
import {
    renderHomepage,
    initHomepage,
    addHomepageReport,
    listReportes,
    cargarReportesHomepage,
    cargarLugaresHomepage,
} from "./src/views/homepage.js";
import { initReportModal } from "./src/components/modalComponent/reportModal.js";
import { landingPage } from "./src/views/landingPage.js";
import {
    initMap,
    cleanupMap,
    startRealTimeTracking,
} from "./src/controllers/mapManager.controller.js";

// Importamos los dashboards de Victoria
import { inicializarDashboard as initPolicia } from "./src/components/profileComponent/perfilpolicia.js";
import { inicializarDashboard as initBomberos } from "./src/components/profileComponent/perfilbomberos.js";
import { inicializarDashboard as initAmbulancia } from "./src/components/profileComponent/perfilambulancia.js";

import { getRoleById } from "./src/services/endpoints/roles.js";
import { inicializarMapaVea } from "./src/controllers/mapReport.controller.js";
import { feedState } from "./src/views/feed/feedState.js";


function renderLandingPage() {
    const app = document.querySelector("#app");
    app.innerHTML = landingPage;
}

// Enrutador de Login Unificado
async function handleLoginSuccess(loginData) {
    sessionStorage.setItem("usuarioLogueado", JSON.stringify(loginData));
    let nombre = loginData.nombres;
    let rol = loginData.id_rol;
    let rol_name = await getRoleById(rol);
    if (rol_name.nombre === "Policía") {
        cargarDashboardPolicia();
    } else if (rol_name.nombre === "Bomberos") {
        cargarDashboardBomberos();
    } else if (rol_name.nombre === "Ambulancia") {
        cargarDashboardAmbulancia();
    } else if (rol_name.nombre === "Administrador") {
        renderFeedPage();
    } else if (rol_name.nombre === "Ciudadano") {
        renderHomepagePage();
    }
}

async function renderFeedPage() {
    const app = document.querySelector("#app");
    app.innerHTML = renderFeed();
    await initFeed();
    await initSOSModal("btn-sos");
    // Conectar botón Salir del panel
    document
        .getElementById("feed-btn-logout")
        ?.addEventListener("click", async () => {
            Swal.fire({
                title: "¿Confirmar Salida?",
                text: "¿Estás seguro que deseas cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, salir",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#ea580c",
                cancelButtonColor: "#71717a",
                customClass: {
                    popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-sm w-full font-sans text-xs",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await cleanupMap();
                    window.location.reload();
                }
            });
        });
    //Integracion del mapa
    await inicializarMapaVea(feedState.listHistorialReportes, "feed-map-container");
    startRealTimeTracking();
}

async function renderHomepagePage() {
    const app = document.querySelector("#app");
    await cargarReportesHomepage();
    await cargarLugaresHomepage();
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
    await inicializarMapaVea(listReportes);
    startRealTimeTracking();
    // Conectar botón Salir del panel
    document
        .getElementById("homepage-btn-logout")
        ?.addEventListener("click", async () => {
            Swal.fire({
                title: "¿Confirmar Salida?",
                text: "¿Estás seguro que deseas cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, salir",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#ea580c",
                cancelButtonColor: "#71717a",
                customClass: {
                    popup: "rounded-md p-6 border border-zinc-200 bg-white max-w-sm w-full font-sans text-xs",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await cleanupMap();
                    window.location.reload();
                }
            });
        });
}

async function renderLandingPagePage() {
    // Asegurar clases del body para el Landing Page
    document.body.className =
        "bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white";
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
}

// Funciones para cargar los dashboards del perfil de Victoria
function cargarDashboardPolicia() {
    document.body.className =
        "bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#ff5d00] selection:text-white";
    const app = document.getElementById("app");
    if (app) app.innerHTML = "";

    initPolicia();
    sobreescribirBotonSalir();
}

function cargarDashboardBomberos() {
    document.body.className =
        "bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#dc2626] selection:text-white";
    const app = document.getElementById("app");
    if (app) app.innerHTML = "";

    initBomberos();
    sobreescribirBotonSalir();
}

function cargarDashboardAmbulancia() {
    document.body.className =
        "bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#3b82f6] selection:text-white";
    const app = document.getElementById("app");
    if (app) app.innerHTML = "";

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

    const btnSalir = document.getElementById("btn-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            const interval = setInterval(() => {
                const swalPopup = document.querySelector(".swal2-popup");
                if (
                    swalPopup &&
                    swalPopup.textContent.includes("Sesión Finalizada")
                ) {
                    clearInterval(interval);

                    const okButton = swalPopup.querySelector(".swal2-confirm");
                    if (okButton) {
                        okButton.addEventListener("click", () => {
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
document.addEventListener("DOMContentLoaded", async() => {
    await renderLandingPagePage();
});

// Listener global para toggles del sidebar (menú hamburguesa móvil) en todos los perfiles
document.addEventListener("click", (e) => {
    // Abrir sidebar
    if (e.target.closest("#btn-toggle-sidebar")) {
        const sidebar = document.getElementById("sidebar-aside");
        const backdrop = document.getElementById("sidebar-backdrop");
        if (sidebar && backdrop) {
            sidebar.classList.remove("-translate-x-full");
            sidebar.classList.add("translate-x-0");
            backdrop.classList.remove("hidden");
        }
    }

    // Cerrar sidebar (clic en botón X o clic fuera en el backdrop)
    if (
        e.target.closest("#btn-close-sidebar") ||
        e.target.id === "sidebar-backdrop"
    ) {
        const sidebar = document.getElementById("sidebar-aside");
        const backdrop = document.getElementById("sidebar-backdrop");
        if (sidebar && backdrop) {
            sidebar.classList.add("-translate-x-full");
            sidebar.classList.remove("translate-x-0");
            backdrop.classList.add("hidden");
        }
    }

    // Auto-cerrar sidebar al cambiar de pestaña en celulares
    if (
        e.target.closest(".nav-item") ||
        e.target.closest(".sidebar-nav-btn") ||
        e.target.closest(".homepage-nav-btn")
    ) {
        if (window.innerWidth < 1024) {
            const sidebar = document.getElementById("sidebar-aside");
            const backdrop = document.getElementById("sidebar-backdrop");
            if (sidebar && backdrop) {
                sidebar.classList.add("-translate-x-full");
                sidebar.classList.remove("translate-x-0");
                backdrop.classList.add("hidden");
            }
        }
    }
});
