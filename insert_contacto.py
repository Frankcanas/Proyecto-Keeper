import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    dbname=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    port=5432
)
cur = conn.cursor()

# Insertar un contacto para los usuarios (ej. id 16 y 17) para asegurarnos que aparezca
usuarios_a_insertar = [16, 17]

for user_id in usuarios_a_insertar:
    try:
        cur.execute(
            "INSERT INTO contacto_confianza (id_usuario, nombre, telefono, correo, parentesco) VALUES (%s, %s, %s, %s, %s) RETURNING id_contacto;",
            (user_id, f'Contacto de Prueba AI {user_id}', '3000000000', 'prueba@ai.com', 'Amigo')
        )
        id_c = cur.fetchone()[0]
        print(f'Contacto insertado con ID {id_c} para el usuario {user_id}')
    except Exception as e:
        print(f"No se pudo insertar para {user_id}: {e}")
        conn.rollback()

conn.commit()
cur.close()
conn.close()
