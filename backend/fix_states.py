import os
from app.config.db_config import get_db_connection

def insert_states():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            states = [
                (1, 'Pendiente', 'Reporte recién creado'),
                (2, 'Visto', 'El reporte ha sido visto'),
                (3, 'En revisión', 'El reporte está siendo revisado'),
                (4, 'Caso cerrado', 'El reporte ha sido completado y cerrado')
            ]
            for id_estado, nombre, desc in states:
                cur.execute(
                    "INSERT INTO estado_reporte (id_estado, nombre_estado, descripcion) VALUES (%s, %s, %s) ON CONFLICT (id_estado) DO NOTHING",
                    (id_estado, nombre, desc)
                )
            conn.commit()
            print("Estados insertados correctamente.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == '__main__':
    insert_states()
