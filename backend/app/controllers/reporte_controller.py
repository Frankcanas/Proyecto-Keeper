import json
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
from app.config.db_config import get_db_connection
from app.models.reporte_model import Reporte, ReporteUpdate

class ReporteController:
    
    @staticmethod
    def get_all():
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Usamos JOIN para traer información útil (nombre de categoría, estado y usuario)
                cur.execute('''
                    SELECT r.id_reporte, r.titulo, r.descripcion, r.latitud, r.longitud, 
                            r.fecha_reporte, r.hora_reporte, r.created_at,
                            u.id_usuario, u.nombres AS usuario_nombre,
                            c.id_categoria, c.nombre AS categoria_nombre,
                            e.id_estado, e.nombre_estado,
                            COALESCE(
                                (
                                    SELECT json_agg(
                                        json_build_object(
                                            'id_evidencia', ev.id_evidencia,
                                            'url', ev.url_archivo,
                                            'tipo', ev.tipo_archivo
                                        )
                                    )
                                    FROM evidencia ev
                                    WHERE ev.id_reporte = r.id_reporte AND ev.status = TRUE
                                ),
                                '[]'::json
                            ) AS evidencias
                    FROM reporte r
                    JOIN usuario u ON r.id_usuario = u.id_usuario
                    JOIN categoria c ON r.id_categoria = c.id_categoria
                    JOIN estado_reporte e ON r.id_estado = e.id_estado
                    WHERE r.status = TRUE
                    ORDER BY r.fecha_reporte DESC, r.hora_reporte DESC
                ''')
                reportes = cur.fetchall()
                for r in reportes:
                    if isinstance(r.get('evidencias'), str):
                        r['evidencias'] = json.loads(r['evidencias'])
                return reportes
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def get_by_id(id_reporte: int):
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('''
                    SELECT r.*, u.nombres AS usuario_nombre, c.nombre AS categoria_nombre, e.nombre_estado
                    FROM reporte r
                    JOIN usuario u ON r.id_usuario = u.id_usuario
                    JOIN categoria c ON r.id_categoria = c.id_categoria
                    JOIN estado_reporte e ON r.id_estado = e.id_estado
                    WHERE r.id_reporte = %s AND r.status = TRUE
                ''', (id_reporte,))
                reporte = cur.fetchone()
                if not reporte:
                    raise HTTPException(status_code=404, detail="Reporte no encontrado")
                return reporte
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def create(reporte_data: Reporte, id_usuario: int):
        # Asumimos que el id_estado = 1 significa "Pendiente" o "Recién Creado"
        ID_ESTADO_POR_DEFECTO = 1
        
        conn = get_db_connection()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Verificamos rápidamente si la categoría y el estado existen (buenas prácticas para evitar FK errors)
                cur.execute("SELECT id_estado FROM estado_reporte WHERE id_estado = %s", (ID_ESTADO_POR_DEFECTO,))
                if not cur.fetchone():
                    cur.execute("INSERT INTO estado_reporte (id_estado, nombre_estado, descripcion) VALUES (%s, 'Pendiente', 'Reporte recién creado') ON CONFLICT DO NOTHING", (ID_ESTADO_POR_DEFECTO,))
                
                cur.execute(
                    '''
                    INSERT INTO reporte (
                        id_usuario, id_categoria, id_estado, titulo, descripcion, latitud, longitud
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id_reporte
                    ''',
                    (
                        id_usuario, reporte_data.id_categoria, ID_ESTADO_POR_DEFECTO, 
                        reporte_data.titulo, reporte_data.descripcion, 
                        reporte_data.latitud, reporte_data.longitud
                    )
                )
                nuevo_reporte = cur.fetchone()
                conn.commit()
                return {"mensaje": "Reporte creado exitosamente", "id_reporte": nuevo_reporte["id_reporte"]}
        except psycopg2.errors.ForeignKeyViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="La categoría seleccionada no existe")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def update(id_reporte: int, reporte_data: ReporteUpdate):
        conn = get_db_connection()
        try:
            ReporteController.get_by_id(id_reporte) # Valida que exista
            
            with conn.cursor() as cur:
                update_fields = []
                values = []
                
                if reporte_data.id_categoria is not None:
                    update_fields.append("id_categoria = %s")
                    values.append(reporte_data.id_categoria)
                if reporte_data.id_estado is not None:
                    update_fields.append("id_estado = %s")
                    values.append(reporte_data.id_estado)
                if reporte_data.titulo is not None:
                    update_fields.append("titulo = %s")
                    values.append(reporte_data.titulo)
                if reporte_data.descripcion is not None:
                    update_fields.append("descripcion = %s")
                    values.append(reporte_data.descripcion)
                if reporte_data.latitud is not None:
                    update_fields.append("latitud = %s")
                    values.append(reporte_data.latitud)
                if reporte_data.longitud is not None:
                    update_fields.append("longitud = %s")
                    values.append(reporte_data.longitud)
                    
                if not update_fields:
                    return {"mensaje": "No hay campos para actualizar"}
                
                query = f"UPDATE reporte SET {', '.join(update_fields)} WHERE id_reporte = %s"
                values.append(id_reporte)
                
                cur.execute(query, tuple(values))
                conn.commit()
                return {"mensaje": "Reporte actualizado exitosamente"}
        except psycopg2.errors.ForeignKeyViolation:
            conn.rollback()
            raise HTTPException(status_code=400, detail="Categoría o Estado inválidos")
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def delete(id_reporte: int):
        conn = get_db_connection()
        try:
            ReporteController.get_by_id(id_reporte)
            with conn.cursor() as cur:
                cur.execute("DELETE FROM reporte WHERE id_reporte = %s", (id_reporte,))
                conn.commit()
                return {"mensaje": "Reporte eliminado exitosamente"}
        except psycopg2.Error as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")
        finally:
            conn.close()
