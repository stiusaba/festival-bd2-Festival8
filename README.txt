================================================
FESTIVAL SOUNDWAVE COLOMBIA
Proyecto Integrador - Bases de Datos 2
Grupo: Festival 8
================================================

INTEGRANTES
-----------
- Johan Sebastian Bonilla Gamez
- Juan Sebastian Morales Herrera
- Santiago Yesid Tiusaba Aranda

REPOSITORIO GITHUB
------------------
https://github.com/stiusaba/festival-bd2-Festival8.git

DESCRIPCION
-----------
Sistema de gestión de base de datos para el Festival
Soundwave Colombia, evento de música electrónica e indie
realizado en Bogotá, Parque Metropolitano Simón Bolívar,
del 14 al 16 de noviembre de 2026.

El sistema implementa una arquitectura políglota:
- PostgreSQL (Neon): núcleo transaccional ACID
- MongoDB (Atlas): capa documental BASE
- Python + Tkinter: script de integración con GUI

ESTRUCTURA DEL PROYECTO
------------------------
EntregaFinal_Festival_Festival8.zip
├── Informe_Final.pdf
├── scripts_postgresql/
│   ├── creacion_tablas.sql
│   ├── datos_prueba.sql
│   ├── triggers.sql
│   ├── procedimientos.sql
│   └── consultas.sql
├── scripts_mongodb/
│   ├── creacion_colecciones.js
│   ├── datos_prueba.js
│   └── consultas.js
├── integracion/
│   ├── script_integracion.py
│   └── README_ejecucion.md
├── reflexiones_individuales/
│   ├── reflexion_Johan.pdf
│   ├── reflexion_Juan.pdf
│   └── reflexion_Santiago.pdf
└── README.txt

================================================
PARTE 1 — POSTGRESQL (NEON)
================================================

REQUISITOS PREVIOS
------------------
- Cuenta en neon.tech
- Acceso a internet

ORDEN DE EJECUCION
------------------

PASO 1 - creacion_tablas.sql
   Crea las 9 tablas del sistema con llaves primarias,
   foráneas, restricciones CHECK, UNIQUE e índices.
   Tablas: Artistas, Contratos, Escenarios,
   Presentaciones, Tipos_Boleta, Asistentes,
   Ventas, Staff, Log_Presentaciones.

PASO 2 - datos_prueba.sql
   Inserta los datos de prueba:
   - 30 artistas nacionales e internacionales
   - 30 contratos
   - 30 presentaciones
   - 30 asistentes
   - 30 ventas
   - 4 escenarios
   - 4 tipos de boleta
   - 15 miembros de staff

PASO 3 - triggers.sql
   Crea los 2 triggers del sistema:
   - trg_validar_aforo: valida cupo antes de
     registrar una venta (BEFORE INSERT).
     Usa FOR UPDATE para evitar condiciones
     de carrera en compras simultáneas.
   - trg_auditoria_presentaciones: registra en
     Log_Presentaciones cualquier cambio en
     fecha, hora, estado o escenario
     (AFTER UPDATE).

PASO 4 - procedimientos.sql
   Crea el procedimiento almacenado:
   - sp_reporte_ventas(fecha DATE): retorna
     reporte de ventas agrupado por tipo de
     boleta para una fecha específica.

PASO 5 - consultas.sql
   Ejecuta las 3 consultas SQL significativas:
   - Consulta 1: Top artistas por ingresos
   - Consulta 2: Ocupación por tipo de boleta
   - Consulta 3: Asistentes con mayor gasto

COMO EJECUTAR EN NEON
---------------------
1. Entra a neon.tech y abre tu proyecto
2. Abre el SQL Editor en el menú izquierdo
3. Pega y ejecuta cada script en el orden indicado
4. Haz clic en Run después de cada script

PRUEBAS DE TRIGGERS
-------------------
Trigger 1 - Validacion de aforo (debe dar ERROR):
   INSERT INTO Ventas (id_asistente, id_tipo_boleta,
   fecha_venta, cantidad, total, metodo_pago)
   VALUES (1, 1, '2026-05-20', 25000, 2500000.00, 'tarjeta');
   Resultado esperado: ERROR cupo agotado

Trigger 2 - Auditoria de presentaciones:
   UPDATE Presentaciones SET estado = 'cancelada'
   WHERE id_presentacion = 1;
   SELECT * FROM Log_Presentaciones;
   Resultado esperado: registro en el log

PRUEBA DEL PROCEDIMIENTO
------------------------
   SELECT * FROM sp_reporte_ventas('2026-05-01');
   SELECT * FROM sp_reporte_ventas('2026-05-07');
   Resultado esperado: tipo de boleta, total
   boletas e ingresos por fecha

================================================
PARTE 2 — MONGODB (ATLAS)
================================================

REQUISITOS PREVIOS
------------------
- MongoDB Compass instalado
- Conexión al cluster MongoDB Atlas

COLECCIONES IMPLEMENTADAS
--------------------------
- setlists: lista de canciones por presentacion
- riders_tecnicos: requerimientos por artista
- resenas_publico: calificaciones del publico
- reportes_incidentes: incidentes operativos

ORDEN DE EJECUCION
------------------

PASO 1 - creacion_colecciones.js
   Crea las 4 colecciones con validacion
   JSON Schema e indices.

PASO 2 - datos_prueba.js
   Inserta 30 documentos por coleccion con
   datos variados y realistas.

PASO 3 - consultas.js
   Ejecuta las 3 consultas MongoDB:
   - Consulta 1: Setlists por duracion
   - Consulta 2: Incidentes graves con filtros
   - Consulta 3: Reporte de calidad por escenario
     (Aggregation Pipeline con $lookup, $group,
     $addFields y $project)

COMO EJECUTAR EN COMPASS
------------------------
1. Abre MongoDB Compass
2. Conéctate al cluster con la connection string
3. Abre el MongoDB Shell (boton inferior izquierdo)
4. Pega y ejecuta cada script en el orden indicado

================================================
PARTE 3 — INTEGRACION POLIGLOTA (PYTHON)
================================================

REQUISITOS PREVIOS
------------------
- Python 3.10 o superior
- Conexion a internet

INSTALACION DE DEPENDENCIAS
----------------------------
   pip install psycopg2-binary pymongo

EJECUCION
---------
   cd integracion
   python script_integracion.py

CASOS DE USO DEMOSTRADOS
-------------------------
Caso 1 - Reporte de Artista:
   Pestaña "Reporte de Artista" → selecciona
   un artista → muestra datos de PostgreSQL
   (artista + contrato) y MongoDB (setlist)
   en un solo panel integrado.

Caso 2 - Panel de Incidentes:
   Pestaña "Panel de Incidentes" → selecciona
   un escenario → muestra datos de PostgreSQL
   (escenario + programacion) y MongoDB
   (incidentes + reseñas) en un solo panel.

Ver instrucciones detalladas en:
integracion/README_ejecucion.md

================================================
Festival 8 — Bases de Datos 2
Universidad El Bosque — 2026
================================================
