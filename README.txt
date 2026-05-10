FESTIVAL SOUNDWAVE COLOMBIA
Proyecto Integrador - Bases de Datos 2
Grupo: Festival 8

INTEGRANTES
- Johan Sebastian Bonilla Gamez
- Juan Sebastian Morales Herrera
- Santiago Yesid Tiusaba Aranda

REPOSITORIO GITHUB
https://github.com/stiusaba/festival-bd2-Festival8.git

DESCRIPCION

Sistema de gestión de base de datos para el Festival 
Soundwave Colombia, evento de música electrónica e indie 
realizado en Bogotá, Parque Metropolitano Simón Bolívar, 
del 14 al 16 de noviembre de 2026.

REQUISITOS PREVIOS

- PostgreSQL 16 o superior
- Cliente SQL (pgAdmin, DBeaver, Neon, o psql)
- Acceso a internet si se usa Neon como base de datos


ORDEN DE EJECUCION DE LOS SCRIPTS

Los scripts deben ejecutarse en el siguiente orden:

PASO 1 - creacion_tablas.sql
   Crea todas las tablas, llaves primarias, llaves
   foráneas, restricciones de integridad e índices.
   Incluye la tabla Log_Presentaciones para auditoría.

PASO 2 - datos_prueba.sql
   Inserta los datos de prueba en todas las tablas.
   Incluye mínimo 30 registros en las entidades
   principales: Artistas, Asistentes, Ventas y
   Presentaciones.

PASO 3 - triggers.sql
   Crea los dos triggers del sistema:
   - trg_validar_aforo: valida que no se supere
     el cupo máximo antes de registrar una venta.
   - trg_auditoria_presentaciones: registra en el
     log cualquier cambio en las presentaciones.

PASO 4 - procedimientos.sql
   Crea el procedimiento almacenado:
   - sp_reporte_ventas(fecha): retorna el reporte
     de ventas agrupado por tipo de boleta para
     una fecha específica.

PASO 5 - consultas.sql
   Ejecuta las 3 consultas SQL significativas:
   - Consulta 1: Top artistas por ingresos generados
   - Consulta 2: Ocupación de boletas por tipo
   - Consulta 3: Asistentes con mayor gasto total

COMO EJECUTAR EN NEON

1. Crear cuenta en neon.tech
2. Crear nuevo proyecto llamado soundwave-colombia
3. Abrir el SQL Editor
4. Copiar y pegar cada script en el orden indicado
5. Hacer clic en Run después de cada script

PRUEBAS DE LOS TRIGGERS

Trigger 1 - Validacion de aforo:
   INSERT INTO Ventas (id_asistente, id_tipo_boleta, 
   fecha_venta, cantidad, total, metodo_pago)
   VALUES (1, 1, '2026-05-20', 25000, 2500000.00, 'tarjeta');
   Resultado esperado: ERROR de cupo agotado

Trigger 2 - Auditoria de presentaciones:
   UPDATE Presentaciones SET estado = 'cancelada'
   WHERE id_presentacion = 1;
   SELECT * FROM Log_Presentaciones;
   Resultado esperado: registro en el log con el cambio

PRUEBA DEL PROCEDIMIENTO

   SELECT * FROM sp_reporte_ventas('2026-05-01');
   SELECT * FROM sp_reporte_ventas('2026-05-07');
   Resultado esperado: tabla con tipo de boleta,
   total boletas vendidas e ingresos por fecha
