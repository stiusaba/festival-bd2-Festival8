use("soundwave_mongodb");

// ======================================================
// LIMPIEZA PREVIA
// ======================================================

db.setlists.drop();
db.riders_tecnicos.drop();
db.resenas_publico.drop();
db.reportes_incidentes.drop();

// ======================================================
// COLECCIÓN: setlists
// ======================================================

db.createCollection("setlists", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "id_artista",
        "id_presentacion",
        "escenario",
        "fecha_presentacion",
        "canciones",
        "duracion_total_min"
      ],
      properties: {
        id_artista: {
          bsonType: "int",
          description: "Referencia al artista en PostgreSQL"
        },
        id_presentacion: {
          bsonType: "int",
          description: "Referencia a la presentación en PostgreSQL"
        },
        escenario: {
          bsonType: "string",
          description: "Nombre del escenario donde se realiza la presentación"
        },
        fecha_presentacion: {
          bsonType: "date",
          description: "Fecha de la presentación"
        },
        canciones: {
          bsonType: "array",
          minItems: 1,
          description: "Canciones embebidas dentro del setlist",
          items: {
            bsonType: "object",
            required: [
              "orden",
              "nombre",
              "duracion_min"
            ],
            properties: {
              orden: {
                bsonType: "int"
              },
              nombre: {
                bsonType: "string"
              },
              duracion_min: {
                bsonType: "int",
                minimum: 1
              }
            }
          }
        },
        duracion_total_min: {
          bsonType: "int",
          minimum: 1
        },
        observaciones: {
          bsonType: "string"
        }
      }
    }
  }
});

db.setlists.createIndex({ id_artista: 1 });
db.setlists.createIndex({ id_presentacion: 1 });
db.setlists.createIndex({ escenario: 1 });

// ======================================================
// COLECCIÓN: riders_tecnicos
// ======================================================

db.createCollection("riders_tecnicos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "id_artista",
        "sonido",
        "iluminacion",
        "camerino",
        "alimentacion"
      ],
      properties: {
        id_artista: {
          bsonType: "int",
          description: "Referencia al artista en PostgreSQL"
        },
        sonido: {
          bsonType: "object",
          required: [
            "microfonos",
            "monitores",
            "consola"
          ],
          properties: {
            microfonos: {
              bsonType: "int",
              minimum: 0
            },
            monitores: {
              bsonType: "int",
              minimum: 0
            },
            consola: {
              bsonType: "string"
            },
            observaciones: {
              bsonType: "string"
            }
          }
        },
        iluminacion: {
          bsonType: "object",
          properties: {
            luces_led: {
              bsonType: "bool"
            },
            laser: {
              bsonType: "bool"
            },
            pantallas: {
              bsonType: "bool"
            },
            efectos_visuales: {
              bsonType: "array",
              items: {
                bsonType: "string"
              }
            }
          }
        },
        camerino: {
          bsonType: "object",
          properties: {
            capacidad_personas: {
              bsonType: "int",
              minimum: 1
            },
            bebidas: {
              bsonType: "array",
              items: {
                bsonType: "string"
              }
            },
            temperatura: {
              bsonType: "string"
            }
          }
        },
        alimentacion: {
          bsonType: "object",
          properties: {
            tipo_menu: {
              bsonType: "string"
            },
            restricciones: {
              bsonType: "array",
              items: {
                bsonType: "string"
              }
            },
            snacks: {
              bsonType: "array",
              items: {
                bsonType: "string"
              }
            }
          }
        },
        observaciones_generales: {
          bsonType: "string"
        }
      }
    }
  }
});

db.riders_tecnicos.createIndex({ id_artista: 1 });

// ======================================================
// COLECCIÓN: resenas_publico
// ======================================================

db.createCollection("resenas_publico", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "id_asistente",
        "id_presentacion",
        "calificacion",
        "comentario",
        "fecha_resena"
      ],
      properties: {
        id_asistente: {
          bsonType: "int",
          description: "Referencia al asistente en PostgreSQL"
        },
        id_presentacion: {
          bsonType: "int",
          description: "Referencia a la presentación en PostgreSQL"
        },
        calificacion: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Calificación del público entre 1 y 5"
        },
        comentario: {
          bsonType: "string"
        },
        fecha_resena: {
          bsonType: "date"
        },
        etiquetas: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
});

db.resenas_publico.createIndex({ id_asistente: 1 });
db.resenas_publico.createIndex({ id_presentacion: 1 });
db.resenas_publico.createIndex({ calificacion: -1 });

// ======================================================
// COLECCIÓN: reportes_incidentes
// ======================================================

db.createCollection("reportes_incidentes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "id_escenario",
        "id_staff",
        "tipo_incidente",
        "gravedad",
        "fecha_incidente",
        "detalle"
      ],
      properties: {
        id_escenario: {
          bsonType: "int",
          description: "Referencia al escenario en PostgreSQL"
        },
        id_staff: {
          bsonType: "int",
          description: "Referencia al miembro del staff en PostgreSQL"
        },
        tipo_incidente: {
          bsonType: "string",
          description: "Tipo de incidente registrado"
        },
        gravedad: {
          enum: [
            "Baja",
            "Media",
            "Alta",
            "Crítica"
          ],
          description: "Nivel de gravedad del incidente"
        },
        fecha_incidente: {
          bsonType: "date"
        },
        detalle: {
          bsonType: "object",
          required: [
            "descripcion",
            "accion_tomada",
            "estado"
          ],
          properties: {
            descripcion: {
              bsonType: "string"
            },
            accion_tomada: {
              bsonType: "string"
            },
            estado: {
              enum: [
                "Abierto",
                "En revisión",
                "Resuelto"
              ]
            }
          }
        },
        personas_afectadas: {
          bsonType: "int",
          minimum: 0
        },
        observaciones: {
          bsonType: "string"
        }
      }
    }
  }
});

db.reportes_incidentes.createIndex({ id_escenario: 1 });
db.reportes_incidentes.createIndex({ id_staff: 1 });
db.reportes_incidentes.createIndex({ gravedad: 1 });
db.reportes_incidentes.createIndex({ tipo_incidente: 1 });

// ======================================================
// MENSAJE FINAL
// ======================================================

print("Colecciones MongoDB creadas correctamente para Soundwave Colombia.");
