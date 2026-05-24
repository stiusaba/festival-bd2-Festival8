use("soundwave_mongodb");

// LIMPIEZA PREVIA

db.setlists.deleteMany({});
db.riders_tecnicos.deleteMany({});
db.resenas_publico.deleteMany({});
db.reportes_incidentes.deleteMany({});

// DATOS DE PRUEBA - SETLISTS

const setlistsData = [
  { id_artista: 1, id_presentacion: 1, escenario: "Mainstage", fecha: "2026-11-16",
    canciones: [
      { orden: 1, nombre: "Proxy", duracion_min: 7 },
      { orden: 2, nombre: "Animals", duracion_min: 6 },
      { orden: 3, nombre: "Tremor", duracion_min: 5 },
      { orden: 4, nombre: "In The Name Of Love", duracion_min: 4 },
      { orden: 5, nombre: "Scared To Be Lonely", duracion_min: 4 },
      { orden: 6, nombre: "Spotless", duracion_min: 5 },
      { orden: 7, nombre: "Follow", duracion_min: 6 }
    ], duracion_total_min: 90 },
  { id_artista: 2, id_presentacion: 2, escenario: "Nebula", fecha: "2026-11-14",
    canciones: [
      { orden: 1, nombre: "Hypnotized", duracion_min: 8 },
      { orden: 2, nombre: "The Rhythm", duracion_min: 7 },
      { orden: 3, nombre: "Exhale", duracion_min: 9 },
      { orden: 4, nombre: "Simulation", duracion_min: 8 },
      { orden: 5, nombre: "Nacht", duracion_min: 7 }
    ], duracion_total_min: 75 },
  { id_artista: 3, id_presentacion: 3, escenario: "Nebula", fecha: "2026-11-15",
    canciones: [
      { orden: 1, nombre: "Sgat", duracion_min: 9 },
      { orden: 2, nombre: "Doppler", duracion_min: 8 },
      { orden: 3, nombre: "Heartbeat", duracion_min: 7 },
      { orden: 4, nombre: "Kach", duracion_min: 8 },
      { orden: 5, nombre: "Overdrive", duracion_min: 6 }
    ], duracion_total_min: 80 },
  { id_artista: 4, id_presentacion: 4, escenario: "Mainstage", fecha: "2026-11-14",
    canciones: [
      { orden: 1, nombre: "Losing It", duracion_min: 6 },
      { orden: 2, nombre: "Stop It", duracion_min: 5 },
      { orden: 3, nombre: "Go F Yourself", duracion_min: 7 },
      { orden: 4, nombre: "Crowd Control", duracion_min: 5 },
      { orden: 5, nombre: "Washed", duracion_min: 6 }
    ], duracion_total_min: 70 },
  { id_artista: 5, id_presentacion: 5, escenario: "Nebula", fecha: "2026-11-16",
    canciones: [
      { orden: 1, nombre: "Seoulful", duracion_min: 6 },
      { orden: 2, nombre: "Barbarian", duracion_min: 5 },
      { orden: 3, nombre: "Starry Night", duracion_min: 7 },
      { orden: 4, nombre: "Nabi", duracion_min: 6 },
      { orden: 5, nombre: "Suede", duracion_min: 5 }
    ], duracion_total_min: 75 },
  { id_artista: 6, id_presentacion: 6, escenario: "Mainstage", fecha: "2026-11-15",
    canciones: [
      { orden: 1, nombre: "Astral Plane", duracion_min: 9 },
      { orden: 2, nombre: "Interlude", duracion_min: 7 },
      { orden: 3, nombre: "Drift", duracion_min: 8 },
      { orden: 4, nombre: "Lifetimes", duracion_min: 9 },
      { orden: 5, nombre: "Rejoice", duracion_min: 8 }
    ], duracion_total_min: 85 },
  { id_artista: 7, id_presentacion: 7, escenario: "Roots", fecha: "2026-11-14",
    canciones: [
      { orden: 1, nombre: "Glue", duracion_min: 8 },
      { orden: 2, nombre: "Just", duracion_min: 7 },
      { orden: 3, nombre: "Vale", duracion_min: 6 },
      { orden: 4, nombre: "Saku", duracion_min: 9 },
      { orden: 5, nombre: "Apricots", duracion_min: 7 }
    ], duracion_total_min: 80 },
  { id_artista: 8, id_presentacion: 8, escenario: "Roots", fecha: "2026-11-15",
    canciones: [
      { orden: 1, nombre: "Two Thousand And Seventeen", duracion_min: 8 },
      { orden: 2, nombre: "Parallel Lines", duracion_min: 7 },
      { orden: 3, nombre: "LA Priest", duracion_min: 9 },
      { orden: 4, nombre: "Neom", duracion_min: 8 }
    ], duracion_total_min: 70 },
  { id_artista: 9, id_presentacion: 9, escenario: "Roots", fecha: "2026-11-16",
    canciones: [
      { orden: 1, nombre: "LesAlpx", duracion_min: 10 },
      { orden: 2, nombre: "Silhouettes", duracion_min: 9 },
      { orden: 3, nombre: "Environments", duracion_min: 11 },
      { orden: 4, nombre: "Survey", duracion_min: 9 }
    ], duracion_total_min: 75 },
  { id_artista: 10, id_presentacion: 10, escenario: "Underground", fecha: "2026-11-14",
    canciones: [
      { orden: 1, nombre: "Immunity", duracion_min: 8 },
      { orden: 2, nombre: "Vessel", duracion_min: 9 },
      { orden: 3, nombre: "Open Eye Signal", duracion_min: 10 },
      { orden: 4, nombre: "Collider", duracion_min: 8 }
    ], duracion_total_min: 70 }
];

