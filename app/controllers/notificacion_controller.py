from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class NotificacionController:

    @staticmethod
    def create(id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    INSERT INTO notificacion (id_sos, id_usuario, titulo, mensaje, tipo)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (
                        datos.get("id_sos"),
                        id_usuario,
                        datos.get("titulo"),
                        datos.get("mensaje"),
                        datos.get("tipo")
                    )
                )
                nueva = cur.fetchone()
                conn.commit()
                return nueva
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def get_all(id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM notificacion WHERE id_usuario = %s AND status = TRUE ORDER BY created_at DESC", (id_usuario,))
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def mark_as_read(id_notificacion: int, id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE notificacion
                    SET leida = TRUE, fecha_leida = NOW()
                    WHERE id_notificacion = %s AND id_usuario = %s AND leida = FALSE AND status = TRUE
                    RETURNING *;
                    """,
                    (id_notificacion, id_usuario)
                )
                actualizada = cur.fetchone()
                if not actualizada:
                    raise HTTPException(status_code=404, detail="Notificación no encontrada o ya leída")
                conn.commit()
                return actualizada
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        finally:
            conn.close()
