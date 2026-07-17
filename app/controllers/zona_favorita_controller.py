from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class ZonaFavoritaController:

    @staticmethod
    def create(id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    INSERT INTO zona_favorita (id_usuario, nombre, tipo, latitud, longitud, radio_metros)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (
                        id_usuario,
                        datos.get("nombre"),
                        datos.get("tipo"),
                        datos.get("latitud"),
                        datos.get("longitud"),
                        datos.get("radio_metros")
                    )
                )
                nueva_zona = cur.fetchone()
                conn.commit()
                return nueva_zona
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya tienes una zona guardada con este nombre.")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def get_all(id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM zona_favorita WHERE id_usuario = %s AND status = TRUE", (id_usuario,))
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_zona: int, id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM zona_favorita WHERE id_zona = %s AND id_usuario = %s AND status = TRUE", (id_zona, id_usuario))
                zona = cur.fetchone()
                if not zona:
                    raise HTTPException(status_code=404, detail="Zona no encontrada o no te pertenece")
                return zona
        finally:
            conn.close()

    @staticmethod
    def update(id_zona: int, id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE zona_favorita
                    SET nombre = COALESCE(%s, nombre),
                        tipo = COALESCE(%s, tipo),
                        latitud = COALESCE(%s, latitud),
                        longitud = COALESCE(%s, longitud),
                        radio_metros = COALESCE(%s, radio_metros)
                    WHERE id_zona = %s AND id_usuario = %s AND status = TRUE
                    RETURNING *;
                    """,
                    (
                        datos.get("nombre"),
                        datos.get("tipo"),
                        datos.get("latitud"),
                        datos.get("longitud"),
                        datos.get("radio_metros"),
                        id_zona,
                        id_usuario
                    )
                )
                actualizada = cur.fetchone()
                if not actualizada:
                    raise HTTPException(status_code=404, detail="Zona no encontrada")
                conn.commit()
                return actualizada
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya tienes otra zona guardada con este nombre.")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_zona: int, id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "DELETE FROM zona_favorita WHERE id_zona = %s AND id_usuario = %s RETURNING id_zona;",
                    (id_zona, id_usuario)
                )
                borrada = cur.fetchone()
                if not borrada:
                    raise HTTPException(status_code=404, detail="Zona no encontrada")
                conn.commit()
                return {"mensaje": "Zona favorita eliminada correctamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al eliminar: {str(e)}")
        finally:
            conn.close()
