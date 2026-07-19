from fastapi import HTTPException, UploadFile
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config.db_config import get_db_connection
import os
import uuid


class EvidenciaController:

    UPLOAD_FOLDER = "uploads"

    @staticmethod
    async def create(
        id_reporte: int,
        descripcion: str,
        archivo: UploadFile
    ):
        conn = get_db_connection()

        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:

                # Validar que el reporte exista
                cur.execute(
                    """
                    SELECT id_reporte
                    FROM reporte
                    WHERE id_reporte = %s
                    AND status = TRUE
                    """,
                    (id_reporte,)
                )

                if not cur.fetchone():
                    raise HTTPException(
                        status_code=404,
                        detail="El reporte especificado no existe o fue eliminado."
                    )

                # Crear carpeta uploads si no existe
                os.makedirs(EvidenciaController.UPLOAD_FOLDER, exist_ok=True)

                # Obtener extensión
                extension = archivo.filename.split(".")[-1]

                # Generar nombre único
                nombre_archivo = f"{uuid.uuid4()}.{extension}"

                # Ruta física
                ruta_archivo = os.path.join(
                    EvidenciaController.UPLOAD_FOLDER,
                    nombre_archivo
                )

                # Guardar archivo
                with open(ruta_archivo, "wb") as buffer:
                    buffer.write(await archivo.read())

                # URL que irá a la base de datos
                url_archivo = f"/uploads/{nombre_archivo}"

                # Determinar tipo
                if archivo.content_type.startswith("image"):
                    tipo_archivo = "imagen"

                elif archivo.content_type.startswith("video"):
                    tipo_archivo = "video"

                elif archivo.content_type.startswith("audio"):
                    tipo_archivo = "audio"

                else:
                    tipo_archivo = "otro"

                # Insertar en BD
                cur.execute(
                    """
                    INSERT INTO evidencia
                    (
                        id_reporte,
                        url_archivo,
                        tipo_archivo,
                        descripcion
                    )
                    VALUES
                    (
                        %s,
                        %s,
                        %s,
                        %s
                    )
                    RETURNING *;
                    """,
                    (
                        id_reporte,
                        url_archivo,
                        tipo_archivo,
                        descripcion
                    )
                )

                nueva_evidencia = cur.fetchone()

                conn.commit()

                return nueva_evidencia

        except psycopg2.Error as e:

            conn.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Error en la BD: {str(e)}"
            )

        except Exception as e:

            conn.rollback()

            raise HTTPException(
                status_code=500,
                detail=str(e)
            )

        finally:

            conn.close()

    @staticmethod
    def get_all_by_reporte(id_reporte: int):

        conn = get_db_connection()

        try:

            with conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(
                    """
                    SELECT *
                    FROM evidencia
                    WHERE id_reporte = %s
                    AND status = TRUE
                    """,
                    (id_reporte,)
                )

                return cur.fetchall()

        finally:

            conn.close()

    @staticmethod
    def get_by_id(id_evidencia: int):

        conn = get_db_connection()

        try:

            with conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(
                    """
                    SELECT *
                    FROM evidencia
                    WHERE id_evidencia = %s
                    AND status = TRUE
                    """,
                    (id_evidencia,)
                )

                evidencia = cur.fetchone()

                if not evidencia:

                    raise HTTPException(
                        status_code=404,
                        detail="Evidencia no encontrada."
                    )

                return evidencia

        finally:

            conn.close()

    @staticmethod
    def delete(id_evidencia: int):

        conn = get_db_connection()

        try:

            with conn.cursor(cursor_factory=RealDictCursor) as cur:

                # Obtener la ruta del archivo
                cur.execute(
                    """
                    SELECT url_archivo
                    FROM evidencia
                    WHERE id_evidencia=%s
                    AND status=TRUE
                    """,
                    (id_evidencia,)
                )

                evidencia = cur.fetchone()

                if not evidencia:

                    raise HTTPException(
                        status_code=404,
                        detail="Evidencia no encontrada."
                    )

                # Eliminar archivo físico
                ruta = evidencia["url_archivo"].replace("/", os.sep, 1)

                if os.path.exists(ruta):

                    os.remove(ruta)

                # Eliminación lógica
                cur.execute(
                    """
                    UPDATE evidencia
                    SET status = FALSE
                    WHERE id_evidencia = %s
                    RETURNING id_evidencia;
                    """,
                    (id_evidencia,)
                )

                conn.commit()

                return {
                    "mensaje": "Evidencia eliminada correctamente."
                }

        except psycopg2.Error as e:

            conn.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Error en la BD: {str(e)}"
            )

        finally:

            conn.close()