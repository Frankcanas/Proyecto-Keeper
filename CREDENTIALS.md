# 🔑 Cuentas de Acceso para Pruebas - keepeR

Este archivo contiene la lista oficial de credenciales autorizadas para acceder a los **5 perfiles del sistema unificado**. Úsalas en la pantalla de inicio de sesión de la plataforma.


## 📊 Tabla Resumen de Credenciales

| Perfil | Correo de ejemplo (Clave en email) | Contraseña | Dashboard al que ingresa |
| **👮 Policía** | `policia@keeper.com` *(o que contenga "policia")* | `policia123` | Consola de Monitoreo Policial |
| **🚒 Bomberos** | `bombero@keeper.com` *(o que contenga "bombero")* | `bombero123` | Consola de Despacho de Bomberos |
| **🚑 Ambulancia** | `ambulancia@keeper.com` *(o que contenga "ambulancia")* | git pull`ambulancia123` | Consola de Urgencias Médicas |
| **💼 Administrador** | `admin@keeper.com` *(o que contenga "admin" / "administrador")* | `admin123` | **Consola General (Feed)** |
| **🏘️ Usuario** | `usuario@keeper.com` *(o que contenga "usuario" / "user" / "luis")* | `usuario123` | **Monitoreo Vecinal (Homepage)** |


## ⚙️ Reglas de Validación
1. **Restricción de Acceso:** Si intentas iniciar sesión con cualquier correo o contraseña que **no** coincida con los criterios de la tabla de arriba, la aplicación bloqueará el acceso y mostrará el mensaje: *"Correo o contraseña incorrectos"*.
2. **Cierre de Sesión Rápido:** Al hacer clic en el botón de **Salir** de cualquier perfil, la sesión se cerrará de inmediato y te regresará automáticamente a la página principal de bienvenida (Mainpage).
3. **Filtro de búsqueda en Mapas:** Todos los perfiles cuentan ahora con un buscador de direcciones en la esquina superior izquierda del mapa conectado con la API de Nominatim.

---

> ⚠️ **Nota de Integración:** Esta base de datos de credenciales simulada está implementada para pruebas de flujo en cliente dentro de [loginmodal.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/loginmodal.js).
