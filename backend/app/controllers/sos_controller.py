from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class SOSController:

    @staticmethod
    def create(id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT id_servicio FROM servicio_emergencia WHERE id_servicio = %s AND status = TRUE", (datos.get("id_servicio"),))
                if not cur.fetchone():
                    raise HTTPException(status_code=404, detail="El servicio de emergencia no existe.")

                cur.execute(
                    """
                    INSERT INTO sos (id_usuario, id_servicio, latitud, longitud, estado)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (
                        id_usuario,
                        datos.get("id_servicio"),
                        datos.get("latitud"),
                        datos.get("longitud"),
                        datos.get("estado", "realizado")
                    )
                )
                nuevo_sos = cur.fetchone()
                
                # Opcional: Aquí se podría insertar automáticamente en la tabla notificacion.
                
                conn.commit()
                return nuevo_sos
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
                cur.execute("SELECT * FROM sos WHERE id_usuario = %s AND status = TRUE", (id_usuario,))
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def update(id_sos: int, id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE sos
                    SET estado = COALESCE(%s, estado)
                    WHERE id_sos = %s AND id_usuario = %s AND status = TRUE
                    RETURNING *;
                    """,
                    (datos.get("estado"), id_sos, id_usuario)
                )
                actualizado = cur.fetchone()
                if not actualizado:
                    raise HTTPException(status_code=404, detail="SOS no encontrado o no te pertenece")
                conn.commit()
                return actualizado
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        finally:
            conn.close()
