from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class ConfirmacionComunitariaController:

    @staticmethod
    def create(id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Validar que el reporte exista
                cur.execute("SELECT id_reporte FROM reporte WHERE id_reporte = %s AND status = TRUE", (datos.get("id_reporte"),))
                if not cur.fetchone():
                    raise HTTPException(status_code=404, detail="El reporte no existe.")

                cur.execute(
                    """
                    INSERT INTO confirmacion_comunitaria (id_reporte, id_usuario, tipo, comentario)
                    VALUES (%s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (datos.get("id_reporte"), id_usuario, datos.get("tipo"), datos.get("comentario"))
                )
                nueva_conf = cur.fetchone()
                conn.commit()
                return nueva_conf
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya has confirmado o desmentido este reporte.")
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
                cur.execute("SELECT * FROM confirmacion_comunitaria WHERE id_reporte = %s AND status = TRUE", (id_reporte,))
                return cur.fetchall()
        finally:
            conn.close()
