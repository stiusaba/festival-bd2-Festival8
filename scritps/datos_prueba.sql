-- Script: datos_prueba.sql

-- ESCENARIOS

INSERT INTO Escenarios (nombre, capacidad, tipo, ubicacion_en_sede, tiene_cubierta) VALUES
('Mainstage', 25000, 'principal', 'Zona norte del parque', FALSE),
('Nebula', 8000, 'alterno', 'Zona oriente del parque', FALSE),
('Roots', 4000, 'acustico', 'Zona sur del parque', TRUE),
('Underground', 3000, 'alterno', 'Zona occidente del parque', TRUE);

-- TIPOS DE BOLETA

INSERT INTO Tipos_Boleta (nombre, precio, cupo_maximo, descripcion, incluye_beneficios) VALUES
('Early Bird', 100000, 5000, 'Acceso general anticipado a precio especial', FALSE),
('General', 150000, 20000, 'Acceso a todos los escenarios', FALSE),
('VIP', 350000, 8000, 'Acceso preferencial con zona exclusiva', TRUE),
('Palco', 600000, 2000, 'Palco exclusivo con meet and greet', TRUE);

-- ARTISTAS

INSERT INTO Artistas (nombre, genero_musical, pais_origen, cache_usd, rider_tecnico, fecha_registro) VALUES
('Martin Garrix', 'EDM', 'Países Bajos', 150000.00, 'Sistema de sonido L-Acoustics, 2 monitores', '2026-01-10'),
('Amelie Lens', 'Techno', 'Bélgica', 80000.00, 'CDJ-3000, mixer DJM-V10', '2026-01-12'),
('Charlotte de Witte', 'Techno', 'Bélgica', 90000.00, 'CDJ-3000, mixer DJM-900', '2026-01-15'),
('Fisher', 'House', 'Australia', 70000.00, 'Pioneer setup completo', '2026-01-18'),
('Peggy Gou', 'House', 'Corea del Sur', 85000.00, 'CDJ-3000, mixer DJM-V10', '2026-01-20'),
('Tale Of Us', 'Melodic Techno', 'Italia', 95000.00, 'Sistema modular, CDJ-3000', '2026-01-22'),
('Bicep', 'Electronic', 'Reino Unido', 75000.00, 'Setup Ableton Live + controladores', '2026-01-25'),
('Four Tet', 'Electronic', 'Reino Unido', 65000.00, 'Setup Ableton Live personalizado', '2026-01-28'),
('Floating Points', 'Electronic', 'Reino Unido', 60000.00, 'Piano de cola + setup electronico', '2026-02-01'),
('Jon Hopkins', 'Electronic', 'Reino Unido', 55000.00, 'Setup Ableton Live + teclados', '2026-02-03'),
('Caribou', 'Indie Electronic', 'Canadá', 50000.00, 'Bateria en vivo + setup electronico', '2026-02-05'),
('Bonobo', 'Indie Electronic', 'Reino Unido', 70000.00, 'Banda completa 6 musicos', '2026-02-08'),
('Khruangbin', 'Indie', 'Estados Unidos', 65000.00, 'Banda completa 3 musicos', '2026-02-10'),
('Cigarettes After Sex', 'Indie', 'Estados Unidos', 55000.00, 'Banda completa 4 musicos', '2026-02-12'),
('Turnover', 'Indie Rock', 'Estados Unidos', 40000.00, 'Banda completa 4 musicos', '2026-02-15'),
('Jungle', 'Funk Electronic', 'Reino Unido', 60000.00, 'Banda completa 8 musicos', '2026-02-18'),
('Tourist', 'Electronic', 'Reino Unido', 45000.00, 'Setup Ableton Live + guitarra', '2026-02-20'),
('Tycho', 'Ambient Electronic', 'Estados Unidos', 50000.00, 'Banda completa 4 musicos', '2026-02-22'),
('Explosions in the Sky', 'Post Rock', 'Estados Unidos', 55000.00, 'Banda completa 4 musicos', '2026-02-25'),
('Nicolas Jaar', 'Electronic', 'Chile', 75000.00, 'Setup modular personalizado', '2026-02-28'),
('Ela Minus', 'Electronic', 'Colombia', 35000.00, 'Setup modular Buchla', '2026-03-01'),
('Systema Solar', 'Electronic Cumbia', 'Colombia', 30000.00, 'Banda completa 7 musicos', '2026-03-03'),
('Bomba Estereo', 'Electronic Cumbia', 'Colombia', 40000.00, 'Banda completa 5 musicos', '2026-03-05'),
('Monsieur Periné', 'Jazz Pop', 'Colombia', 35000.00, 'Banda completa 6 musicos', '2026-03-08'),
('Diamante Electrico', 'Rock', 'Colombia', 30000.00, 'Banda completa 3 musicos', '2026-03-10'),
('Sidestepper', 'Electronic Cumbia', 'Colombia', 25000.00, 'Setup electronico + percusion', '2026-03-12'),
('Lido Pimienta', 'Electronic', 'Colombia', 35000.00, 'Setup electronico personalizado', '2026-03-15'),
('Meridian Brothers', 'Experimental', 'Colombia', 20000.00, 'Setup electronico experimental', '2026-03-18'),
('Doctor Krapula', 'Reggae Rock', 'Colombia', 25000.00, 'Banda completa 8 musicos', '2026-03-20'),
('Chocquibtown', 'Hip Hop', 'Colombia', 30000.00, 'Banda completa 5 musicos', '2026-03-22');

