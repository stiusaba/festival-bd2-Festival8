use("soundwave_mongodb");

// CONSULTA 1

print("\n===== CONSULTA 1: SETLISTS ORDENADOS POR DURACION =====\n");

db.setlists.find(
  {},
  {
    id_artista: 1,
    escenario: 1,
    fecha_presentacion: 1,
    duracion_total_min: 1,
    "canciones": { $slice: 1 }
  }
).sort({ duracion_total_min: -1 });

// CONSULTA 2

print("\n===== CONSULTA 2: INCIDENTES GRAVES CON PERSONAS AFECTADAS =====\n");

db.reportes_incidentes.find({
  $and: [
    { gravedad: { $in: ["Alta", "Critica"] } },
    { personas_afectadas: { $gte: 1 } },
    { "detalle.estado": "Resuelto" }
  ]
},
{
  id_escenario: 1,
  tipo_incidente: 1,
  gravedad: 1,
  personas_afectadas: 1,
  "detalle.descripcion": 1,
  "detalle.accion_tomada": 1
}).sort({ personas_afectadas: -1 });

// CONSULTA 3

print("\n===== CONSULTA 3: REPORTE DE CALIDAD POR ESCENARIO =====\n");

db.resenas_publico.aggregate([
  {
    $lookup: {
      from: "setlists",
      localField: "id_presentacion",
      foreignField: "id_presentacion",
      as: "info_presentacion"
    }
  },
  {
    $unwind: "$info_presentacion"
  },
  {
    $group: {
      _id: "$info_presentacion.escenario",
      promedio_calificacion: { $avg: "$calificacion" },
      total_resenas: { $sum: 1 },
      resenas_positivas: {
        $sum: {
          $cond: [{ $gte: ["$calificacion", 4] }, 1, 0]
        }
      },
      calificacion_maxima: { $max: "$calificacion" },
      calificacion_minima: { $min: "$calificacion" }
    }
  },
  {
    $addFields: {
      porcentaje_satisfaccion: {
        $round: [
          { $multiply: [
            { $divide: ["$resenas_positivas", "$total_resenas"] },
            100
          ]},
          1
        ]
      }
    }
  },
  {
    $sort: { promedio_calificacion: -1 }
  },
  {
    $project: {
      escenario: "$_id",
      promedio_calificacion: { $round: ["$promedio_calificacion", 2] },
      total_resenas: 1,
      resenas_positivas: 1,
      porcentaje_satisfaccion: 1,
      calificacion_maxima: 1,
      calificacion_minima: 1,
      _id: 0
    }
  }
]);