// generar setlists
for (let i = 11; i <= 30; i++) {
  const escenarios = ["Mainstage", "Nebula", "Roots", "Underground"];
  const dias = ["2026-11-14", "2026-11-15", "2026-11-16"];
  const cancionesPool = [
    ["Intro", "Rise", "Fade", "Echo", "Pulse"],
    ["Dawn", "Dusk", "Neon", "Grid", "Wave"],
    ["Storm", "Calm", "Flux", "Arc", "Core"],
    ["Phase", "Shift", "Loop", "Beat", "Drop"]
  ];
  const pool = cancionesPool[i % 4];
  db.setlists.insertOne({
    id_artista: i,
    id_presentacion: i,
    escenario: escenarios[i % 4],
    fecha_presentacion: new Date(dias[i % 3]),
    canciones: pool.map((nombre, idx) => ({
      orden: idx + 1,
      nombre: nombre,
      duracion_min: 5 + (idx % 4)
    })),
    duracion_total_min: 60 + (i % 5) * 5,
    observaciones: "Setlist confirmado por management"
  });
}

setlistsData.forEach(s => {
  db.setlists.insertOne({
    id_artista: s.id_artista,
    id_presentacion: s.id_presentacion,
    escenario: s.escenario,
    fecha_presentacion: new Date(s.fecha),
    canciones: s.canciones,
    duracion_total_min: s.duracion_total_min,
    observaciones: "Setlist confirmado por management"
  });
});

// DATOS DE PRUEBA - RIDERS TECNICOS

const ridersData = [
  { id_artista: 1,
    sonido: { microfonos: 2, monitores: 8, consola: "Pioneer DJM-A9", observaciones: "Requiere sistema L-Acoustics K2" },
    iluminacion: { luces_led: true, laser: true, pantallas: true, efectos_visuales: ["Confetti", "Laser RGB", "Humo denso", "Strobos"] },
    camerino: { capacidad_personas: 15, bebidas: ["Agua Evian", "Red Bull", "Heineken sin alcohol"], temperatura: "19C" },
    alimentacion: { tipo_menu: "Normal", restricciones: ["Sin gluten"], snacks: ["Frutas tropicales", "Sushi", "Proteína whey"] },
    observaciones_generales: "Manager presente en backstage en todo momento" },
  { id_artista: 2,
    sonido: { microfonos: 0, monitores: 4, consola: "Allen & Heath Xone:96", observaciones: "Solo CDJ-3000 y mixer analogico" },
    iluminacion: { luces_led: true, laser: true, pantallas: false, efectos_visuales: ["Humo", "Luz UV"] },
    camerino: { capacidad_personas: 5, bebidas: ["Agua", "Vino tinto", "Te herbal"], temperatura: "21C" },
    alimentacion: { tipo_menu: "Vegetariano", restricciones: ["Sin lacteos", "Sin mariscos"], snacks: ["Verduras crudas", "Hummus", "Frutos secos"] },
    observaciones_generales: "No fotos ni videos en camerino" },
  { id_artista: 3,
    sonido: { microfonos: 1, monitores: 6, consola: "Pioneer DJM-900 NXS2", observaciones: "Requiere sistema d&b audiotechnik" },
    iluminacion: { luces_led: true, laser: false, pantallas: true, efectos_visuales: ["Humo blanco", "Luz roja", "Proyeccion visual"] },
    camerino: { capacidad_personas: 6, bebidas: ["Agua Perrier", "Vodka Belvedere", "Jugo de naranja"], temperatura: "20C" },
    alimentacion: { tipo_menu: "Vegano", restricciones: ["Sin productos animales"], snacks: ["Ensalada de quinoa", "Aguacate", "Barritas veganas"] },
    observaciones_generales: "Requiere calentamiento vocal 30 minutos antes" },
  { id_artista: 4,
    sonido: { microfonos: 3, monitores: 6, consola: "Pioneer DJM-V10", observaciones: "Setup completo Pioneer con rekordbox" },
    iluminacion: { luces_led: true, laser: true, pantallas: true, efectos_visuales: ["CO2 jets", "Confetti", "Llamas LED"] },
    camerino: { capacidad_personas: 12, bebidas: ["Beer Victoria Bitter", "Agua", "Gatorade"], temperatura: "22C" },
    alimentacion: { tipo_menu: "Normal", restricciones: ["Sin picante"], snacks: ["Chips", "Sandwiches", "Frutas"] },
    observaciones_generales: "Requiere tabla de surf decorativa en camerino" },
  { id_artista: 5,
    sonido: { microfonos: 2, monitores: 4, consola: "Rane MP2015", observaciones: "Requiere vinilo disponible en cabina" },
    iluminacion: { luces_led: true, laser: false, pantallas: true, efectos_visuales: ["Humo suave", "Luces pastel"] },
    camerino: { capacidad_personas: 8, bebidas: ["Agua", "Kombucha", "Soju"], temperatura: "20C" },
    alimentacion: { tipo_menu: "Coreano", restricciones: ["Sin cerdo"], snacks: ["Kimbap", "Tteok", "Frutas frescas"] },
    observaciones_generales: "Requiere flores frescas en camerino" }
];

