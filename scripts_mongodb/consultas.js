use("soundwave_mongodb");

// ======================================================
// CONSULTA 1
// SETLISTS POR ARTISTA
// ======================================================

print("\n===== CONSULTA 1: SETLISTS POR ARTISTA =====\n");

db.setlists.find(
  {
    id_artista: 5
  }
).pretty();

// ======================================================
// CONSULTA 2
// INCIDENTES DE GRAVEDAD ALTA O CRÍTICA
// ======================================================

print("\n===== CONSULTA 2: INCIDENTES GRAVES =====\n");

db.reportes_incidentes.find(
  {
    gravedad: {
      $in: ["Alta", "Crítica"]
    }
  }
).pretty();

// ======================================================
// CONSULTA 3
// AGGREGATION PIPELINE
// PROMEDIO DE CALIFICACIONES POR PRESENTACIÓN
// ======================================================

print("\n===== CONSULTA 3: PROMEDIO DE RESEÑAS =====\n");

db.resenas_publico.aggregate([

  {
    $group: {

      _id: "$id_presentacion",

      promedio_calificacion: {
        $avg: "$calificacion"
      },

      total_resenas: {
        $sum: 1
      }

    }
  },

  {
    $sort: {
      promedio_calificacion: -1
    }
  }

]);

// ======================================================
// CONSULTA EXTRA
// ARTISTAS CON MÁS INCIDENTES REPORTADOS
// ======================================================

print("\n===== CONSULTA EXTRA: INCIDENTES POR ESCENARIO =====\n");

db.reportes_incidentes.aggregate([

  {
    $group: {

      _id: "$id_escenario",

      total_incidentes: {
        $sum: 1
      }

    }
  },

  {
    $sort: {
      total_incidentes: -1
    }
  }

]);
