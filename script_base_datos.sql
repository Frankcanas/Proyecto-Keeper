
-- SCRIPT DE BASE DE DATOS - SISTEMA DE REPORTES Y ALERTAS COMUNITARIAS
-- Motor: PostgreSQL (compatible con Neon)


-- ---------------------------------------------------------------------
-- FUNCIÓN GENÉRICA PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- TABLA: rol

CREATE TABLE rol (
    id_rol      SERIAL PRIMARY KEY,
    nombre      VARCHAR(50)  NOT NULL UNIQUE CHECK (length(btrim(nombre)) >= 3),
    descripcion TEXT,
    status      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_rol_updated_at
    BEFORE UPDATE ON rol
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: usuario

CREATE TABLE usuario (
    id_usuario        SERIAL PRIMARY KEY,
    id_rol            INTEGER      NOT NULL REFERENCES rol(id_rol) ON DELETE RESTRICT,
    nombres           VARCHAR(100) NOT NULL CHECK (length(btrim(nombres)) >= 2),
    apellidos         VARCHAR(100) NOT NULL CHECK (length(btrim(apellidos)) >= 2),
    fecha_nacimiento  DATE         CHECK (fecha_nacimiento < CURRENT_DATE),
    cedula            VARCHAR(20)  NOT NULL UNIQUE CHECK (length(cedula) >= 5),
    correo            VARCHAR(150) NOT NULL UNIQUE CHECK (correo ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    telefono          VARCHAR(20)  NOT NULL UNIQUE CHECK (length(telefono) >= 7),
    password_hash     VARCHAR(255) NOT NULL CHECK (length(password_hash) >= 20),
    foto_perfil       VARCHAR(255),
    status            BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_usuario_id_rol ON usuario (id_rol);
CREATE INDEX idx_usuario_correo ON usuario (correo);
CREATE INDEX idx_usuario_cedula ON usuario (cedula);

CREATE TRIGGER trg_usuario_updated_at
    BEFORE UPDATE ON usuario
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: contacto_confianza

CREATE TABLE contacto_confianza (
    id_contacto SERIAL PRIMARY KEY,
    id_usuario  INTEGER      NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    nombre      VARCHAR(150) NOT NULL CHECK (length(btrim(nombre)) >= 2),
    telefono    VARCHAR(20)  NOT NULL CHECK (length(telefono) >= 7),
    correo      VARCHAR(150) CHECK (correo IS NULL OR correo ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    parentesco  VARCHAR(50),
    status      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_contacto_usuario_telefono UNIQUE (id_usuario, telefono)
);

CREATE INDEX idx_contacto_confianza_id_usuario ON contacto_confianza (id_usuario);

CREATE TRIGGER trg_contacto_confianza_updated_at
    BEFORE UPDATE ON contacto_confianza
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: zona_favorita

CREATE TABLE zona_favorita (
    id_zona      SERIAL PRIMARY KEY,
    id_usuario   INTEGER        NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    nombre       VARCHAR(100)   NOT NULL CHECK (length(btrim(nombre)) >= 2),
    tipo         VARCHAR(20)    NOT NULL CHECK (tipo IN ('casa','trabajo','universidad','otro')),
    latitud      NUMERIC(10,7)  NOT NULL CHECK (latitud BETWEEN -90 AND 90),
    longitud     NUMERIC(10,7)  NOT NULL CHECK (longitud BETWEEN -180 AND 180),
    radio_metros INTEGER        NOT NULL DEFAULT 100 CHECK (radio_metros > 0),
    status       BOOLEAN        NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP      NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP      NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_zona_usuario_nombre UNIQUE (id_usuario, nombre)
);

CREATE INDEX idx_zona_favorita_id_usuario ON zona_favorita (id_usuario);

CREATE TRIGGER trg_zona_favorita_updated_at
    BEFORE UPDATE ON zona_favorita
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: categoria

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre       VARCHAR(100) NOT NULL UNIQUE CHECK (length(btrim(nombre)) >= 3),
    descripcion  TEXT,
    icono        VARCHAR(100),
    color        VARCHAR(20)  CHECK (color IS NULL OR color ~* '^#[0-9A-Fa-f]{6}$'),
    status       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_categoria_updated_at
    BEFORE UPDATE ON categoria
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: estado_reporte

CREATE TABLE estado_reporte (
    id_estado     SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL UNIQUE CHECK (length(btrim(nombre_estado)) >= 3),
    descripcion   TEXT,
    status        BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_estado_reporte_updated_at
    BEFORE UPDATE ON estado_reporte
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: servicio_emergencia

CREATE TABLE servicio_emergencia (
    id_servicio   SERIAL PRIMARY KEY,
    nombre        VARCHAR(150) NOT NULL UNIQUE CHECK (length(btrim(nombre)) >= 3),
    descripcion   TEXT,
    telefono      VARCHAR(20)  NOT NULL CHECK (length(telefono) >= 7),
    instrucciones TEXT,
    status        BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_servicio_emergencia_updated_at
    BEFORE UPDATE ON servicio_emergencia
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: reporte

CREATE TABLE reporte (
    id_reporte    SERIAL PRIMARY KEY,
    id_usuario    INTEGER       NOT NULL REFERENCES usuario(id_usuario) ON DELETE RESTRICT,
    id_categoria  INTEGER       NOT NULL REFERENCES categoria(id_categoria) ON DELETE RESTRICT,
    id_estado     INTEGER       NOT NULL REFERENCES estado_reporte(id_estado) ON DELETE RESTRICT,
    titulo        VARCHAR(200)  NOT NULL CHECK (length(btrim(titulo)) >= 5),
    descripcion   TEXT,
    latitud       NUMERIC(10,7) NOT NULL CHECK (latitud BETWEEN -90 AND 90),
    longitud      NUMERIC(10,7) NOT NULL CHECK (longitud BETWEEN -180 AND 180),
    fecha_reporte DATE          NOT NULL DEFAULT CURRENT_DATE,
    hora_reporte  TIME          NOT NULL DEFAULT CURRENT_TIME,
    status        BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reporte_id_usuario   ON reporte (id_usuario);
CREATE INDEX idx_reporte_id_categoria ON reporte (id_categoria);
CREATE INDEX idx_reporte_id_estado    ON reporte (id_estado);
CREATE INDEX idx_reporte_fecha        ON reporte (fecha_reporte);
CREATE INDEX idx_reporte_lat_long     ON reporte (latitud, longitud);

CREATE TRIGGER trg_reporte_updated_at
    BEFORE UPDATE ON reporte
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: evidencia

CREATE TABLE evidencia (
    id_evidencia SERIAL PRIMARY KEY,
    id_reporte   INTEGER      NOT NULL REFERENCES reporte(id_reporte) ON DELETE CASCADE,
    url_archivo  VARCHAR(255) NOT NULL CHECK (length(btrim(url_archivo)) >= 5),
    tipo_archivo VARCHAR(20)  NOT NULL CHECK (tipo_archivo IN ('imagen','video','audio','otro')),
    descripcion  TEXT,
    status       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_evidencia_id_reporte ON evidencia (id_reporte);

CREATE TRIGGER trg_evidencia_updated_at
    BEFORE UPDATE ON evidencia
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: validacion

CREATE TABLE validacion (
    id_validacion    SERIAL PRIMARY KEY,
    id_reporte       INTEGER     NOT NULL REFERENCES reporte(id_reporte) ON DELETE CASCADE,
    id_usuario       INTEGER     NOT NULL REFERENCES usuario(id_usuario) ON DELETE RESTRICT, 
    decision         VARCHAR(20) NOT NULL CHECK (decision IN ('aceptado','rechazado')),
    comentario       TEXT,
    fecha_validacion TIMESTAMP   NOT NULL DEFAULT NOW(),
    status           BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP   NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_validacion_reporte_moderador UNIQUE (id_reporte, id_usuario)
);

CREATE INDEX idx_validacion_id_reporte ON validacion (id_reporte);
CREATE INDEX idx_validacion_id_usuario ON validacion (id_usuario);

CREATE TRIGGER trg_validacion_updated_at
    BEFORE UPDATE ON validacion
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: alerta

CREATE TABLE alerta (
    id_alerta            SERIAL PRIMARY KEY,
    id_reporte           INTEGER      NOT NULL REFERENCES reporte(id_reporte) ON DELETE CASCADE,
    titulo               VARCHAR(200) NOT NULL CHECK (length(btrim(titulo)) >= 5),
    mensaje              TEXT         NOT NULL CHECK (length(btrim(mensaje)) >= 5),
    radio_impacto_metros INTEGER      NOT NULL DEFAULT 500 CHECK (radio_impacto_metros > 0),
    fecha_expiracion     TIMESTAMP,
    status               BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMP    NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_alerta_fecha_expiracion CHECK (fecha_expiracion IS NULL OR fecha_expiracion > created_at)
);

CREATE INDEX idx_alerta_id_reporte ON alerta (id_reporte);

CREATE TRIGGER trg_alerta_updated_at
    BEFORE UPDATE ON alerta
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: confirmacion_comunitaria

CREATE TABLE confirmacion_comunitaria (
    id_confirmacion    SERIAL PRIMARY KEY,
    id_reporte         INTEGER     NOT NULL REFERENCES reporte(id_reporte) ON DELETE CASCADE,
    id_usuario         INTEGER     NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    tipo               VARCHAR(20) NOT NULL CHECK (tipo IN ('confirma','no_confirma')),
    comentario         TEXT,
    fecha_confirmacion TIMESTAMP   NOT NULL DEFAULT NOW(),
    status             BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at         TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMP   NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_confirmacion_reporte_usuario UNIQUE (id_reporte, id_usuario)
);

CREATE INDEX idx_confirmacion_id_reporte ON confirmacion_comunitaria (id_reporte);
CREATE INDEX idx_confirmacion_id_usuario ON confirmacion_comunitaria (id_usuario);

CREATE TRIGGER trg_confirmacion_comunitaria_updated_at
    BEFORE UPDATE ON confirmacion_comunitaria
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: sos

CREATE TABLE sos (
    id_sos          SERIAL        PRIMARY KEY,
    id_usuario      INTEGER       NOT NULL REFERENCES usuario(id_usuario) ON DELETE RESTRICT,
    id_servicio     INTEGER       NOT NULL REFERENCES servicio_emergencia(id_servicio) ON DELETE RESTRICT,
    latitud         NUMERIC(10,7) NOT NULL CHECK (latitud BETWEEN -90 AND 90),
    longitud        NUMERIC(10,7) NOT NULL CHECK (longitud BETWEEN -180 AND 180),
    fecha_sos       DATE          NOT NULL DEFAULT CURRENT_DATE,
    hora_sos        TIME          NOT NULL DEFAULT CURRENT_TIME,
    estado          VARCHAR(20)   NOT NULL DEFAULT 'realizado' CHECK (estado IN ('realizado','cancelado')),
    status          BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sos_id_usuario  ON sos (id_usuario);
CREATE INDEX idx_sos_id_servicio ON sos (id_servicio);

CREATE TRIGGER trg_sos_updated_at
    BEFORE UPDATE ON sos
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();


-- TABLA: notificacion

CREATE TABLE notificacion (
    id_notificacion SERIAL PRIMARY KEY,
    id_sos          INTEGER      REFERENCES sos(id_sos) ON DELETE CASCADE,
    id_usuario      INTEGER      NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    titulo          VARCHAR(200) NOT NULL CHECK (length(btrim(titulo)) >= 5),
    mensaje         TEXT         NOT NULL CHECK (length(btrim(mensaje)) >= 5),
    tipo            VARCHAR(20)  NOT NULL CHECK (tipo IN ('alerta','sistema','reporte')),
    leida           BOOLEAN      NOT NULL DEFAULT FALSE,
    fecha_leida     TIMESTAMP,
    status          BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT NOW(),
    -- si la notificación está marcada como leída, debe existir fecha_leida (y viceversa)
    CONSTRAINT ck_notificacion_leida_coherente CHECK (
        (leida = FALSE AND fecha_leida IS NULL) OR
        (leida = TRUE  AND fecha_leida IS NOT NULL)
    )
);

CREATE INDEX idx_notificacion_id_usuario ON notificacion (id_usuario);
CREATE INDEX idx_notificacion_id_sos     ON notificacion (id_sos);

CREATE TRIGGER trg_notificacion_updated_at
    BEFORE UPDATE ON notificacion
    FOR EACH ROW EXECUTE FUNCTION fn_actualizar_updated_at();

