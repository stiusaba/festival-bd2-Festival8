use("soundwave_mongodb");

// =========================================
// COLECCIÓN: setlists
// =========================================

db.createCollection("setlists", {

  validator: {
    $jsonSchema: {

      bsonType: "object",

      required: [
        "id_artista",
        "id_presentacion",
        "escenario",
        "canciones"
      ],

      properties: {

        id_artista: {
          bsonType: "int",
          description: "Referencia al artista en PostgreSQL"
        },

        id_presentacion: {
          bsonType: "int",
          description: "Referencia a presentación en PostgreSQL"
        },

        escenario: {
          bsonType: "string"
        },

        canciones: {
          bsonType: "array",

          items: {
            bsonType: "object",

            required: [
              "nombre",
              "duracion_min"
            ],

            properties: {

              nombre: {
                bsonType: "string"
              },

              duracion_min: {
                bsonType: "int"
              }

            }
          }
        }

      }

    }
  }

});

// =========================================
// ÍNDICES
// =========================================

db.setlists.createIndex({
  id_artista: 1
});

db.setlists.createIndex({
  id_presentacion: 1
});