ridersData.forEach(r => db.riders_tecnicos.insertOne(r));

const consolasVariadas = ["Yamaha CL5", "SSL 9000", "Midas PRO X", "DiGiCo SD7", "Neve 8078", "API 1608", "Soundcraft Vi7000", "Avid S6L", "Allen & Heath dLive", "Behringer X32"];
const bebidasVariadas = [
  ["Agua Evian", "Cerveza artesanal", "Jugo verde"],
  ["Agua", "Gatorade azul", "Proteina shake"],
  ["Agua con gas", "Vino blanco", "Kombucha"],
  ["Agua Perrier", "Red Bull", "Te matcha"],
  ["Agua", "Cerveza Corona", "Jugo de mango"]
];
const snacksVariados = [
  ["Sushi", "Edamame", "Mochi"],
  ["Pizza vegana", "Ensalada Caesar", "Frutos secos"],
  ["Arepas", "Aguacate", "Jugo de maracuya"],
  ["Wraps de pollo", "Hummus", "Zanahoria"],
  ["Granola", "Yogurt griego", "Frutas mixtas"]
];
const efectosVariados = [
  ["Laser verde", "Humo", "Pantallas LED"],
  ["Strobos", "Luz UV", "Proyeccion mapping"],
  ["CO2 jets", "Confetti", "Luz roja"],
  ["Luces RGB", "Humo denso", "Pantallas 4K"],
  ["Laser azul", "Luz blanca", "Efectos pyro"]
];

for (let i = 6; i <= 30; i++) {
  db.riders_tecnicos.insertOne({
    id_artista: i,
    sonido: {
      microfonos: [0, 1, 2, 3, 4][i % 5],
      monitores: [4, 5, 6, 7, 8][i % 5],
      consola: consolasVariadas[i % consolasVariadas.length],
      observaciones: `Configuracion personalizada artista ${i}`
    },
    iluminacion: {
      luces_led: i % 3 !== 0,
      laser: i % 2 === 0,
      pantallas: i % 4 !== 0,
      efectos_visuales: efectosVariados[i % efectosVariados.length]
    },
    camerino: {
      capacidad_personas: 5 + (i % 10),
      bebidas: bebidasVariadas[i % bebidasVariadas.length],
      temperatura: `${18 + (i % 5)}C`
    },
    alimentacion: {
      tipo_menu: ["Normal", "Vegetariano", "Vegano", "Sin gluten", "Kosher"][i % 5],
      restricciones: [["Sin mariscos"], ["Sin lacteos"], ["Sin gluten"], ["Sin nueces"], ["Sin cerdo"]][i % 5],
      snacks: snacksVariados[i % snacksVariados.length]
    },
    observaciones_generales: [
      "Acceso restringido al camerino 2 horas antes del show",
      "Requiere calentamiento vocal previo",
      "Manager debe estar presente en la prueba de sonido",
      "Solicita silencio en backstage durante actuacion",
      "Requiere espejo de cuerpo completo en camerino"
    ][i % 5]
  });
}

// DATOS DE PRUEBA - RESEÑAS DEL PUBLICO 

