Festival Soundwave Colombia
Avance 2 - MongoDB

Descripción del proyecto:
Este proyecto corresponde al segundo avance del sistema de gestión del Festival Soundwave Colombia. 
Se implementó una arquitectura políglota utilizando PostgreSQL para el núcleo transaccional y MongoDB para la capa documental.

Herramientas utilizadas:
- PostgreSQL
- MongoDB Atlas
- MongoDB Compass
- GitHub

Colecciones MongoDB implementadas:
- setlists
- riders_tecnicos
- resenas_publico
- reportes_incidentes

Archivos incluidos:
scripts_mongodb/
├── creacion_colecciones.js
├── datos_prueba.js
└── consultas.js

Instrucciones de ejecución:

1. Abrir MongoDB Compass.
2. Conectarse al cluster MongoDB Atlas.
3. Abrir MongoDB Shell (mongosh).
4. Ejecutar el contenido de los siguientes archivos en este orden:

- creacion_colecciones.js
- datos_prueba.js
- consultas.js

Notas Importantes:
- Cada colección contiene 30 documentos de prueba.
- Se implementaron validaciones JSON Schema e índices.
- Las consultas incluyen aggregation pipeline.
- PostgreSQL almacena la parte transaccional del festival.
- MongoDB almacena información documental y flexible.
