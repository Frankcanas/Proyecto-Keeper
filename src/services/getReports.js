import { fastApi } from "../api/fastApi";

/**
 * reporte_router.py
 * @returns este endpoint devuelve todos los reportes en un array 
 */
export const getAllReports = async() => fastApi.getAll("/reportes/")

