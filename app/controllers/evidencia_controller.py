from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class EvidenciaController:

    @staticmethod
    def create(datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Validar que el reporte exista
                cur.execute("SELECT id_reporte FROM reporte WHERE id_reporte = %s AND status = TRUE", (datos.get("id_reporte"),))
                if not cur.fetchone():
                    raise HTTPException(status_code=404, detail="El reporte especificado no existe o fue eliminado.")
                
                cur.execute(
                    """
                    INSERT INTO evidencia (id_reporte, url_archivo, tipo_archivo, descripcion)
                    VALUES (%s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (datos.get("id_reporte"), datos.get("url_archivo"), datos.get("tipo_archivo"), datos.get("descripcion"))
                )
                nueva_evidencia = cur.fetchone()
                conn.commit()
                return nueva_evidencia
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def get_all_by_reporte(id_reporte: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM evidencia WHERE id_reporte = %s AND status = TRUE", (id_reporte,))
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_evidencia: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM evidencia WHERE id_evidencia = %s AND status = TRUE", (id_evidencia,))
                ev = cur.fetchone()
                if not ev:
                    raise HTTPException(status_code=404, detail="Evidencia no encontrada")
                return ev
        finally:
            conn.close()

    @staticmethod
    def delete(id_evidencia: int):
        # NOTA: En un caso real, el borrado debería validar que el usuario dueño del reporte
        # es el que está intentando borrar la evidencia. Por simplicidad, se deja el borrado general.
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("UPDATE evidencia SET status = FALSE WHERE id_evidencia = %s RETURNING id_evidencia;", (id_evidencia,))
                borrado = cur.fetchone()
                if not borrado:
                    raise HTTPException(status_code=404, detail="Evidencia no encontrada")
                conn.commit()
                return {"mensaje": "Evidencia eliminada correctamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al eliminar: {str(e)}")
        finally:
            conn.close()
