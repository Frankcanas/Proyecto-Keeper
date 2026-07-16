from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class ValidacionController:

    @staticmethod
    def create(id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Validar que el reporte exista
                cur.execute("SELECT id_reporte FROM reporte WHERE id_reporte = %s AND status = TRUE", (datos.get("id_reporte"),))
                if not cur.fetchone():
                    raise HTTPException(status_code=404, detail="El reporte a validar no existe.")

                cur.execute(
                    """
                    INSERT INTO validacion (id_reporte, id_usuario, decision, comentario)
                    VALUES (%s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (datos.get("id_reporte"), id_usuario, datos.get("decision"), datos.get("comentario"))
                )
                nueva_val = cur.fetchone()
                
                # Actualizar el estado del reporte según la decisión (asumiendo IDs estáticos o buscando)
                # Opcionalmente se puede hacer aquí, pero por diseño se requiere otra query.
                
                conn.commit()
                return nueva_val
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya has validado este reporte anteriormente.")
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
                cur.execute("SELECT * FROM validacion WHERE id_reporte = %s AND status = TRUE", (id_reporte,))
                return cur.fetchall()
        finally:
            conn.close()
