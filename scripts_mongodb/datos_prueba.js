use("soundwave_mongodb");

// ======================================================
// LIMPIEZA PREVIA
// ======================================================

db.setlists.deleteMany({});
db.riders_tecnicos.deleteMany({});
db.resenas_publico.deleteMany({});
db.reportes_incidentes.deleteMany({});

// ======================================================
// DATOS DE PRUEBA - SETLISTS
// ======================================================

const escenarios = [
  "Mainstage",
  "Nebula",
  "Roots",
  "Underground"
];

const cancionesBase = [
  "Titanium",
  "Animals",
  "Levels",
  "Clarity",
  "Wake Me Up",
  "Reload",
  "Strobe",
  "Ghost Voices",
  "Opus",
  "Calling"
];

for (let i = 1; i <= 30; i++) {

  let canciones = [];

  for (let j = 0; j < 5; j++) {
    canciones.push({
      orden: j + 1,
      nombre: cancionesBase[(i + j) % cancionesBase.length],
      duracion_min: Math.floor(Math.random() * 4) + 3
    });
  }

  db.setlists.insertOne({

    id_artista: i,
    id_presentacion: i,

    escenario: escenarios[i % 4],

    fecha_presentacion: new Date(`2026-11-${14 + (i % 3)}`),

    canciones: canciones,

    duracion_total_min: 90,

    observaciones: "Setlist oficial del artista"

  });

}

// ======================================================
// DATOS DE PRUEBA - RIDERS TECNICOS
// ======================================================

for (let i = 1; i <= 30; i++) {

  db.riders_tecnicos.insertOne({

    id_artista: i,

    sonido: {
      microfonos: Math.floor(Math.random() * 5) + 2,
      monitores: Math.floor(Math.random() * 6) + 2,
      consola: "Pioneer DJM-A9",
      observaciones: "Configuración estándar"
    },

    iluminacion: {
      luces_led: true,
      laser: i % 2 === 0,
      pantallas: true,
      efectos_visuales: [
        "Humo",
        "Luces RGB",
        "Visuales LED"
      ]
    },

    camerino: {
      capacidad_personas: Math.floor(Math.random() * 10) + 5,
      bebidas: [
        "Agua",
        "Red Bull",
        "Gatorade"
      ],
      temperatura: "20C"
    },

    alimentacion: {
      tipo_menu: i % 2 === 0 ? "Vegetariano" : "Normal",
      restricciones: [
        "Sin maní"
      ],
      snacks: [
        "Frutas",
        "Proteína",
        "Barritas energéticas"
      ]
    },

    observaciones_generales: "Rider técnico estándar"

  });

}

// ======================================================
// DATOS DE PRUEBA - RESENAS PUBLICO
// ======================================================

const comentarios = [
  "Excelente presentación",
  "Muy buena experiencia",
  "Gran calidad de sonido",
  "Las luces estuvieron increíbles",
  "El artista superó expectativas",
  "Buen ambiente",
  "Muy organizado",
  "Show espectacular",
  "Excelente energía",
  "Muy recomendado"
];

for (let i = 1; i <= 30; i++) {

  db.resenas_publico.insertOne({

    id_asistente: i,
    id_presentacion: i,

    calificacion: Math.floor(Math.random() * 5) + 1,

    comentario: comentarios[i % comentarios.length],

    fecha_resena: new Date(`2026-11-${14 + (i % 3)}`),

    etiquetas: [
      "Festival",
      "Música",
      "Soundwave"
    ]

  });

}

// ======================================================
// DATOS DE PRUEBA - REPORTES INCIDENTES
// ======================================================

const tiposIncidente = [
  "Sonido",
  "Seguridad",
  "Iluminación",
  "Médico",
  "Logística"
];

const nivelesGravedad = [
  "Baja",
  "Media",
  "Alta",
  "Crítica"
];

const estados = [
  "Abierto",
  "En revisión",
  "Resuelto"
];

for (let i = 1; i <= 30; i++) {

  db.reportes_incidentes.insertOne({

    id_escenario: (i % 4) + 1,

    id_staff: (i % 15) + 1,

    tipo_incidente: tiposIncidente[i % tiposIncidente.length],

    gravedad: nivelesGravedad[i % nivelesGravedad.length],

    fecha_incidente: new Date(`2026-11-${14 + (i % 3)}T20:00:00`),

    detalle: {

      descripcion: "Incidente registrado durante la presentación",

      accion_tomada: "Personal técnico asignado al caso",

      estado: estados[i % estados.length]

    },

    personas_afectadas: Math.floor(Math.random() * 20),

    observaciones: "Seguimiento realizado correctamente"

  });

}

// ======================================================
// MENSAJE FINAL
// ======================================================

print("Datos de prueba insertados correctamente.");
