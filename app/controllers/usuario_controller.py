import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
from app.config.db_config import get_db_connection
from app.models.usuario_model import Usuario, UsuarioUpdate
from app.utils.password_handler import hash_password

class UsuarioController:
    
    @staticmethod
    def get_all():
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Se excluye el password_hash en la respuesta por seguridad
                cur.execute('''
                    SELECT id_usuario, id_rol, nombres, apellidos, fecha_nacimiento, 
                           cedula, correo, telefono, foto_perfil, status, created_at, updated_at 
                    FROM usuario 
                    WHERE status = TRUE ORDER BY id_usuario ASC
                ''')
                usuarios = cur.fetchall()
                return usuarios
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_usuario: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('''
                    SELECT id_usuario, id_rol, nombres, apellidos, fecha_nacimiento, 
                           cedula, correo, telefono, foto_perfil, status, created_at, updated_at 
                    FROM usuario 
                    WHERE id_usuario = %s AND status = TRUE
                ''', (id_usuario,))
                usuario = cur.fetchone()
                if not usuario:
                    raise HTTPException(status_code=404, detail="Usuario no encontrado")
                return usuario
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def create(usuario_data: Usuario):
        # Hasheamos la contraseña antes de guardarla
        hashed_pw = hash_password(usuario_data.password_hash)
        
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    '''
                    INSERT INTO usuario (
                        id_rol, nombres, apellidos, fecha_nacimiento, cedula, correo, telefono, password_hash, foto_perfil
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id_usuario, correo
                    ''',
                    (
                        usuario_data.id_rol, usuario_data.nombres, usuario_data.apellidos, 
                        usuario_data.fecha_nacimiento, usuario_data.cedula, usuario_data.correo, 
                        usuario_data.telefono, hashed_pw, usuario_data.foto_perfil
                    )
                )
                new_user = cur.fetchone()
                conn.commit()
                return {"mensaje": "Usuario creado exitosamente", "usuario": new_user}
        except psycopg2.errors.UniqueViolation as e:
            conn.rollback()
            error_msg = str(e)
            if 'cedula' in error_msg:
                detail = "La cédula ya está registrada"
            elif 'correo' in error_msg:
                detail = "El correo ya está registrado"
            elif 'telefono' in error_msg:
                detail = "El teléfono ya está registrado"
            else:
                detail = "Violación de restricción única"
            raise HTTPException(status_code=400, detail=detail)
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def update(id_usuario: int, usuario_data: UsuarioUpdate):
        conn = get_db_connection()
        try:
            # Validamos existencia
            UsuarioController.get_by_id(id_usuario)
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                update_fields = []
                values = []
                
                # Campos dinámicos
                if usuario_data.id_rol is not None:
                    update_fields.append("id_rol = %s")
                    values.append(usuario_data.id_rol)
                if usuario_data.nombres is not None:
                    update_fields.append("nombres = %s")
                    values.append(usuario_data.nombres)
                if usuario_data.apellidos is not None:
                    update_fields.append("apellidos = %s")
                    values.append(usuario_data.apellidos)
                if usuario_data.fecha_nacimiento is not None:
                    update_fields.append("fecha_nacimiento = %s")
                    values.append(usuario_data.fecha_nacimiento)
                if usuario_data.cedula is not None:
                    update_fields.append("cedula = %s")
                    values.append(usuario_data.cedula)
                if usuario_data.correo is not None:
                    update_fields.append("correo = %s")
                    values.append(usuario_data.correo)
                if usuario_data.telefono is not None:
                    update_fields.append("telefono = %s")
                    values.append(usuario_data.telefono)
                if usuario_data.password_hash is not None:
                    update_fields.append("password_hash = %s")
                    values.append(hash_password(usuario_data.password_hash))
                if usuario_data.foto_perfil is not None:
                    update_fields.append("foto_perfil = %s")
                    values.append(usuario_data.foto_perfil)
                    
                if not update_fields:
                    return {"mensaje": "No hay campos para actualizar"}
                
                query = f"UPDATE usuario SET {', '.join(update_fields)} WHERE id_usuario = %s RETURNING id_usuario"
                values.append(id_usuario)
                
                cur.execute(query, tuple(values))
                conn.commit()
                return {"mensaje": "Usuario actualizado exitosamente"}
                
        except psycopg2.errors.UniqueViolation as e:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Los datos ingresados (cédula, correo o teléfono) ya pertenecen a otro usuario.")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_usuario: int):
        conn = get_db_connection()
        try:
            UsuarioController.get_by_id(id_usuario)
            with conn.cursor() as cur:
                cur.execute("UPDATE usuario SET status = FALSE WHERE id_usuario = %s", (id_usuario,))
                conn.commit()
                return {"mensaje": "Usuario eliminado exitosamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()
