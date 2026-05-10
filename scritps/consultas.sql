-- Script: consultas.sql

-- CONSULTA 1

SELECT 
    a.nombre                    AS artista,
    a.pais_origen,
    a.genero_musical,
    COUNT(v.id_venta)           AS total_ventas,
    SUM(v.cantidad)             AS boletas_vendidas,
    SUM(v.total)                AS ingresos_generados
FROM Artistas a
JOIN Presentaciones p 
    ON a.id_artista = p.id_artista
JOIN Tipos_Boleta tb 
    ON tb.id_tipo = tb.id_tipo
JOIN Ventas v 
    ON v.id_tipo_boleta = tb.id_tipo
GROUP BY a.nombre, a.pais_origen, a.genero_musical
ORDER BY ingresos_generados DESC
LIMIT 10;

-- CONSULTA 2

SELECT 
    tb.nombre                               AS tipo_boleta,
    tb.precio,
    tb.cupo_maximo,
    COALESCE(SUM(v.cantidad), 0)            AS boletas_vendidas,
    tb.cupo_maximo - COALESCE(SUM(v.cantidad), 0) AS boletas_disponibles,
    ROUND(
        (COALESCE(SUM(v.cantidad), 0) * 100.0) 
        / tb.cupo_maximo, 2
    )                                       AS porcentaje_ocupacion
FROM Tipos_Boleta tb
LEFT JOIN Ventas v 
    ON tb.id_tipo = v.id_tipo_boleta
GROUP BY tb.id_tipo, tb.nombre, tb.precio, tb.cupo_maximo
ORDER BY porcentaje_ocupacion DESC;

-- CONSULTA 3

SELECT 
    a.nombre                        AS asistente,
    a.ciudad_origen,
    a.email,
    COUNT(v.id_venta)               AS numero_compras,
    COUNT(DISTINCT v.id_tipo_boleta) AS tipos_boleta_distintos,
    SUM(v.cantidad)                 AS total_boletas,
    SUM(v.total)                    AS gasto_total
FROM Asistentes a
JOIN Ventas v 
    ON a.id_asistente = v.id_asistente
GROUP BY a.id_asistente, a.nombre, a.ciudad_origen, a.email
HAVING COUNT(v.id_venta) >= 1
ORDER BY gasto_total DESC
LIMIT 10;