export const registerRoutes = (
    inicio,
    login,
    usuario,
    admin,
    policia,
    bombero,
    ambulancia
) => ({
    "/": inicio,
    "/login": login,
    "/usuario": usuario,
    "/admin": admin,
    "/policia": policia,
    "/bombero": bombero,
    "/ambulancia": ambulancia,
});

export async function navigateTo(path, event, callback) {
    event?.preventDefault();

    window.history.pushState({}, "", path);

    if (typeof callback === "function") {
        await callback();
    }

    window.dispatchEvent(new PopStateEvent("popstate"));
}

export async function renderCurrentRoute(routeMap, element) {
    const currentPath = window.location.pathname;
    const container = document.querySelector(element);

    const view = routeMap[currentPath] || routeMap["/"];

    container.innerHTML =
        typeof view === "function"
            ? await view()
            : view;
}