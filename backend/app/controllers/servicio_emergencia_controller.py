from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class ServicioEmergenciaController:

    @staticmethod
    def create(datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    INSERT INTO servicio_emergencia (nombre, descripcion, telefono, instrucciones)
                    VALUES (%s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (datos.get("nombre"), datos.get("descripcion"), datos.get("telefono"), datos.get("instrucciones"))
                )
                nuevo = cur.fetchone()
                conn.commit()
                return nuevo
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya existe un servicio de emergencia con ese nombre.")
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
                cur.execute("SELECT * FROM servicio_emergencia WHERE status = TRUE")
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_servicio: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM servicio_emergencia WHERE id_servicio = %s AND status = TRUE", (id_servicio,))
                srv = cur.fetchone()
                if not srv:
                    raise HTTPException(status_code=404, detail="Servicio no encontrado")
                return srv
        finally:
            conn.close()

    @staticmethod
    def update(id_servicio: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE servicio_emergencia
                    SET nombre = COALESCE(%s, nombre),
                        descripcion = COALESCE(%s, descripcion),
                        telefono = COALESCE(%s, telefono),
                        instrucciones = COALESCE(%s, instrucciones)
                    WHERE id_servicio = %s AND status = TRUE
                    RETURNING *;
                    """,
                    (datos.get("nombre"), datos.get("descripcion"), datos.get("telefono"), datos.get("instrucciones"), id_servicio)
                )
                actualizado = cur.fetchone()
                if not actualizado:
                    raise HTTPException(status_code=404, detail="Servicio no encontrado")
                conn.commit()
                return actualizado
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya existe otro servicio con ese nombre.")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_servicio: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("UPDATE servicio_emergencia SET status = FALSE WHERE id_servicio = %s RETURNING id_servicio;", (id_servicio,))
                borrado = cur.fetchone()
                if not borrado:
                    raise HTTPException(status_code=404, detail="Servicio no encontrado")
                conn.commit()
                return {"mensaje": "Servicio de emergencia eliminado correctamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al eliminar: {str(e)}")
        finally:
            conn.close()
