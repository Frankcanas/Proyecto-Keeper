from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class EstadoReporteController:

    @staticmethod
    def create(datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    INSERT INTO estado_reporte (nombre_estado, descripcion)
                    VALUES (%s, %s)
                    RETURNING *;
                    """,
                    (datos.get("nombre_estado"), datos.get("descripcion"))
                )
                nuevo = cur.fetchone()
                conn.commit()
                return nuevo
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya existe un estado con ese nombre.")
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
                cur.execute("SELECT * FROM estado_reporte WHERE status = TRUE")
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_estado: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM estado_reporte WHERE id_estado = %s AND status = TRUE", (id_estado,))
                est = cur.fetchone()
                if not est:
                    raise HTTPException(status_code=404, detail="Estado no encontrado")
                return est
        finally:
            conn.close()

    @staticmethod
    def update(id_estado: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE estado_reporte
                    SET nombre_estado = COALESCE(%s, nombre_estado),
                        descripcion = COALESCE(%s, descripcion)
                    WHERE id_estado = %s AND status = TRUE
                    RETURNING *;
                    """,
                    (datos.get("nombre_estado"), datos.get("descripcion"), id_estado)
                )
                actualizado = cur.fetchone()
                if not actualizado:
                    raise HTTPException(status_code=404, detail="Estado no encontrado")
                conn.commit()
                return actualizado
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya existe otro estado con ese nombre.")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_estado: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("UPDATE estado_reporte SET status = FALSE WHERE id_estado = %s RETURNING id_estado;", (id_estado,))
                borrado = cur.fetchone()
                if not borrado:
                    raise HTTPException(status_code=404, detail="Estado no encontrado")
                conn.commit()
                return {"mensaje": "Estado eliminado correctamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al eliminar: {str(e)}")
        finally:
            conn.close()
