-- Script: procedimientos.sql

DROP FUNCTION IF EXISTS sp_reporte_ventas(DATE);

CREATE OR REPLACE FUNCTION sp_reporte_ventas(fecha_consulta DATE)
RETURNS TABLE (
    tipo_boleta VARCHAR,
    total_boletas BIGINT,
    total_ingresos NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        tb.nombre::VARCHAR AS tipo_boleta,
        SUM(v.cantidad) AS total_boletas,
        SUM(v.total) AS total_ingresos
    FROM Ventas v
    JOIN Tipos_Boleta tb
        ON v.id_tipo_boleta = tb.id_tipo
    WHERE v.fecha_venta = fecha_consulta
    GROUP BY tb.nombre
    ORDER BY total_ingresos DESC;
END;
$$ LANGUAGE plpgsql;
