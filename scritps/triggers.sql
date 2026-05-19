-- Script: triggers.sql

DROP TRIGGER IF EXISTS trg_validar_aforo ON Ventas;
DROP FUNCTION IF EXISTS fn_validar_aforo();

CREATE OR REPLACE FUNCTION fn_validar_aforo()
RETURNS TRIGGER AS $$
DECLARE
    vendidas INTEGER;
    cupo_max INTEGER;
BEGIN
    
    SELECT cupo_maximo
    INTO cupo_max
    FROM Tipos_Boleta
    WHERE id_tipo = NEW.id_tipo_boleta
    FOR UPDATE;

    SELECT COALESCE(SUM(cantidad), 0)
    INTO vendidas
    FROM Ventas
    WHERE id_tipo_boleta = NEW.id_tipo_boleta;

    IF (vendidas + NEW.cantidad) > cupo_max THEN
        RAISE EXCEPTION 
            'Cupo agotado para este tipo de boleta. Vendidas: %, Cupo maximo: %, Solicitadas: %',
            vendidas, cupo_max, NEW.cantidad;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_aforo
BEFORE INSERT ON Ventas
FOR EACH ROW
EXECUTE FUNCTION fn_validar_aforo();

CREATE OR REPLACE FUNCTION fn_auditoria_presentaciones()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.fecha IS DISTINCT FROM NEW.fecha THEN
        INSERT INTO Log_Presentaciones 
            (id_presentacion, campo_modificado, valor_anterior, valor_nuevo)
        VALUES 
            (OLD.id_presentacion, 'fecha', 
             OLD.fecha::TEXT, NEW.fecha::TEXT);
    END IF;

    IF OLD.hora_inicio IS DISTINCT FROM NEW.hora_inicio THEN
        INSERT INTO Log_Presentaciones 
            (id_presentacion, campo_modificado, valor_anterior, valor_nuevo)
        VALUES 
            (OLD.id_presentacion, 'hora_inicio', 
             OLD.hora_inicio::TEXT, NEW.hora_inicio::TEXT);
    END IF;

    IF OLD.hora_fin IS DISTINCT FROM NEW.hora_fin THEN
        INSERT INTO Log_Presentaciones 
            (id_presentacion, campo_modificado, valor_anterior, valor_nuevo)
        VALUES 
            (OLD.id_presentacion, 'hora_fin', 
             OLD.hora_fin::TEXT, NEW.hora_fin::TEXT);
    END IF;

    IF OLD.estado IS DISTINCT FROM NEW.estado THEN
        INSERT INTO Log_Presentaciones 
            (id_presentacion, campo_modificado, valor_anterior, valor_nuevo)
        VALUES 
            (OLD.id_presentacion, 'estado', 
             OLD.estado, NEW.estado);
    END IF;

    IF OLD.id_escenario IS DISTINCT FROM NEW.id_escenario THEN
        INSERT INTO Log_Presentaciones 
            (id_presentacion, campo_modificado, valor_anterior, valor_nuevo)
        VALUES 
            (OLD.id_presentacion, 'id_escenario', 
             OLD.id_escenario::TEXT, NEW.id_escenario::TEXT);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auditoria_presentaciones
AFTER UPDATE ON Presentaciones
FOR EACH ROW
EXECUTE FUNCTION fn_auditoria_presentaciones();
