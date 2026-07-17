import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
from app.config.db_config import get_db_connection
from app.models.rol_model import Rol, RolUpdate

class RolController:
    
    @staticmethod
    def get_all():
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM rol WHERE status = TRUE ORDER BY id_rol ASC")
                roles = cur.fetchall()
                return roles
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_rol: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM rol WHERE id_rol = %s AND status = TRUE", (id_rol,))
                rol = cur.fetchone()
                if not rol:
                    raise HTTPException(status_code=404, detail="Rol no encontrado")
                return rol
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def create(rol_data: Rol):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "INSERT INTO rol (nombre, descripcion) VALUES (%s, %s) RETURNING *",
                    (rol_data.nombre, rol_data.descripcion)
                )
                new_rol = cur.fetchone()
                conn.commit()
                return new_rol
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="El nombre del rol ya existe")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def update(id_rol: int, rol_data: RolUpdate):
        conn = get_db_connection()
        try:
            # Primero verificamos si existe
            RolController.get_by_id(id_rol)
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Construcción dinámica del query de actualización
                update_fields = []
                values = []
                if rol_data.nombre is not None:
                    update_fields.append("nombre = %s")
                    values.append(rol_data.nombre)
                if rol_data.descripcion is not None:
                    update_fields.append("descripcion = %s")
                    values.append(rol_data.descripcion)
                    
                if not update_fields:
                    return RolController.get_by_id(id_rol)
                
                query = f"UPDATE rol SET {', '.join(update_fields)} WHERE id_rol = %s RETURNING *"
                values.append(id_rol)
                
                cur.execute(query, tuple(values))
                updated_rol = cur.fetchone()
                conn.commit()
                return updated_rol
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="El nombre del rol ya existe")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_rol: int):
        conn = get_db_connection()
        try:
            # Verificamos si existe antes de eliminar
            RolController.get_by_id(id_rol)
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Soft delete: cambiamos el status a FALSE
                cur.execute("UPDATE rol SET status = FALSE WHERE id_rol = %s RETURNING id_rol", (id_rol,))
                conn.commit()
                return {"mensaje": "Rol eliminado exitosamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()
