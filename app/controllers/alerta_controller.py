from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class AlertaController:

    @staticmethod
    def create(datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Validar que el reporte exista
                cur.execute("SELECT id_reporte FROM reporte WHERE id_reporte = %s AND status = TRUE", (datos.get("id_reporte"),))
                if not cur.fetchone():
                    raise HTTPException(status_code=404, detail="El reporte origen no existe.")

                cur.execute(
                    """
                    INSERT INTO alerta (id_reporte, titulo, mensaje, radio_impacto_metros, fecha_expiracion)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (
                        datos.get("id_reporte"),
                        datos.get("titulo"),
                        datos.get("mensaje"),
                        datos.get("radio_impacto_metros"),
                        datos.get("fecha_expiracion")
                    )
                )
                nueva_alerta = cur.fetchone()
                conn.commit()
                return nueva_alerta
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def get_all():
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM alerta WHERE status = TRUE AND (fecha_expiracion IS NULL OR fecha_expiracion > NOW())")
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_alerta: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM alerta WHERE id_alerta = %s AND status = TRUE", (id_alerta,))
                al = cur.fetchone()
                if not al:
                    raise HTTPException(status_code=404, detail="Alerta no encontrada")
                return al
        finally:
            conn.close()
