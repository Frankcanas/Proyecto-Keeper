// Router

const routes = (inicio, login, usuario, admin, policia, bombero, ambulancia) => {
    return {
        "/": inicio,
        "/login": login,
        "/usuario": usuario,
        "/admin": admin,
        "/policia": policia,
        "/bombero": bombero,
        "/ambulancia": ambulancia
    }
};

async async function routerGenerator(path, event, callback) {
    event.preventDefault();
    window.history.pushState({}, "", path);
    if (callback) {
        await callback();
    }
    window.dispatchEvent(new Event("popstate"));
    return path;
}

export async function router(routers, element) {
    const currentPath = window.location.pathname;
    const appContainer = document.querySelector(element);

    const view = routers(
        routers.inicio, 
        routers.login, 
        routers.usuario, 
        routers.admin, 
        routers.policia, 
        routers.bombero, 
        routers.ambulancia
    )[currentPath] || routers.inicio;

    if(typeof view === "function") {
        appContainer.innerHTML = await view();
    } else {
        appContainer.innerHTML = view;
    }   
}
