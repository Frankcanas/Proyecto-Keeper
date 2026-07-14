from fastapi import HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection

class CategoriaController:

    @staticmethod
    def create(datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    INSERT INTO categoria (nombre, descripcion, icono, color)
                    VALUES (%s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (datos.get("nombre"), datos.get("descripcion"), datos.get("icono"), datos.get("color"))
                )
                nueva_cat = cur.fetchone()
                conn.commit()
                return nueva_cat
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya existe una categoría con ese nombre.")
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
                cur.execute("SELECT * FROM categoria WHERE status = TRUE")
                return cur.fetchall()
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_categoria: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM categoria WHERE id_categoria = %s AND status = TRUE", (id_categoria,))
                cat = cur.fetchone()
                if not cat:
                    raise HTTPException(status_code=404, detail="Categoría no encontrada")
                return cat
        finally:
            conn.close()

    @staticmethod
    def update(id_categoria: int, datos: dict):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE categoria
                    SET nombre = COALESCE(%s, nombre),
                        descripcion = COALESCE(%s, descripcion),
                        icono = COALESCE(%s, icono),
                        color = COALESCE(%s, color)
                    WHERE id_categoria = %s AND status = TRUE
                    RETURNING *;
                    """,
                    (datos.get("nombre"), datos.get("descripcion"), datos.get("icono"), datos.get("color"), id_categoria)
                )
                actualizada = cur.fetchone()
                if not actualizada:
                    raise HTTPException(status_code=404, detail="Categoría no encontrada")
                conn.commit()
                return actualizada
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Ya existe otra categoría con ese nombre.")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_categoria: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("UPDATE categoria SET status = FALSE WHERE id_categoria = %s RETURNING id_categoria;", (id_categoria,))
                borrada = cur.fetchone()
                if not borrada:
                    raise HTTPException(status_code=404, detail="Categoría no encontrada")
                conn.commit()
                return {"mensaje": "Categoría eliminada correctamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error al eliminar: {str(e)}")
        finally:
            conn.close()
