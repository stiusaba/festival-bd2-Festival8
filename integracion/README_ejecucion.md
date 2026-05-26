# Script de Integración — Festival Soundwave Colombia

## Descripción

Script desarrollado en Python que demuestra la integración funcional
entre PostgreSQL (Neon) y MongoDB (Atlas), los dos motores de la
arquitectura políglota del proyecto.

La aplicación presenta una interfaz gráfica que combina datos de
ambas bases de datos en tiempo real para dos casos de uso concretos:

**Caso 1 — Reporte de Artista**
Combina los datos del artista y su contrato desde PostgreSQL con
su setlist completo almacenado en MongoDB.

**Caso 2 — Panel de Incidentes por Escenario**
Combina los datos del escenario y su programación desde PostgreSQL
con los reportes de incidentes y reseñas del público almacenados
en MongoDB.

---

## Requisitos

- Python 3.10 o superior
- Conexión a internet (para conectar con Neon y MongoDB Atlas)

---

## Instalación de dependencias

Abre una terminal en la carpeta `integracion/` y ejecuta:

```bash
pip install psycopg2-binary pymongo
```

---

## Ejecución

```bash
python script_integracion.py
```

---

## Credenciales configuradas

El script ya tiene las credenciales configuradas para conectarse a:

| Motor | Plataforma | Estado |
|---|---|---|
| PostgreSQL | Neon | Configurado |
| MongoDB | Atlas | Configurado |

No es necesario modificar nada para ejecutar el script.

---

## Casos de uso demostrados

### Caso 1 — Reporte de Artista

1. Ejecuta el script
2. Ve a la pestaña **Reporte de Artista**
3. Busca o selecciona cualquier artista de la lista
4. El sistema muestra en un solo panel:
   - Datos del artista desde PostgreSQL
   - Contrato del artista desde PostgreSQL
   - Setlist completo desde MongoDB

### Caso 2 — Panel de Incidentes

1. Ve a la pestaña **Panel de Incidentes**
2. Selecciona cualquiera de los 4 escenarios
3. El sistema muestra en un solo panel:
   - Datos del escenario desde PostgreSQL
   - Programación de presentaciones desde PostgreSQL
   - Reportes de incidentes desde MongoDB
   - Reseñas del público con promedio desde MongoDB

---

## Arquitectura de la integración
