import { initMap, initPointer } from "./assets/js/controllers/mapManager.controller";
import { callFastAPI } from "./assets/js/models/fastapiModel";

document.addEventListener("DOMContentLoaded", async()=>{
    const init = await initMap();
    const pointer = await initPointer();
    const fastapi = await callFastAPI()
    console.log(fastapi)
});
