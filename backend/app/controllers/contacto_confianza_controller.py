from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class ContactoConfianzaController:

    @staticmethod
    def create(id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    INSERT INTO contacto_confianza (id_usuario, nombre, telefono, correo, parentesco)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (
                        id_usuario,
                        datos.get("nombre"),
                        datos.get("telefono"),
                        datos.get("correo"),
                        datos.get("parentesco")
                    )
                )
                nuevo_contacto = cur.fetchone()
                conn.commit()
                return nuevo_contacto
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya existe un contacto con ese teléfono para este usuario.")
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
                cur.execute("SELECT * FROM contacto_confianza WHERE id_usuario = %s AND status = TRUE", (id_usuario,))
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_contacto: int, id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM contacto_confianza WHERE id_contacto = %s AND id_usuario = %s AND status = TRUE", (id_contacto, id_usuario))
                contacto = cur.fetchone()
                if not contacto:
                    raise HTTPException(status_code=404, detail="Contacto no encontrado o no pertenece a este usuario")
                return contacto
        finally:
            conn.close()

    @staticmethod
    def update(id_contacto: int, id_usuario: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE contacto_confianza
                    SET nombre = COALESCE(%s, nombre),
                        telefono = COALESCE(%s, telefono),
                        correo = COALESCE(%s, correo),
                        parentesco = COALESCE(%s, parentesco)
                    WHERE id_contacto = %s AND id_usuario = %s AND status = TRUE
                    RETURNING *;
                    """,
                    (
                        datos.get("nombre"),
                        datos.get("telefono"),
                        datos.get("correo"),
                        datos.get("parentesco"),
                        id_contacto,
                        id_usuario
                    )
                )
                actualizado = cur.fetchone()
                if not actualizado:
                    raise HTTPException(status_code=404, detail="Contacto no encontrado")
                conn.commit()
                return actualizado
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="El teléfono ya está registrado en otro de tus contactos.")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_contacto: int, id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "DELETE FROM contacto_confianza WHERE id_contacto = %s AND id_usuario = %s RETURNING id_contacto;",
                    (id_contacto, id_usuario)
                )
                borrado = cur.fetchone()
                if not borrado:
                    raise HTTPException(status_code=404, detail="Contacto no encontrado")
                conn.commit()
                return {"mensaje": "Contacto eliminado correctamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al eliminar: {str(e)}")
        finally:
            conn.close()
