import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
from app.config.db_config import get_db_connection
from app.schemas.auth_schema import LoginSchema, RegistroSchema
from app.utils.password_handler import verify_password, hash_password
from app.utils.jwt_handler import create_access_token

class AuthController:
    
    @staticmethod
    def login(credenciales: LoginSchema):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Buscamos el usuario por su correo
                cur.execute(
                    "SELECT id_usuario, id_rol, nombres, password_hash FROM usuario WHERE correo = %s AND status = TRUE", 
                    (credenciales.correo,)
                )
                usuario = cur.fetchone()
                
                # Si el usuario no existe o la contraseña no coincide
                if not usuario or not verify_password(credenciales.contrasena, usuario['password_hash']):
                    raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
                
                # Si todo está bien, generamos el token JWT
                access_token = create_access_token(
                    data={"sub": str(usuario["id_usuario"]), "rol": usuario["id_rol"]}
                )
                
                return {
                    "access_token": access_token,
                    "token_type": "bearer",
                    "id_usuario": usuario["id_usuario"],
                    "id_rol": usuario["id_rol"],
                    "nombres": usuario["nombres"]
                }
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def registro(datos: RegistroSchema):
        # Hasheamos la contraseña
        hashed_pw = hash_password(datos.contrasena)
        
        # Asumimos que el ID 2 es para el rol de Ciudadano/Usuario Normal
        # Esto evita que el frontend tenga que enviar o decidir el id_rol
        ID_ROL_POR_DEFECTO = 2 
        
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Verificamos si el rol 2 existe en la BD (opcional pero buena práctica)
                cur.execute("SELECT id_rol FROM rol WHERE id_rol = %s", (ID_ROL_POR_DEFECTO,))
                if not cur.fetchone():
                    # Si no existe, podríamos insertarlo automáticamente o lanzar un error de configuración
                    cur.execute("INSERT INTO rol (id_rol, nombre, descripcion) VALUES (%s, 'Ciudadano', 'Usuario regular de la comunidad') ON CONFLICT DO NOTHING", (ID_ROL_POR_DEFECTO,))
                
                cur.execute(
                    '''
                    INSERT INTO usuario (
                        id_rol, nombres, apellidos, cedula, correo, telefono, password_hash
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id_usuario, correo
                    ''',
                    (
                        ID_ROL_POR_DEFECTO, datos.nombres, datos.apellidos, 
                        datos.cedula, datos.correo, datos.telefono, hashed_pw
                    )
                )
                nuevo_usuario = cur.fetchone()
                
                # Opcional: Generar el token inmediatamente después del registro para auto-login
                access_token = create_access_token(
                    data={"sub": str(nuevo_usuario["id_usuario"]), "rol": ID_ROL_POR_DEFECTO}
                )
                
                conn.commit()
                return {
                    "mensaje": "Usuario creado exitosamente",
                    "access_token": access_token,
                    "token_type": "bearer",
                    "usuario": nuevo_usuario
                }
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
                detail = "Los datos ingresados ya pertenecen a otro usuario."
            raise HTTPException(status_code=400, detail=detail)
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {str(e)}")
        finally:
            conn.close()