-- CONTRATOS

INSERT INTO Contratos (id_artista, fecha_firma, fecha_vencimiento, monto_total, condiciones, estado) VALUES
(1, '2026-02-01', '2026-11-17', 150000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(2, '2026-02-05', '2026-11-17', 80000.00, 'Pago 100% anticipado', 'activo'),
(3, '2026-02-08', '2026-11-17', 90000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(4, '2026-02-10', '2026-11-17', 70000.00, 'Pago 100% anticipado', 'activo'),
(5, '2026-02-12', '2026-11-17', 85000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(6, '2026-02-15', '2026-11-17', 95000.00, 'Pago 30% firma, 70% post evento', 'activo'),
(7, '2026-02-18', '2026-11-17', 75000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(8, '2026-02-20', '2026-11-17', 65000.00, 'Pago 100% anticipado', 'activo'),
(9, '2026-02-22', '2026-11-17', 60000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(10, '2026-02-25', '2026-11-17', 55000.00, 'Pago 100% anticipado', 'activo'),
(11, '2026-02-28', '2026-11-17', 50000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(12, '2026-03-01', '2026-11-17', 70000.00, 'Pago 30% firma, 70% post evento', 'activo'),
(13, '2026-03-03', '2026-11-17', 65000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(14, '2026-03-05', '2026-11-17', 55000.00, 'Pago 100% anticipado', 'activo'),
(15, '2026-03-08', '2026-11-17', 40000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(16, '2026-03-10', '2026-11-17', 60000.00, 'Pago 30% firma, 70% post evento', 'activo'),
(17, '2026-03-12', '2026-11-17', 45000.00, 'Pago 100% anticipado', 'activo'),
(18, '2026-03-15', '2026-11-17', 50000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(19, '2026-03-18', '2026-11-17', 55000.00, 'Pago 100% anticipado', 'activo'),
(20, '2026-03-20', '2026-11-17', 75000.00, 'Pago 30% firma, 70% post evento', 'activo'),
(21, '2026-03-22', '2026-11-17', 35000.00, 'Pago 100% anticipado', 'activo'),
(22, '2026-03-25', '2026-11-17', 30000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(23, '2026-03-28', '2026-11-17', 40000.00, 'Pago 100% anticipado', 'activo'),
(24, '2026-04-01', '2026-11-17', 35000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(25, '2026-04-03', '2026-11-17', 30000.00, 'Pago 100% anticipado', 'activo'),
(26, '2026-04-05', '2026-11-17', 25000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(27, '2026-04-08', '2026-11-17', 35000.00, 'Pago 100% anticipado', 'activo'),
(28, '2026-04-10', '2026-11-17', 20000.00, 'Pago 50% anticipado, 50% post evento', 'activo'),
(29, '2026-04-12', '2026-11-17', 25000.00, 'Pago 100% anticipado', 'activo'),
(30, '2026-04-15', '2026-11-17', 30000.00, 'Pago 50% anticipado, 50% post evento', 'activo');

-- PRESENTACIONES

INSERT INTO Presentaciones (id_artista, id_escenario, fecha, hora_inicio, hora_fin, estado) VALUES
(1, 1, '2026-11-16', '21:00', '23:00', 'programada'),
(2, 2, '2026-11-14', '20:00', '22:00', 'programada'),
(3, 2, '2026-11-15', '21:00', '23:00', 'programada'),
(4, 1, '2026-11-14', '18:00', '20:00', 'programada'),
(5, 2, '2026-11-16', '19:00', '21:00', 'programada'),
(6, 1, '2026-11-15', '20:00', '22:00', 'programada'),
(7, 3, '2026-11-14', '17:00', '19:00', 'programada'),
(8, 3, '2026-11-15', '18:00', '20:00', 'programada'),
(9, 3, '2026-11-16', '17:00', '19:00', 'programada'),
(10, 4, '2026-11-14', '16:00', '18:00', 'programada'),
(11, 3, '2026-11-14', '14:00', '16:00', 'programada'),
(12, 1, '2026-11-14', '15:00', '17:00', 'programada'),
(13, 3, '2026-11-15', '15:00', '17:00', 'programada'),
(14, 4, '2026-11-15', '16:00', '18:00', 'programada'),
(15, 4, '2026-11-14', '14:00', '16:00', 'programada'),
(16, 1, '2026-11-15', '17:00', '19:00', 'programada'),
(17, 4, '2026-11-16', '15:00', '17:00', 'programada'),
(18, 3, '2026-11-16', '14:00', '16:00', 'programada'),
(19, 2, '2026-11-14', '17:00', '19:00', 'programada'),
(20, 2, '2026-11-15', '18:00', '20:00', 'programada'),
(21, 4, '2026-11-14', '12:00', '14:00', 'programada'),
(22, 1, '2026-11-14', '12:00', '14:00', 'programada'),
(23, 1, '2026-11-15', '13:00', '15:00', 'programada'),
(24, 3, '2026-11-14', '11:00', '13:00', 'programada'),
(25, 4, '2026-11-15', '13:00', '15:00', 'programada'),
(26, 2, '2026-11-16', '16:00', '18:00', 'programada'),
(27, 4, '2026-11-16', '17:00', '19:00', 'programada'),
(28, 2, '2026-11-14', '14:00', '16:00', 'programada'),
(29, 1, '2026-11-16', '13:00', '15:00', 'programada'),
(30, 1, '2026-11-16', '15:00', '17:00', 'programada');

-- ASISTENTES

INSERT INTO Asistentes (nombre, email, telefono, numero_documento, ciudad_origen, fecha_registro) VALUES
('Carlos Ramirez', 'carlos.ramirez@gmail.com', '3101234567', '1020304050', 'Bogotá', '2026-04-01'),
('Maria Lopez', 'maria.lopez@hotmail.com', '3112345678', '1030405060', 'Medellín', '2026-04-02'),
('Andres Torres', 'andres.torres@gmail.com', '3123456789', '1040506070', 'Cali', '2026-04-03'),
('Valentina Gomez', 'valentina.gomez@gmail.com', '3134567890', '1050607080', 'Bogotá', '2026-04-04'),
('Santiago Herrera', 'santiago.herrera@outlook.com', '3145678901', '1060708090', 'Barranquilla', '2026-04-05'),
('Daniela Castro', 'daniela.castro@gmail.com', '3156789012', '1070809100', 'Bogotá', '2026-04-06'),
('Felipe Mora', 'felipe.mora@gmail.com', '3167890123', '1080910110', 'Bucaramanga', '2026-04-07'),
('Laura Jimenez', 'laura.jimenez@hotmail.com', '3178901234', '1091011120', 'Bogotá', '2026-04-08'),
('Juan Vargas', 'juan.vargas@gmail.com', '3189012345', '1101112130', 'Manizales', '2026-04-09'),
('Camila Diaz', 'camila.diaz@gmail.com', '3190123456', '1111213140', 'Bogotá', '2026-04-10'),
('Diego Martinez', 'diego.martinez@gmail.com', '3201234568', '1121314150', 'Pereira', '2026-04-11'),
('Isabella Rojas', 'isabella.rojas@outlook.com', '3212345679', '1131415160', 'Bogotá', '2026-04-12'),
('Sebastian Gutierrez', 'sebastian.gutierrez@gmail.com', '3223456780', '1141516170', 'Cartagena', '2026-04-13'),
('Mariana Sanchez', 'mariana.sanchez@gmail.com', '3234567891', '1151617180', 'Bogotá', '2026-04-14'),
('Nicolas Perez', 'nicolas.perez@hotmail.com', '3245678902', '1161718190', 'Medellin', '2026-04-15'),
('Sara Mendoza', 'sara.mendoza@gmail.com', '3256789013', '1171819200', 'Bogotá', '2026-04-16'),
('Mateo Rios', 'mateo.rios@gmail.com', '3267890124', '1181920210', 'Armenia', '2026-04-17'),
('Paula Alvarez', 'paula.alvarez@outlook.com', '3278901235', '1192021220', 'Bogotá', '2026-04-18'),
('Alejandro Cruz', 'alejandro.cruz@gmail.com', '3289012346', '1202122230', 'Ibague', '2026-04-19'),
('Natalia Reyes', 'natalia.reyes@gmail.com', '3290123457', '1212223240', 'Bogotá', '2026-04-20'),
('David Moreno', 'david.moreno@gmail.com', '3301234569', '1222324250', 'Cucuta', '2026-04-21'),
('Luisa Fernandez', 'luisa.fernandez@hotmail.com', '3312345670', '1232425260', 'Bogotá', '2026-04-22'),
('Esteban Vargas', 'esteban.vargas@gmail.com', '3323456781', '1242526270', 'Neiva', '2026-04-23'),
('Gabriela Ortiz', 'gabriela.ortiz@gmail.com', '3334567892', '1252627280', 'Bogotá', '2026-04-24'),
('Ricardo Molina', 'ricardo.molina@outlook.com', '3345678903', '1262728290', 'Villavicencio', '2026-04-25'),
('Juliana Cardona', 'juliana.cardona@gmail.com', '3356789014', '1272829300', 'Bogotá', '2026-04-26'),
('Andres Ospina', 'andres.ospina@gmail.com', '3367890125', '1282930310', 'Pasto', '2026-04-27'),
('Catalina Mejia', 'catalina.mejia@hotmail.com', '3378901236', '1293031320', 'Bogotá', '2026-04-28'),
('Jorge Salazar', 'jorge.salazar@gmail.com', '3389012347', '1303132330', 'Santa Marta', '2026-04-29'),
('Manuela Aguilar', 'manuela.aguilar@gmail.com', '3390123458', '1313233340', 'Bogotá', '2026-04-30');

-- VENTAS

INSERT INTO Ventas (id_asistente, id_tipo_boleta, fecha_venta, cantidad, total, metodo_pago) VALUES
(1, 3, '2026-05-01', 2, 700000.00, 'tarjeta'),
(2, 2, '2026-05-02', 1, 150000.00, 'PSE'),
(3, 4, '2026-05-02', 1, 600000.00, 'tarjeta'),
(4, 1, '2026-05-03', 2, 200000.00, 'transferencia'),
(5, 2, '2026-05-03', 3, 450000.00, 'PSE'),
(6, 3, '2026-05-04', 1, 350000.00, 'tarjeta'),
(7, 1, '2026-05-04', 2, 200000.00, 'efectivo'),
(8, 4, '2026-05-05', 1, 600000.00, 'tarjeta'),
(9, 2, '2026-05-05', 2, 300000.00, 'PSE'),
(10, 3, '2026-05-06', 1, 350000.00, 'transferencia'),
(11, 1, '2026-05-06', 3, 300000.00, 'efectivo'),
(12, 2, '2026-05-07', 1, 150000.00, 'tarjeta'),
(13, 4, '2026-05-07', 2, 1200000.00, 'tarjeta'),
(14, 3, '2026-05-08', 1, 350000.00, 'PSE'),
(15, 2, '2026-05-08', 2, 300000.00, 'transferencia'),
(16, 1, '2026-05-09', 1, 100000.00, 'efectivo'),
(17, 3, '2026-05-09', 2, 700000.00, 'tarjeta'),
(18, 4, '2026-05-10', 1, 600000.00, 'PSE'),
(19, 2, '2026-05-10', 3, 450000.00, 'tarjeta'),
(20, 1, '2026-05-11', 2, 200000.00, 'transferencia'),
(21, 3, '2026-05-11', 1, 350000.00, 'tarjeta'),
(22, 2, '2026-05-12', 2, 300000.00, 'PSE'),
(23, 4, '2026-05-12', 1, 600000.00, 'tarjeta'),
(24, 1, '2026-05-13', 3, 300000.00, 'efectivo'),
(25, 3, '2026-05-13', 1, 350000.00, 'transferencia'),
(26, 2, '2026-05-14', 2, 300000.00, 'tarjeta'),
(27, 4, '2026-05-14', 1, 600000.00, 'PSE'),
(28, 1, '2026-05-15', 2, 200000.00, 'efectivo'),
(29, 3, '2026-05-15', 1, 350000.00, 'tarjeta'),
(30, 2, '2026-05-16', 3, 450000.00, 'PSE');

-- STAFF

INSERT INTO Staff (nombre, rol, id_escenario, telefono_emergencia, turno) VALUES
('Pedro Suarez', 'seguridad', 1, '3101111111', 'completo'),
('Ana Blanco', 'logistica', 1, '3102222222', 'dia'),
('Luis Cano', 'sonido', 1, '3103333333', 'completo'),
('Rosa Vidal', 'medico', 1, '3104444444', 'completo'),
('Mario Pena', 'seguridad', 2, '3105555555', 'completo'),
('Clara Ruiz', 'logistica', 2, '3106666666', 'dia'),
('Hector Luna', 'sonido', 2, '3107777777', 'completo'),
('Sofia Ibarra', 'medico', 2, '3108888888', 'noche'),
('Tomas Vera', 'seguridad', 3, '3109999999', 'completo'),
('Elena Soto', 'logistica', 3, '3110000000', 'dia'),
('Rafael Pardo', 'sonido', 3, '3111111112', 'completo'),
('Monica Gil', 'medico', 3, '3112222223', 'noche'),
('Fernando Ossa', 'seguridad', 4, '3113333334', 'completo'),
('Patricia Leal', 'logistica', 4, '3114444445', 'dia'),
('Andres Melo', 'sonido', 4, '3115555556', 'completo');

-- VERIFICACION

SELECT 'Artistas' AS tabla, COUNT(*) AS registros FROM Artistas
UNION ALL
SELECT 'Asistentes', COUNT(*) FROM Asistentes
UNION ALL
SELECT 'Ventas', COUNT(*) FROM Ventas
UNION ALL
SELECT 'Presentaciones', COUNT(*) FROM Presentaciones
UNION ALL
SELECT 'Contratos', COUNT(*) FROM Contratos
UNION ALL
SELECT 'Escenarios', COUNT(*) FROM Escenarios
UNION ALL
SELECT 'Tipos_Boleta', COUNT(*) FROM Tipos_Boleta
UNION ALL
SELECT 'Staff', COUNT(*) FROM Staff;