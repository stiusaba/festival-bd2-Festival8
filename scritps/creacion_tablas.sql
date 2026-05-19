-- Script: creacion_tablas.sql

CREATE TABLE Artistas (
    id_artista SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    genero_musical VARCHAR(50) NOT NULL,
    pais_origen VARCHAR(50) NOT NULL,
    cache_usd DECIMAL(10,2) CHECK (cache_usd > 0),
    rider_tecnico TEXT,
    fecha_registro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Contratos (
    id_contrato SERIAL PRIMARY KEY,
    id_artista INTEGER NOT NULL,
    fecha_firma DATE NOT NULL,
    fecha_vencimiento DATE,
    monto_total DECIMAL(10,2) NOT NULL CHECK (monto_total > 0),
    condiciones TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo'
        CHECK (estado IN ('activo', 'finalizado', 'cancelado')),
    FOREIGN KEY (id_artista) REFERENCES Artistas(id_artista)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Escenarios (
    id_escenario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    capacidad INTEGER NOT NULL CHECK (capacidad > 0),
    tipo VARCHAR(30) NOT NULL
        CHECK (tipo IN ('principal', 'alterno', 'acustico')),
    ubicacion_en_sede VARCHAR(100),
    tiene_cubierta BOOLEAN DEFAULT FALSE
);

CREATE TABLE Presentaciones (
    id_presentacion SERIAL PRIMARY KEY,
    id_artista INTEGER NOT NULL,
    id_escenario INTEGER NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'programada'
        CHECK (estado IN ('programada', 'en curso', 'finalizada', 'cancelada')),
    CHECK (hora_fin > hora_inicio),
    CHECK (fecha IN ('2026-11-14', '2026-11-15', '2026-11-16')),
    FOREIGN KEY (id_artista) REFERENCES Artistas(id_artista)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (id_escenario) REFERENCES Escenarios(id_escenario)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Tipos_Boleta (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    precio DECIMAL(8,2) NOT NULL CHECK (precio > 0),
    cupo_maximo INTEGER NOT NULL CHECK (cupo_maximo > 0),
    descripcion TEXT,
    incluye_beneficios BOOLEAN DEFAULT FALSE
);

CREATE TABLE Asistentes (
    id_asistente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    ciudad_origen VARCHAR(60),
    fecha_registro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Ventas (
    id_venta SERIAL PRIMARY KEY,
    id_asistente INTEGER NOT NULL,
    id_tipo_boleta INTEGER NOT NULL,
    fecha_venta DATE NOT NULL DEFAULT CURRENT_DATE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    total DECIMAL(10,2) NOT NULL CHECK (total > 0),
    metodo_pago VARCHAR(30)
        CHECK (metodo_pago IN ('efectivo', 'tarjeta', 'transferencia', 'PSE')),
    FOREIGN KEY (id_asistente) REFERENCES Asistentes(id_asistente)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (id_tipo_boleta) REFERENCES Tipos_Boleta(id_tipo)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Staff (
    id_staff SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL
        CHECK (rol IN ('seguridad', 'logistica', 'sonido', 'medico')),
    id_escenario INTEGER,
    telefono_emergencia VARCHAR(20),
    turno VARCHAR(20) NOT NULL
        CHECK (turno IN ('dia', 'noche', 'completo')),
    FOREIGN KEY (id_escenario) REFERENCES Escenarios(id_escenario)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Log_Presentaciones (
    id_log SERIAL PRIMARY KEY,
    id_presentacion INTEGER NOT NULL,
    campo_modificado VARCHAR(50),
    valor_anterior TEXT,
    valor_nuevo TEXT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario VARCHAR(50) DEFAULT CURRENT_USER
);

CREATE INDEX idx_contratos_artista ON Contratos(id_artista);
CREATE INDEX idx_presentaciones_artista ON Presentaciones(id_artista);
CREATE INDEX idx_presentaciones_escenario ON Presentaciones(id_escenario);
CREATE INDEX idx_presentaciones_fecha ON Presentaciones(fecha);
CREATE INDEX idx_ventas_asistente ON Ventas(id_asistente);
CREATE INDEX idx_ventas_tipo_boleta ON Ventas(id_tipo_boleta);
CREATE INDEX idx_ventas_fecha ON Ventas(fecha_venta);
CREATE INDEX idx_staff_escenario ON Staff(id_escenario);

ALTER TABLE Presentaciones 
ADD CONSTRAINT uq_artista_fecha_hora 
UNIQUE (id_artista, fecha, hora_inicio);
