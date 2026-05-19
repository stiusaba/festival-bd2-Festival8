-- Script: consultas.sql

-- CONSULTA 1

SELECT 
    a.nombre AS artista,
    a.pais_origen,
    a.genero_musical,
    COUNT(DISTINCT v.id_venta) AS total_ventas,
    SUM(v.cantidad) AS boletas_vendidas,
    SUM(v.total) AS ingresos_generados
FROM Artistas a
JOIN Presentaciones p
    ON a.id_artista = p.id_artista
JOIN Tipos_Boleta tb
    ON tb.id_tipo = tb.id_tipo  
JOIN Ventas v
    ON v.id_tipo_boleta = tb.id_tipo
    AND v.fecha_venta::TEXT LIKE '2026%'
GROUP BY a.id_artista, a.nombre, a.pais_origen, a.genero_musical
ORDER BY ingresos_generados DESC
LIMIT 10;

-- CONSULTA 2

SELECT
    e.nombre AS escenario,
    e.capacidad AS capacidad_total,
    COUNT(p.id_presentacion) AS total_presentaciones,
    SUM(v.cantidad) AS boletas_vendidas,
    ROUND(
        (SUM(v.cantidad) * 100.0) 
        / e.capacidad, 2
    ) AS porcentaje_ocupacion
FROM Escenarios e
JOIN Presentaciones p
    ON e.id_escenario = p.id_escenario
JOIN Tipos_Boleta tb
    ON tb.id_tipo = tb.id_tipo
LEFT JOIN Ventas v
    ON v.id_tipo_boleta = tb.id_tipo
GROUP BY e.id_escenario, e.nombre, e.capacidad
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