const resenasDetalladas = [
  { id_asistente: 1, id_presentacion: 1, calificacion: 5, comentario: "Martin Garrix cerro el festival de manera magistral. La produccion de sonido en el Mainstage fue impecable y los visuales sincronizados con la musica crearon una experiencia unica. Definitivamente el mejor cierre que he vivido en un festival.", etiquetas: ["Mainstage", "EDM", "Excelente produccion"] },
  { id_asistente: 2, id_presentacion: 2, calificacion: 4, comentario: "Amelie Lens demostro por que es referente del techno actual. Sus transiciones fueron precisas y la seleccion de tracks mantuvo la energia constante durante toda la presentacion. El escenario Nebula tiene una acustica perfecta para este genero.", etiquetas: ["Techno", "Nebula", "Buena acustica"] },
  { id_asistente: 3, id_presentacion: 3, calificacion: 5, comentario: "Charlotte de Witte es simplemente diferente. Su set fue oscuro, hipnotico y brutal de principio a fin. La iluminacion minimalista que eligio potencio cada momento del show. No esperaba que el festival tuviera artistas de este nivel.", etiquetas: ["Techno", "Oscuro", "Hipnotico"] },
  { id_asistente: 4, id_presentacion: 4, calificacion: 4, comentario: "Fisher es puro entretenimiento. Llego con su look caracteristico y desde el primer track tuvo al publico completamente entregado. Mezclo sus clasicos con material nuevo y la respuesta fue increible. Gran energia en el Mainstage.", etiquetas: ["House", "Energia", "Entretenimiento"] },
  { id_asistente: 5, id_presentacion: 5, calificacion: 5, comentario: "Peggy Gou fue una revelacion para mucha gente que no la conocia. Su estilo house con influencias coreanas y africanas es completamente distinto a todo lo que se escucha normalmente. El set de Nebula fue el mas especial del festival para mi.", etiquetas: ["House", "Unico", "Revelacion"] },
  { id_asistente: 6, id_presentacion: 6, calificacion: 5, comentario: "Tale Of Us en el Mainstage fue un momento de pura emocion. Su melodic techno tiene una profundidad que pocos artistas logran. El segundo dia fue el mejor del festival gracias a ellos.", etiquetas: ["Melodic Techno", "Emocional", "Profundo"] },
  { id_asistente: 7, id_presentacion: 7, calificacion: 4, comentario: "Bicep en el escenario Roots fue exactamente lo que esperaba. Sonido lleno, ritmos que te mueven sin que puedas evitarlo y una seleccion de tracks muy bien pensada. El escenario cubierto ayudo mucho con la acustica.", etiquetas: ["Electronic", "Roots", "Sonido lleno"] },
  { id_asistente: 8, id_presentacion: 8, calificacion: 5, comentario: "Ver a Four Tet en vivo es una experiencia completamente diferente a escucharlo en casa. La forma en que construye sus sets es casi narrativa, cada track lleva al siguiente de manera organica. Me quede sin palabras.", etiquetas: ["Electronic", "Narrativo", "Live set"] },
  { id_asistente: 9, id_presentacion: 9, calificacion: 3, comentario: "Floating Points estuvo bien pero esperaba mas. El set fue muy ambient y en algunos momentos perdio la atencion del publico. Tal vez el escenario Roots no era el ideal para su propuesta. Aun asi la parte final fue hermosa.", etiquetas: ["Electronic", "Ambient", "Irregular"] },
  { id_asistente: 10, id_presentacion: 10, calificacion: 5, comentario: "Jon Hopkins en el Underground fue el momento mas intimo y poderoso del festival. La sala estaba llena pero la intensidad era de otro nivel. Immunity en vivo me hizo entender por que ese album cambio el electronic.", etiquetas: ["Electronic", "Intimo", "Underground"] },
  { id_asistente: 11, id_presentacion: 11, calificacion: 4, comentario: "Caribou con bateria en vivo es simplemente diferente. Ver como transforma sus producciones de estudio en algo organico y energetico fue fascinante. El escenario Roots fue la eleccion perfecta para su propuesta.", etiquetas: ["Indie Electronic", "Live band", "Organico"] },
  { id_asistente: 12, id_presentacion: 12, calificacion: 5, comentario: "Bonobo con banda completa fue el espectaculo mas impresionante del festival. Ocho musicos en el Mainstage creando algo que va del jazz al electronic con total fluidez. Cada instrumento tenia su momento y juntos sonaban monumental.", etiquetas: ["Indie Electronic", "Banda completa", "Jazz"] },
  { id_asistente: 13, id_presentacion: 13, calificacion: 4, comentario: "Khruangbin en el Roots fue como entrar a otra dimension. Su mezcla de funk, psicodelia y world music es hipnotica. La guitarra de Laura Lee es de otro mundo y el bajo de Mark seguia resonando horas despues.", etiquetas: ["Indie", "Psicodelico", "World music"] },
  { id_asistente: 14, id_presentacion: 14, calificacion: 2, comentario: "Cigarettes After Sex no era para el Underground. Su musica necesita espacio y silencio pero la reverberacion del recinto arruino la experiencia. Tecnicamente bien ejecutado pero el venue fue un error. Espero verlos en un lugar mas apropiado.", etiquetas: ["Indie", "Venue inadecuado", "Reverb excesiva"] },
  { id_asistente: 15, id_presentacion: 15, calificacion: 3, comentario: "Turnover cumplio pero no sorprendio. Tocaron bien, el sonido estuvo correcto, pero el set fue demasiado plano. Les falto variacion de energia entre canciones. El publico respondio bien al principio pero hacia el final estaba distante.", etiquetas: ["Indie Rock", "Correcto", "Sin sorpresas"] },
  { id_asistente: 16, id_presentacion: 16, calificacion: 5, comentario: "Jungle en el Mainstage fue pura celebracion. Ocho personas en el escenario creando funk electronic que te hace bailar sin parar. Cada cancion mejor que la anterior y el cierre fue apoteosico. El festival necesita mas actos asi.", etiquetas: ["Funk Electronic", "Celebracion", "Bailar"] },
  { id_asistente: 17, id_presentacion: 17, calificacion: 4, comentario: "Tourist tiene una propuesta electronica muy refinada. Su set en Underground fue detallista y los arreglos en vivo de sus tracks de estudio mostraron una musicalidad profunda. Publico pequeno pero muy entregado.", etiquetas: ["Electronic", "Refinado", "Musicalidad"] },
  { id_asistente: 18, id_presentacion: 18, calificacion: 4, comentario: "Tycho en Roots fue como meditar con musica. Su ambient electronic con banda tiene una calidad cinematica que pocas veces se ve en un festival. El ambiente del escenario cubierto complemento perfectamente su propuesta.", etiquetas: ["Ambient", "Cinematico", "Meditativo"] },
  { id_asistente: 19, id_presentacion: 19, calificacion: 3, comentario: "Explosions in the Sky en Nebula fue bueno pero no el mejor contexto para su musica. El post rock instrumental necesita una audiencia completamente enfocada y en un festival hay demasiadas distracciones. Aun asi los momentos de silencio fueron impresionantes.", etiquetas: ["Post Rock", "Instrumental", "Contexto incorrecto"] },
  { id_asistente: 20, id_presentacion: 20, calificacion: 5, comentario: "Nicolas Jaar en Nebula fue el set mas intelectualmente estimulante del festival. Su uso del silencio como instrumento, las texturas experimentales y la progresion del set demostraron que sigue siendo uno de los artistas mas originales del electronic.", etiquetas: ["Electronic", "Experimental", "Intelectual"] },
  { id_asistente: 21, id_presentacion: 21, calificacion: 5, comentario: "Ela Minus fue la revelacion colombiana del festival. Su modular Buchla en vivo produjo sonidos que nunca habia escuchado. Es increible que tengamos una artista de este nivel representando a Colombia internacionalmente.", etiquetas: ["Electronic", "Colombia", "Modular"] },
  { id_asistente: 22, id_presentacion: 22, calificacion: 4, comentario: "Systema Solar abrio el Mainstage con una energia brutal. La cumbia electronica con siete musicos en escena fue el mejor inicio posible para el festival. El publico bogotano reconocio inmediatamente cada ritmo.", etiquetas: ["Electronic Cumbia", "Colombia", "Energia"] },
  { id_asistente: 23, id_presentacion: 23, calificacion: 5, comentario: "Bomba Estereo en el Mainstage el segundo dia fue el momento mas emotivo del festival. Liliana Saumet es una presencia escénica incomparable y la banda sonó perfecta. Que orgullo ver a una artista colombiana en ese escenario.", etiquetas: ["Electronic Cumbia", "Colombia", "Emotivo"] },
  { id_asistente: 24, id_presentacion: 24, calificacion: 4, comentario: "Monsieur Periné en Roots fue un oasis de elegancia en el festival. Jazz pop con matices latinos en un espacio intimo fue exactamente lo que necesitaba despues de tanto techno. Santiago Cruz y Catalina Garcia tienen una quimica escénica increible.", etiquetas: ["Jazz Pop", "Elegante", "Intimo"] },
  { id_asistente: 25, id_presentacion: 25, calificacion: 3, comentario: "Diamante Electrico estuvo correcto pero el sonido del Underground no les favorecio. El rock necesita mas graves y el sistema no estaba calibrado para eso. Las canciones nuevas suenan bien pero los clasicos siguen siendo superiores.", etiquetas: ["Rock", "Sonido incorrecto", "Colombia"] },
  { id_asistente: 26, id_presentacion: 26, calificacion: 4, comentario: "Sidestepper en Nebula fue una experiencia muy especial. Richard Blair es un pionero de la cumbia electronica y verlo en vivo con percusion real mas electronics fue una leccion de como se fusionan generos con respeto y creatividad.", etiquetas: ["Electronic Cumbia", "Fusion", "Pionero"] },
  { id_asistente: 27, id_presentacion: 27, calificacion: 5, comentario: "Lido Pimienta en Underground fue el momento mas politico y artistico del festival. Su propuesta no es solo musica sino una declaracion cultural. El publico que la conocia cantaba cada letra y los que no la conocian quedaron fascinados.", etiquetas: ["Electronic", "Colombia", "Politico"] },
  { id_asistente: 28, id_presentacion: 28, calificacion: 3, comentario: "Meridian Brothers es para un publico muy especifico. Su experimental no es para todos y en un festival masivo eso se nota. Los que conocen su trabajo lo disfrutaron enormemente pero el publico general se disperso rapidamente.", etiquetas: ["Experimental", "Nicho", "Colombia"] },
  { id_asistente: 29, id_presentacion: 29, calificacion: 4, comentario: "Doctor Krapula en el Mainstage fue una fiesta total. Reggae rock con ocho musicos que no paran de moverse y un frontman que domina el escenario. El mensaje social en sus canciones resuena especialmente en Bogota.", etiquetas: ["Reggae Rock", "Mensaje social", "Colombia"] },
  { id_asistente: 30, id_presentacion: 30, calificacion: 4, comentario: "Chocquibtown cerro el Mainstage del ultimo dia con una presentacion llena de orgullo colombiano. GoGo Menjura tiene un carisma arrollador y la banda sono impecable. Perfecta forma de cerrar el componente nacional del festival.", etiquetas: ["Hip Hop", "Colombia", "Cierre"] }
];

