// Router
async function routerGenerator(path, event, callback) {
    event.preventDefault();
    window.history.pushState({}, "", path);
    if (callback) {
        await callback();
    }
    window.dispatchEvent(new Event("popstate"));
    return path;
};


export async function router(path, routers, element) {
    const appContainer = document.getElementById(element);
    appContainer.innerHTML = routes[path] || "<h1>404 - Página no encontrada</h1>";
}