resenasDetalladas.forEach(r => {
  db.resenas_publico.insertOne({
    id_asistente: r.id_asistente,
    id_presentacion: r.id_presentacion,
    calificacion: r.calificacion,
    comentario: r.comentario,
    fecha_resena: new Date(`2026-11-${14 + (r.id_presentacion % 3)}`),
    etiquetas: r.etiquetas
  });
});

// DATOS DE PRUEBA - REPORTES DE INCIDENTES

const reportesDetallados = [
  { id_escenario: 1, id_staff: 1, tipo: "Sonido", gravedad: "Alta", descripcion: "Falla en el subwoofer principal del Mainstage durante la prueba de sonido de Martin Garrix. El sistema L-Acoustics K2 perdio señal en el canal izquierdo.", accion: "Tecnico de sonido reemplazo el amplificador de potencia defectuoso. Sistema restaurado 45 minutos antes del show.", estado: "Resuelto", personas: 0 },
  { id_escenario: 2, id_staff: 5, tipo: "Seguridad", gravedad: "Media", descripcion: "Grupo de aproximadamente 15 personas intento ingresar al area VIP de Nebula con boletas generales durante el set de Amelie Lens.", accion: "Personal de seguridad contendio el acceso y redireccionó al grupo a la zona correspondiente. Sin incidentes fisicos.", estado: "Resuelto", personas: 15 },
  { id_escenario: 3, id_staff: 9, tipo: "Logistica", gravedad: "Baja", descripcion: "Demora en la entrega del rider tecnico de Bicep. Bebidas y snacks del camerino llegaron 30 minutos tarde.", accion: "Coordinador de produccion gestiono entrega prioritaria. Artista notificado y disculpas extendidas.", estado: "Resuelto", personas: 0 },
  { id_escenario: 4, id_staff: 13, tipo: "Medico", gravedad: "Media", descripcion: "Asistente presento desmayo cerca del escenario Underground durante el set de Jon Hopkins. Posible deshidratacion.", accion: "Medico de planta atendio en sitio. Suero intravenoso administrado. Paciente estabilizado y trasladado a enfermeria.", estado: "Resuelto", personas: 1 },
  { id_escenario: 1, id_staff: 2, tipo: "Iluminacion", gravedad: "Baja", descripcion: "Tres fixtures de iluminacion LED fallaron durante el segundo dia del festival en el Mainstage. No afecto la experiencia del publico.", accion: "Tecnico de iluminacion reemplazó los fixtures durante el cambio de set entre artistas.", estado: "Resuelto", personas: 0 },
  { id_escenario: 2, id_staff: 6, tipo: "Sonido", gravedad: "Alta", descripcion: "Retroalimentacion aguda en el sistema de monitores de Nebula al inicio del set de Charlotte de Witte. El publico cerca de los parlantes laterales se quejo.", accion: "Ingeniero de monitoreo ajusto la ecualizacion y redujo el nivel de los side fills. Problema corregido en 3 minutos.", estado: "Resuelto", personas: 50 },
  { id_escenario: 3, id_staff: 10, tipo: "Seguridad", gravedad: "Media", descripcion: "Pelea entre dos asistentes en el area de baile de Roots durante el set de Khruangbin. Discusion por espacio personal.", accion: "Dos guardias de seguridad separaron a los involucrados. Uno de ellos fue retirado del evento. Sin heridos.", estado: "Resuelto", personas: 2 },
  { id_escenario: 4, id_staff: 14, tipo: "Logistica", gravedad: "Baja", descripcion: "Fila de banos portatiles sector Underground supero capacidad razonable durante el pico de asistencia. Tiempo de espera superior a 20 minutos.", accion: "Coordinador de logistica habilito banos adicionales del sector adyacente y genero flujo alterno.", estado: "Resuelto", personas: 200 },
  { id_escenario: 1, id_staff: 3, tipo: "Medico", gravedad: "Critica", descripcion: "Asistente con reaccion alergica severa en zona VIP del Mainstage. Posible anafilaxia tras consumo de alimento en el area de catering premium.", accion: "Medico de urgencias aplico epinefrina. Ambulancia solicitada. Paciente trasladado a hospital Clinica del Country. Familia notificada.", estado: "Resuelto", personas: 1 },
  { id_escenario: 2, id_staff: 7, tipo: "Iluminacion", gravedad: "Media", descripcion: "El sistema de proyeccion de videos de Nebula presento fallas de sincronizacion durante el set de Nicolas Jaar. Los visuales se adelantaban al audio.", accion: "Tecnico de video resincronizzo el sistema durante un breakdown del artista. Jaar mostro comprension ante la situacion.", estado: "Resuelto", personas: 0 },
  { id_escenario: 3, id_staff: 11, tipo: "Sonido", gravedad: "Baja", descripcion: "Nivel de graves excesivo en Roots durante el set de Bonobo afecto levemente a residentes del sector norte del parque. Quejas recibidas por operaciones.", accion: "Ingeniero de sonido ajusto la curva de bajas frecuencias sin afectar la experiencia del publico interno.", estado: "Resuelto", personas: 0 },
  { id_escenario: 4, id_staff: 15, tipo: "Seguridad", gravedad: "Alta", descripcion: "Intento de ingreso con sustancias no permitidas en el Underground. Detectado en revision de seguridad en la entrada del recinto.", accion: "Sustancias decomisadas. Persona retirada del evento y entregada a autoridades presentes. Reporte formal levantado.", estado: "Resuelto", personas: 1 },
  { id_escenario: 1, id_staff: 4, tipo: "Logistica", gravedad: "Media", descripcion: "Congestion vehicular en el parqueadero norte causo retrasos de hasta 45 minutos en el ingreso del personal tecnico del tercer dia.", accion: "Coordinador de produccion habilito acceso por puerta de servicios. Comunicacion a todos los equipos tecnicos via radio.", estado: "Resuelto", personas: 0 },
  { id_escenario: 2, id_staff: 8, tipo: "Medico", gravedad: "Media", descripcion: "Dos asistentes con intoxicacion etilica leve en el sector de Nebula. Comportamiento alterado pero sin agresividad.", accion: "Equipo medico evaluo a los dos asistentes. Uno fue llevado a enfermeria para hidratacion. El otro fue acompanado por sus amigos.", estado: "Resuelto", personas: 2 },
  { id_escenario: 3, id_staff: 12, tipo: "Iluminacion", gravedad: "Baja", descripcion: "Fallo el sistema de iluminacion de emergencia del corredor de acceso a Roots durante el ultimo dia. Riesgo menor de tropiezos.", accion: "Tecnico electrico reestablecio el sistema en 15 minutos. Guardias con linternas cubrieron el area durante la intervencion.", estado: "Resuelto", personas: 0 },
  { id_escenario: 4, id_staff: 13, tipo: "Sonido", gravedad: "Media", descripcion: "Interferencia de radiofrecuencia en el sistema de comunicacion del staff del Underground durante 20 minutos en el segundo dia.", accion: "Tecnico de RF cambio los canales de comunicacion y el problema se resolvio. Se recomienda revision previa al tercer dia.", estado: "Resuelto", personas: 0 },
  { id_escenario: 1, id_staff: 1, tipo: "Seguridad", gravedad: "Media", descripcion: "Asistente escalo barrera de contencion en el Mainstage durante el climax del set de Jungle intentando acercarse al escenario.", accion: "Dos guardias de primera linea interceptaron al asistente de forma segura. Fue retirado temporalmente y readmitido tras firma de advertencia.", estado: "Resuelto", personas: 1 },
  { id_escenario: 2, id_staff: 5, tipo: "Logistica", gravedad: "Baja", descripcion: "Falta de senalizacion clara en la salida sur de Nebula genero confusion en el flujo de publico al finalizar el set de Peggy Gou.", accion: "Guardias adicionales ubicados en puntos estrategicos para orientar al publico. Senalizacion temporal instalada.", estado: "Resuelto", personas: 500 },
  { id_escenario: 3, id_staff: 9, tipo: "Medico", gravedad: "Baja", descripcion: "Asistente con crisis de ansiedad leve en el area de Roots. Primera vez en un festival masivo segun su acompanante.", accion: "Medico de planta atendio en espacio tranquilo del area medica. Tecnicas de respiracion aplicadas. Alta voluntaria despues de 20 minutos.", estado: "Resuelto", personas: 1 },
  { id_escenario: 4, id_staff: 14, tipo: "Iluminacion", gravedad: "Baja", descripcion: "Luces de escenario del Underground parpadearon de manera irregular durante 5 minutos al inicio del festival. Causa: sobrecarga en el panel electrico.", accion: "Electricista de turno identifico el circuito sobrecargado y redistribuyo la carga. Sin impacto en la experiencia del publico.", estado: "Resuelto", personas: 0 },
  { id_escenario: 1, id_staff: 2, tipo: "Sonido", gravedad: "Baja", descripcion: "Microfono de talk back del Mainstage fallo durante el cambio de set entre Fisher y Martin Garrix causando retraso de 5 minutos.", accion: "Tecnico de escenario reemplazo el microfono de repuesto disponible en el rack de backline.", estado: "Resuelto", personas: 0 },
  { id_escenario: 2, id_staff: 6, tipo: "Seguridad", gravedad: "Baja", descripcion: "Boleta falsa detectada en acceso a Nebula en el segundo dia. El asistente presento una copia digital alterada.", accion: "Coordinador de accesos retuvo la boleta y el asistente fue retirado del evento. Denuncia formal presentada a la produccion.", estado: "Resuelto", personas: 1 },
  { id_escenario: 3, id_staff: 10, tipo: "Logistica", gravedad: "Media", descripcion: "Artista Tycho solicito cambio de temperatura en camerino de Roots una hora antes de su presentacion. El clima del dia fue mas caluroso de lo previsto.", accion: "Produccion instalo unidad de aire acondicionado portatil adicional. Temperatura llevada a 18C segun solicitud.", estado: "Resuelto", personas: 0 },
  { id_escenario: 4, id_staff: 15, tipo: "Medico", gravedad: "Alta", descripcion: "Asistente con fractura de muneca tras caida en la zona de baile del Underground. Piso mojado por derrame de bebidas.", accion: "Medico inmovilizo la muneca con ferula. Ambulancia solicitada. Paciente trasladado a urgencias. Reporte de accidente levantado para seguimiento legal.", estado: "Resuelto", personas: 1 },
  { id_escenario: 1, id_staff: 3, tipo: "Iluminacion", gravedad: "Media", descripcion: "El laser principal del Mainstage supero angulos de seguridad establecidos durante el show de Tale Of Us. Riesgo para el publico en plataformas elevadas.", accion: "Operador de laser ajusto los limites de zona de exclusion inmediatamente. Show continuo sin interrupcion. Protocolo de seguridad revisado.", estado: "Resuelto", personas: 0 },
  { id_escenario: 2, id_staff: 7, tipo: "Sonido", gravedad: "Media", descripcion: "El sistema de sonido de Nebula presento distorsion en frecuencias medias durante el primer track del set de Explosions in the Sky.", accion: "Ingeniero de sala identifico un driver danado en la linea de delay central. Reemplazado durante un pasaje instrumental del show.", estado: "Resuelto", personas: 0 },
  { id_escenario: 3, id_staff: 11, tipo: "Seguridad", gravedad: "Baja", descripcion: "Fotógrafo sin credencial de prensa intento acceder al pit de fotografia de Roots durante el set de Floating Points.", accion: "Coordinador de prensa verifico la lista de acreditados y el fotografo fue retirado del pit. Se le asigno zona de publico general.", estado: "Resuelto", personas: 1 },
  { id_escenario: 4, id_staff: 13, tipo: "Logistica", gravedad: "Baja", descripcion: "Atraso de 10 minutos en el inicio del set de Tourist en Underground por demora en el check de sonido del artista anterior.", accion: "Stage manager notificó al artista y al publico via pantalla. Set iniciado con 10 minutos de retraso sin mayores consecuencias.", estado: "Resuelto", personas: 0 },
  { id_escenario: 1, id_staff: 4, tipo: "Medico", gravedad: "Baja", descripcion: "Quince asistentes reportaron irritacion leve en ojos por exceso de humo artificial durante el set de Bomba Estereo en el Mainstage.", accion: "Equipo medico proporciono colirio a los afectados. Operador de efectos especiales redujo la frecuencia de los disparos de humo.", estado: "Resuelto", personas: 15 },
  { id_escenario: 2, id_staff: 8, tipo: "Iluminacion", gravedad: "Baja", descripcion: "Pantalla LED lateral de Nebula mostro artefactos visuales durante 8 minutos en el set de Bicep. Problema de procesador de video.", accion: "Operador de video reinicio el procesador de señal. Pantalla recupero funcionamiento normal sin afectar el show del artista.", estado: "Resuelto", personas: 0 }
];

reportesDetallados.forEach(r => {
  db.reportes_incidentes.insertOne({
    id_escenario: r.id_escenario,
    id_staff: r.id_staff,
    tipo_incidente: r.tipo,
    gravedad: r.gravedad,
    fecha_incidente: new Date(`2026-11-${14 + (r.id_staff % 3)}T${18 + (r.id_staff % 6)}:00:00`),
    detalle: {
      descripcion: r.descripcion,
      accion_tomada: r.accion,
      estado: r.estado
    },
    personas_afectadas: r.personas,
    observaciones: "Reporte verificado por coordinador de produccion"
  });
});

print("Datos de prueba variados insertados correctamente.");
