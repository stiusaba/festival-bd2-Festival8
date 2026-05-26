import tkinter as tk
from tkinter import ttk, font
import psycopg2
from pymongo import MongoClient
from datetime import datetime

# CONFIGURACION DE CONEXIONES

POSTGRES_URL = "postgresql://neondb_owner:npg_Gw4veB3QREio@ep-hidden-lake-ap4yjz0e-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

MONGO_URL = "mongodb+srv://soundwave_user:Soundwave2026@soundwavemongodb.14u7izn.mongodb.net/?retryWrites=true&w=majority&appName=soundwavemongodb"

MONGO_DB = "soundwave_mongodb"

# COLORES Y ESTILOS

COLORS = {
    "bg_dark":       "#0A0A0F",
    "bg_card":       "#12121A",
    "bg_panel":      "#1A1A2E",
    "accent":        "#6C63FF",
    "accent_2":      "#FF6584",
    "accent_3":      "#43E97B",
    "postgres":      "#336791",
    "mongo":         "#4DB33D",
    "text_primary":  "#FFFFFF",
    "text_secondary":"#A0A0B0",
    "text_muted":    "#606070",
    "border":        "#2A2A3E",
    "hover":         "#252538",
    "success":       "#43E97B",
    "warning":       "#FFD93D",
    "danger":        "#FF6584",
    "critical":      "#FF4444",
}

# CONEXIONES A BASE DE DATOS

def conectar_postgres():
    try:
        conn = psycopg2.connect(POSTGRES_URL)
        return conn
    except Exception as e:
        print(f"Error PostgreSQL: {e}")
        return None

def conectar_mongo():
    try:
        client = MongoClient(
            MONGO_URL,
            serverSelectionTimeoutMS=10000
        )
        client.server_info()
        db = client[MONGO_DB]
        return db
    except Exception as e:
        print(f"Error MongoDB: {e}")
        return None

# CONSULTAS POSTGRESQL

def obtener_artistas():
    conn = conectar_postgres()
    if conn is None:
        return []
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT a.id_artista, a.nombre, a.genero_musical,
                   a.pais_origen, a.cache_usd, a.rider_tecnico,
                   c.id_contrato, c.fecha_firma, c.fecha_vencimiento,
                   c.monto_total, c.condiciones, c.estado
            FROM Artistas a
            LEFT JOIN Contratos c ON a.id_artista = c.id_artista
            ORDER BY a.nombre
        """)
        return cur.fetchall()
    finally:
        conn.close()

def obtener_escenarios():
    conn = conectar_postgres()
    if conn is None:
        return []
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT id_escenario, nombre, capacidad, tipo,
                   ubicacion_en_sede, tiene_cubierta
            FROM Escenarios
            ORDER BY nombre
        """)
        return cur.fetchall()
    finally:
        conn.close()

def obtener_presentaciones_escenario(id_escenario):
    conn = conectar_postgres()
    if conn is None:
        return []
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT p.id_presentacion, a.nombre, p.fecha,
                   p.hora_inicio, p.hora_fin, p.estado
            FROM Presentaciones p
            JOIN Artistas a ON p.id_artista = a.id_artista
            WHERE p.id_escenario = %s
            ORDER BY p.fecha, p.hora_inicio
        """, (id_escenario,))
        return cur.fetchall()
    finally:
        conn.close()

# CONSULTAS MONGODB

def obtener_setlist(id_artista):
    db = conectar_mongo()
    if db is None:
        return None
    return db.setlists.find_one({"id_artista": id_artista})

def obtener_incidentes_escenario(id_escenario):
    db = conectar_mongo()
    if db is None:
        return []
    return list(db.reportes_incidentes.find(
        {"id_escenario": id_escenario},
        {"tipo_incidente": 1, "gravedad": 1,
         "detalle": 1, "personas_afectadas": 1, "_id": 0}
    ).sort("gravedad", -1))

def obtener_resenas_escenario(ids_presentacion):
    db = conectar_mongo()
    if db is None:
        return [], 0
    resenas = list(db.resenas_publico.find(
        {"id_presentacion": {"$in": ids_presentacion}},
        {"calificacion": 1, "comentario": 1,
         "id_presentacion": 1, "_id": 0}
    ))
    promedio = 0
    if resenas:
        promedio = sum(r["calificacion"] for r in resenas) / len(resenas)
    return resenas, round(promedio, 2)

# APLICACION PRINCIPAL

class SoundwaveApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Festival Soundwave Colombia — Sistema de Gestión Políglota")
        self.root.geometry("1300x800")
        self.root.configure(bg=COLORS["bg_dark"])
        self.root.resizable(True, True)

        self.artistas_data = []
        self.escenarios_data = []

        self.construir_ui()
        self.verificar_conexiones()
        self.cargar_datos_iniciales()

    # CONSTRUCCION DE UI

    def construir_ui(self):
        self.construir_header()
        self.construir_status_bar()
        self.construir_tabs()

    def construir_header(self):
        header = tk.Frame(self.root, bg=COLORS["bg_panel"], height=80)
        header.pack(fill="x", side="top")
        header.pack_propagate(False)

        inner = tk.Frame(header, bg=COLORS["bg_panel"])
        inner.pack(fill="both", expand=True, padx=30, pady=15)

        left = tk.Frame(inner, bg=COLORS["bg_panel"])
        left.pack(side="left", fill="y")

        tk.Label(left,
            text="◈ SOUNDWAVE COLOMBIA",
            font=("Segoe UI", 18, "bold"),
            fg=COLORS["accent"],
            bg=COLORS["bg_panel"]
        ).pack(side="left", padx=(0, 15))

        tk.Label(left,
            text="Sistema de Gestión Políglota",
            font=("Segoe UI", 11),
            fg=COLORS["text_secondary"],
            bg=COLORS["bg_panel"]
        ).pack(side="left")

        right = tk.Frame(inner, bg=COLORS["bg_panel"])
        right.pack(side="right", fill="y")

        tk.Label(right,
            text="14 — 16 NOV 2026  |  Parque Simón Bolívar, Bogotá",
            font=("Segoe UI", 10),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_panel"]
        ).pack(side="right")

    def construir_status_bar(self):
        status = tk.Frame(self.root, bg=COLORS["bg_dark"], height=36)
        status.pack(fill="x", side="top")
        status.pack_propagate(False)

        inner = tk.Frame(status, bg=COLORS["bg_dark"])
        inner.pack(fill="both", expand=True, padx=30)

        pg_frame = tk.Frame(inner, bg=COLORS["bg_dark"])
        pg_frame.pack(side="left", pady=8)

        tk.Label(pg_frame,
            text="⬡",
            font=("Segoe UI", 10),
            fg=COLORS["postgres"],
            bg=COLORS["bg_dark"]
        ).pack(side="left")

        self.pg_status = tk.Label(pg_frame,
            text=" PostgreSQL  •  Conectando...",
            font=("Segoe UI", 9),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        )
        self.pg_status.pack(side="left", padx=(2, 20))

        mg_frame = tk.Frame(inner, bg=COLORS["bg_dark"])
        mg_frame.pack(side="left", pady=8)

        tk.Label(mg_frame,
            text="⬡",
            font=("Segoe UI", 10),
            fg=COLORS["mongo"],
            bg=COLORS["bg_dark"]
        ).pack(side="left")

        self.mg_status = tk.Label(mg_frame,
            text=" MongoDB  •  Conectando...",
            font=("Segoe UI", 9),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        )
        self.mg_status.pack(side="left")

        self.time_label = tk.Label(inner,
            text="",
            font=("Segoe UI", 9),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        )
        self.time_label.pack(side="right", pady=8)
        self.actualizar_tiempo()

    def construir_tabs(self):
        tab_bar = tk.Frame(self.root, bg=COLORS["bg_dark"])
        tab_bar.pack(fill="x", padx=30, pady=(15, 0))

        self.tab_content = tk.Frame(self.root, bg=COLORS["bg_dark"])
        self.tab_content.pack(fill="both", expand=True, padx=30, pady=(0, 20))

        self.tab_artista_btn = self.crear_tab_btn(
            tab_bar, "◈  Reporte de Artista",
            lambda: self.mostrar_tab("artista"), True
        )
        self.tab_artista_btn.pack(side="left", padx=(0, 5))

        self.tab_escenario_btn = self.crear_tab_btn(
            tab_bar, "◈  Panel de Incidentes",
            lambda: self.mostrar_tab("escenario"), False
        )
        self.tab_escenario_btn.pack(side="left")

        self.frame_artista = tk.Frame(self.tab_content, bg=COLORS["bg_dark"])
        self.frame_escenario = tk.Frame(self.tab_content, bg=COLORS["bg_dark"])

        self.construir_tab_artista()
        self.construir_tab_escenario()

        self.mostrar_tab("artista")

    def crear_tab_btn(self, parent, text, command, activo):
        btn = tk.Button(parent,
            text=text,
            font=("Segoe UI", 10, "bold"),
            fg=COLORS["text_primary"] if activo else COLORS["text_muted"],
            bg=COLORS["accent"] if activo else COLORS["bg_panel"],
            activebackground=COLORS["accent"],
            activeforeground=COLORS["text_primary"],
            relief="flat",
            bd=0,
            padx=20,
            pady=10,
            cursor="hand2",
            command=command
        )
        return btn

    def mostrar_tab(self, tab):
        self.frame_artista.pack_forget()
        self.frame_escenario.pack_forget()

        if tab == "artista":
            self.frame_artista.pack(fill="both", expand=True)
            self.tab_artista_btn.config(
                bg=COLORS["accent"], fg=COLORS["text_primary"])
            self.tab_escenario_btn.config(
                bg=COLORS["bg_panel"], fg=COLORS["text_muted"])
        else:
            self.frame_escenario.pack(fill="both", expand=True)
            self.tab_artista_btn.config(
                bg=COLORS["bg_panel"], fg=COLORS["text_muted"])
            self.tab_escenario_btn.config(
                bg=COLORS["accent"], fg=COLORS["text_primary"])

    # TAB ARTISTA

    def construir_tab_artista(self):
        parent = self.frame_artista

        left = tk.Frame(parent, bg=COLORS["bg_card"], width=280)
        left.pack(side="left", fill="y", padx=(0, 15), pady=10)
        left.pack_propagate(False)

        tk.Label(left,
            text="ARTISTAS",
            font=("Segoe UI", 9, "bold"),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_card"]
        ).pack(anchor="w", padx=20, pady=(20, 5))

        tk.Label(left,
            text="Selecciona un artista para ver\nsu reporte completo",
            font=("Segoe UI", 9),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_card"],
            justify="left"
        ).pack(anchor="w", padx=20, pady=(0, 15))

        search_frame = tk.Frame(left, bg=COLORS["bg_panel"])
        search_frame.pack(fill="x", padx=15, pady=(0, 10))

        self.search_var = tk.StringVar()
        self.search_var.trace("w", self.filtrar_artistas)

        tk.Entry(search_frame,
            textvariable=self.search_var,
            font=("Segoe UI", 10),
            fg=COLORS["text_primary"],
            bg=COLORS["bg_panel"],
            insertbackground=COLORS["accent"],
            relief="flat",
            bd=8
        ).pack(fill="x")

        list_frame = tk.Frame(left, bg=COLORS["bg_card"])
        list_frame.pack(fill="both", expand=True, padx=15, pady=(0, 15))

        scrollbar = tk.Scrollbar(list_frame)
        scrollbar.pack(side="right", fill="y")

        self.lista_artistas = tk.Listbox(list_frame,
            font=("Segoe UI", 10),
            fg=COLORS["text_primary"],
            bg=COLORS["bg_panel"],
            selectbackground=COLORS["accent"],
            selectforeground=COLORS["text_primary"],
            relief="flat",
            bd=0,
            activestyle="none",
            yscrollcommand=scrollbar.set,
            cursor="hand2"
        )
        self.lista_artistas.pack(fill="both", expand=True)
        scrollbar.config(command=self.lista_artistas.yview)
        self.lista_artistas.bind("<<ListboxSelect>>", self.seleccionar_artista)

        right = tk.Frame(parent, bg=COLORS["bg_dark"])
        right.pack(side="left", fill="both", expand=True, pady=10)

        self.artista_result = tk.Frame(right, bg=COLORS["bg_dark"])
        self.artista_result.pack(fill="both", expand=True)

        self.mostrar_placeholder_artista()

    def mostrar_placeholder_artista(self):
        for w in self.artista_result.winfo_children():
            w.destroy()

        tk.Label(self.artista_result,
            text="◈",
            font=("Segoe UI", 48),
            fg=COLORS["border"],
            bg=COLORS["bg_dark"]
        ).pack(expand=True)

        tk.Label(self.artista_result,
            text="Selecciona un artista del panel izquierdo",
            font=("Segoe UI", 13),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        ).pack()

        tk.Label(self.artista_result,
            text="Ver datos de PostgreSQL + MongoDB combinados",
            font=("Segoe UI", 10),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        ).pack(pady=5)

    def seleccionar_artista(self, event):
        sel = self.lista_artistas.curselection()
        if not sel:
            return

        idx = sel[0]
        if idx >= len(self.artistas_filtrados):
            return

        artista = self.artistas_filtrados[idx]
        self.mostrar_reporte_artista(artista)

    def mostrar_reporte_artista(self, artista):
        for w in self.artista_result.winfo_children():
            w.destroy()

        canvas = tk.Canvas(
            self.artista_result, bg=COLORS["bg_dark"],
            highlightthickness=0)
        scrollbar = tk.Scrollbar(
            self.artista_result, orient="vertical",
            command=canvas.yview)
        canvas.configure(yscrollcommand=scrollbar.set)

        scrollbar.pack(side="right", fill="y")
        canvas.pack(side="left", fill="both", expand=True)

        frame = tk.Frame(canvas, bg=COLORS["bg_dark"])
        canvas_window = canvas.create_window(
            (0, 0), window=frame, anchor="nw")

        def on_frame_configure(e):
            canvas.configure(scrollregion=canvas.bbox("all"))

        def on_canvas_configure(e):
            canvas.itemconfig(canvas_window, width=e.width)

        frame.bind("<Configure>", on_frame_configure)
        canvas.bind("<Configure>", on_canvas_configure)
        canvas.bind_all("<MouseWheel>", lambda e: canvas.yview_scroll(
            int(-1*(e.delta/120)), "units"))

        header = tk.Frame(frame, bg=COLORS["accent"], height=5)
        header.pack(fill="x")

        title_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        title_frame.pack(fill="x", pady=(0, 15))

        tk.Label(title_frame,
            text=artista[1],
            font=("Segoe UI", 22, "bold"),
            fg=COLORS["text_primary"],
            bg=COLORS["bg_card"]
        ).pack(anchor="w", padx=25, pady=(20, 2))

        tk.Label(title_frame,
            text=f"{artista[2]}  ·  {artista[3]}",
            font=("Segoe UI", 11),
            fg=COLORS["text_secondary"],
            bg=COLORS["bg_card"]
        ).pack(anchor="w", padx=25, pady=(0, 20))

        self.crear_seccion_header(frame, "POSTGRESQL",
            "Datos transaccionales", COLORS["postgres"])

        pg_grid = tk.Frame(frame, bg=COLORS["bg_card"])
        pg_grid.pack(fill="x", pady=(0, 15))

        datos_artista = [
            ("Género Musical", artista[2]),
            ("País de Origen", artista[3]),
            ("Caché", f"${artista[4]:,.2f} USD"),
            ("Rider Técnico", artista[5] or "No especificado"),
        ]

        for i, (label, valor) in enumerate(datos_artista):
            self.crear_campo(pg_grid, label, valor, i)

        self.crear_seccion_header(frame, "CONTRATO",
            "Acuerdo formal con el festival", COLORS["postgres"])

        contrato_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        contrato_frame.pack(fill="x", pady=(0, 15))

        if artista[6]:
            estado_color = (COLORS["success"]
                if artista[11] == "activo" else COLORS["danger"])

            datos_contrato = [
                ("ID Contrato", f"#{artista[6]}"),
                ("Fecha de Firma", str(artista[7])),
                ("Fecha Vencimiento", str(artista[8])),
                ("Monto Total", f"${artista[9]:,.2f} USD"),
                ("Condiciones", artista[10]),
                ("Estado", artista[11].upper()),
            ]

            for i, (label, valor) in enumerate(datos_contrato):
                color = (estado_color if label == "Estado" else None)
                self.crear_campo(contrato_frame, label, valor, i, color)
        else:
            tk.Label(contrato_frame,
                text="Sin contrato registrado",
                font=("Segoe UI", 10),
                fg=COLORS["text_muted"],
                bg=COLORS["bg_card"]
            ).pack(padx=25, pady=15)

        self.crear_seccion_header(frame, "MONGODB",
            "Setlist del festival", COLORS["mongo"])

        setlist_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        setlist_frame.pack(fill="x", pady=(0, 15))

        setlist = obtener_setlist(artista[0])

        if setlist is not None:
            info_frame = tk.Frame(setlist_frame, bg=COLORS["bg_card"])
            info_frame.pack(fill="x", padx=25, pady=(15, 10))

            tk.Label(info_frame,
                text=f"Escenario: {setlist.get('escenario', 'N/A')}",
                font=("Segoe UI", 11, "bold"),
                fg=COLORS["mongo"],
                bg=COLORS["bg_card"]
            ).pack(side="left")

            fecha = setlist.get("fecha_presentacion", "")
            if hasattr(fecha, "strftime"):
                fecha = fecha.strftime("%d %b %Y")

            tk.Label(info_frame,
                text=f"  ·  {fecha}  ·  {setlist.get('duracion_total_min', 0)} min total",
                font=("Segoe UI", 10),
                fg=COLORS["text_secondary"],
                bg=COLORS["bg_card"]
            ).pack(side="left")

            canciones = setlist.get("canciones", [])
            for cancion in canciones:
                c_frame = tk.Frame(setlist_frame, bg=COLORS["bg_card"])
                c_frame.pack(fill="x", padx=25, pady=2)

                tk.Label(c_frame,
                    text=f"{cancion.get('orden', '')}.",
                    font=("Segoe UI", 10),
                    fg=COLORS["text_muted"],
                    bg=COLORS["bg_card"],
                    width=3
                ).pack(side="left")

                tk.Label(c_frame,
                    text=cancion.get("nombre", ""),
                    font=("Segoe UI", 10),
                    fg=COLORS["text_primary"],
                    bg=COLORS["bg_card"]
                ).pack(side="left", padx=(5, 0))

                tk.Label(c_frame,
                    text=f"{cancion.get('duracion_min', '')} min",
                    font=("Segoe UI", 9),
                    fg=COLORS["text_muted"],
                    bg=COLORS["bg_card"]
                ).pack(side="right", padx=25)

            tk.Frame(setlist_frame, bg=COLORS["bg_card"], height=15).pack()
        else:
            tk.Label(setlist_frame,
                text="Sin setlist registrado en MongoDB",
                font=("Segoe UI", 10),
                fg=COLORS["text_muted"],
                bg=COLORS["bg_card"]
            ).pack(padx=25, pady=15)

    # TAB ESCENARIO

    def construir_tab_escenario(self):
        parent = self.frame_escenario

        left = tk.Frame(parent, bg=COLORS["bg_card"], width=280)
        left.pack(side="left", fill="y", padx=(0, 15), pady=10)
        left.pack_propagate(False)

        tk.Label(left,
            text="ESCENARIOS",
            font=("Segoe UI", 9, "bold"),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_card"]
        ).pack(anchor="w", padx=20, pady=(20, 5))

        tk.Label(left,
            text="Selecciona un escenario para ver\nincidentes y reseñas",
            font=("Segoe UI", 9),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_card"],
            justify="left"
        ).pack(anchor="w", padx=20, pady=(0, 15))

        self.escenario_btns = []
        self.escenarios_frame = tk.Frame(left, bg=COLORS["bg_card"])
        self.escenarios_frame.pack(fill="x", padx=15)

        right = tk.Frame(parent, bg=COLORS["bg_dark"])
        right.pack(side="left", fill="both", expand=True, pady=10)

        self.escenario_result = tk.Frame(right, bg=COLORS["bg_dark"])
        self.escenario_result.pack(fill="both", expand=True)

        self.mostrar_placeholder_escenario()

    def mostrar_placeholder_escenario(self):
        for w in self.escenario_result.winfo_children():
            w.destroy()

        tk.Label(self.escenario_result,
            text="◈",
            font=("Segoe UI", 48),
            fg=COLORS["border"],
            bg=COLORS["bg_dark"]
        ).pack(expand=True)

        tk.Label(self.escenario_result,
            text="Selecciona un escenario del panel izquierdo",
            font=("Segoe UI", 13),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        ).pack()

        tk.Label(self.escenario_result,
            text="Ver datos de PostgreSQL + MongoDB combinados",
            font=("Segoe UI", 10),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        ).pack(pady=5)

    def seleccionar_escenario(self, escenario):
        for btn in self.escenario_btns:
            btn.config(bg=COLORS["bg_panel"],
                      fg=COLORS["text_secondary"])
        self.mostrar_panel_escenario(escenario)

    def mostrar_panel_escenario(self, escenario):
        for w in self.escenario_result.winfo_children():
            w.destroy()

        canvas = tk.Canvas(
            self.escenario_result, bg=COLORS["bg_dark"],
            highlightthickness=0)
        scrollbar = tk.Scrollbar(
            self.escenario_result, orient="vertical",
            command=canvas.yview)
        canvas.configure(yscrollcommand=scrollbar.set)

        scrollbar.pack(side="right", fill="y")
        canvas.pack(side="left", fill="both", expand=True)

        frame = tk.Frame(canvas, bg=COLORS["bg_dark"])
        canvas_window = canvas.create_window(
            (0, 0), window=frame, anchor="nw")

        def on_frame_configure(e):
            canvas.configure(scrollregion=canvas.bbox("all"))

        def on_canvas_configure(e):
            canvas.itemconfig(canvas_window, width=e.width)

        frame.bind("<Configure>", on_frame_configure)
        canvas.bind("<Configure>", on_canvas_configure)
        canvas.bind_all("<MouseWheel>", lambda e: canvas.yview_scroll(
            int(-1*(e.delta/120)), "units"))

        tipo_color = {
            "principal": COLORS["accent"],
            "alterno":   COLORS["accent_2"],
            "acustico":  COLORS["accent_3"]
        }.get(escenario[3], COLORS["accent"])

        header = tk.Frame(frame, bg=tipo_color, height=5)
        header.pack(fill="x")

        title_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        title_frame.pack(fill="x", pady=(0, 15))

        tk.Label(title_frame,
            text=escenario[1],
            font=("Segoe UI", 22, "bold"),
            fg=COLORS["text_primary"],
            bg=COLORS["bg_card"]
        ).pack(anchor="w", padx=25, pady=(20, 2))

        tk.Label(title_frame,
            text=f"{escenario[3].upper()}  ·  {escenario[4]}",
            font=("Segoe UI", 11),
            fg=COLORS["text_secondary"],
            bg=COLORS["bg_card"]
        ).pack(anchor="w", padx=25, pady=(0, 20))

        self.crear_seccion_header(frame, "POSTGRESQL",
            "Datos del escenario", COLORS["postgres"])

        pg_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        pg_frame.pack(fill="x", pady=(0, 15))

        datos = [
            ("Capacidad", f"{escenario[2]:,} personas"),
            ("Tipo", escenario[3].capitalize()),
            ("Ubicación", escenario[4]),
            ("Tiene Cubierta", "Sí" if escenario[5] else "No"),
        ]

        for i, (label, valor) in enumerate(datos):
            self.crear_campo(pg_frame, label, valor, i)

        self.crear_seccion_header(frame, "PROGRAMACIÓN",
            "Presentaciones en este escenario", COLORS["postgres"])

        pres_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        pres_frame.pack(fill="x", pady=(0, 15))

        presentaciones = obtener_presentaciones_escenario(escenario[0])
        ids_presentacion = []

        if presentaciones:
            for i, p in enumerate(presentaciones):
                ids_presentacion.append(p[0])
                p_row = tk.Frame(pres_frame,
                    bg=COLORS["bg_panel"] if i % 2 == 0 else COLORS["bg_card"])
                p_row.pack(fill="x", padx=25, pady=1)

                tk.Label(p_row,
                    text=p[1],
                    font=("Segoe UI", 10, "bold"),
                    fg=COLORS["text_primary"],
                    bg=p_row["bg"]
                ).pack(side="left", padx=10, pady=6)

                tk.Label(p_row,
                    text=f"{p[2]}  {p[3]}–{p[4]}",
                    font=("Segoe UI", 9),
                    fg=COLORS["text_muted"],
                    bg=p_row["bg"]
                ).pack(side="right", padx=10)

            tk.Frame(pres_frame, bg=COLORS["bg_card"], height=10).pack()

        self.crear_seccion_header(frame, "MONGODB — INCIDENTES",
            "Reportes del escenario", COLORS["mongo"])

        inc_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        inc_frame.pack(fill="x", pady=(0, 15))

        incidentes = obtener_incidentes_escenario(escenario[0])

        if incidentes:
            gravedad_color = {
                "Critica": COLORS["critical"],
                "Alta":    COLORS["danger"],
                "Media":   COLORS["warning"],
                "Baja":    COLORS["success"],
            }

            for inc in incidentes:
                grav = inc.get("gravedad", "Baja")
                color = gravedad_color.get(grav, COLORS["text_muted"])

                inc_row = tk.Frame(inc_frame, bg=COLORS["bg_panel"])
                inc_row.pack(fill="x", padx=25, pady=3)

                tk.Label(inc_row,
                    text=f" {grav.upper()} ",
                    font=("Segoe UI", 8, "bold"),
                    fg=COLORS["bg_dark"],
                    bg=color
                ).pack(side="left", padx=(10, 8), pady=8)

                tk.Label(inc_row,
                    text=inc.get("tipo_incidente", ""),
                    font=("Segoe UI", 9, "bold"),
                    fg=COLORS["text_primary"],
                    bg=COLORS["bg_panel"]
                ).pack(side="left")

                detalle = inc.get("detalle", {})
                desc = detalle.get("descripcion", "")
                if len(desc) > 70:
                    desc = desc[:70] + "..."

                tk.Label(inc_row,
                    text=f"  {desc}",
                    font=("Segoe UI", 9),
                    fg=COLORS["text_muted"],
                    bg=COLORS["bg_panel"],
                    wraplength=500,
                    justify="left"
                ).pack(side="left", padx=5, pady=8)

                personas = inc.get("personas_afectadas", 0)
                if personas > 0:
                    tk.Label(inc_row,
                        text=f"{personas} afectados",
                        font=("Segoe UI", 8),
                        fg=COLORS["warning"],
                        bg=COLORS["bg_panel"]
                    ).pack(side="right", padx=10)

            tk.Frame(inc_frame, bg=COLORS["bg_card"], height=10).pack()
        else:
            tk.Label(inc_frame,
                text="Sin incidentes registrados",
                font=("Segoe UI", 10),
                fg=COLORS["text_muted"],
                bg=COLORS["bg_card"]
            ).pack(padx=25, pady=15)

        self.crear_seccion_header(frame, "MONGODB — RESEÑAS",
            "Calificaciones del público", COLORS["mongo"])

        res_frame = tk.Frame(frame, bg=COLORS["bg_card"])
        res_frame.pack(fill="x", pady=(0, 20))

        resenas, promedio = obtener_resenas_escenario(ids_presentacion)

        if resenas:
            prom_frame = tk.Frame(res_frame, bg=COLORS["bg_panel"])
            prom_frame.pack(fill="x", padx=25, pady=(15, 10))

            tk.Label(prom_frame,
                text=f"  {promedio}",
                font=("Segoe UI", 28, "bold"),
                fg=COLORS["accent_3"],
                bg=COLORS["bg_panel"]
            ).pack(side="left", pady=10)

            tk.Label(prom_frame,
                text="/ 5.0",
                font=("Segoe UI", 14),
                fg=COLORS["text_muted"],
                bg=COLORS["bg_panel"]
            ).pack(side="left", pady=15)

            tk.Label(prom_frame,
                text=f"  {len(resenas)} reseñas",
                font=("Segoe UI", 11),
                fg=COLORS["text_secondary"],
                bg=COLORS["bg_panel"]
            ).pack(side="left", padx=15, pady=15)

            for r in resenas[:5]:
                r_frame = tk.Frame(res_frame, bg=COLORS["bg_card"])
                r_frame.pack(fill="x", padx=25, pady=3)

                estrellas = "★" * r["calificacion"] + "☆" * (5 - r["calificacion"])
                tk.Label(r_frame,
                    text=estrellas,
                    font=("Segoe UI", 11),
                    fg=COLORS["warning"],
                    bg=COLORS["bg_card"]
                ).pack(anchor="w", padx=10, pady=(8, 2))

                comentario = r.get("comentario", "")
                if len(comentario) > 120:
                    comentario = comentario[:120] + "..."

                tk.Label(r_frame,
                    text=comentario,
                    font=("Segoe UI", 9),
                    fg=COLORS["text_secondary"],
                    bg=COLORS["bg_card"],
                    wraplength=600,
                    justify="left"
                ).pack(anchor="w", padx=10, pady=(0, 8))

            tk.Frame(res_frame, bg=COLORS["bg_card"], height=10).pack()
        else:
            tk.Label(res_frame,
                text="Sin reseñas registradas",
                font=("Segoe UI", 10),
                fg=COLORS["text_muted"],
                bg=COLORS["bg_card"]
            ).pack(padx=25, pady=15)

    # HELPERS UI

    def crear_seccion_header(self, parent, titulo, subtitulo, color):
        sec = tk.Frame(parent, bg=COLORS["bg_dark"])
        sec.pack(fill="x", pady=(10, 2))

        line = tk.Frame(sec, bg=color, width=3)
        line.pack(side="left", fill="y", padx=(0, 10))

        text_frame = tk.Frame(sec, bg=COLORS["bg_dark"])
        text_frame.pack(side="left", fill="y")

        tk.Label(text_frame,
            text=titulo,
            font=("Segoe UI", 9, "bold"),
            fg=color,
            bg=COLORS["bg_dark"]
        ).pack(anchor="w")

        tk.Label(text_frame,
            text=subtitulo,
            font=("Segoe UI", 8),
            fg=COLORS["text_muted"],
            bg=COLORS["bg_dark"]
        ).pack(anchor="w")

    def crear_campo(self, parent, label, valor, idx, color=None):
        row = tk.Frame(parent,
            bg=COLORS["bg_panel"] if idx % 2 == 0 else COLORS["bg_card"])
        row.pack(fill="x")

        tk.Label(row,
            text=label,
            font=("Segoe UI", 9),
            fg=COLORS["text_muted"],
            bg=row["bg"],
            width=18,
            anchor="w"
        ).pack(side="left", padx=(25, 10), pady=8)

        tk.Label(row,
            text=str(valor),
            font=("Segoe UI", 9, "bold"),
            fg=color if color else COLORS["text_primary"],
            bg=row["bg"],
            anchor="w",
            wraplength=400,
            justify="left"
        ).pack(side="left", pady=8)

    # DATOS Y CONEXIONES 

    def verificar_conexiones(self):
        pg = conectar_postgres()
        if pg is not None:
            self.pg_status.config(
                text=" PostgreSQL  •  Conectado — Neon",
                fg=COLORS["success"])
            pg.close()
        else:
            self.pg_status.config(
                text=" PostgreSQL  •  Error de conexión",
                fg=COLORS["danger"])

        mg = conectar_mongo()
        if mg is not None:
            self.mg_status.config(
                text=" MongoDB  •  Conectado — Atlas",
                fg=COLORS["success"])
        else:
            self.mg_status.config(
                text=" MongoDB  •  Error de conexión",
                fg=COLORS["danger"])

    def cargar_datos_iniciales(self):
        self.artistas_data = obtener_artistas()
        self.artistas_filtrados = self.artistas_data

        self.lista_artistas.delete(0, tk.END)
        for a in self.artistas_data:
            self.lista_artistas.insert(tk.END, f"  {a[1]}")

        self.escenarios_data = obtener_escenarios()

        for w in self.escenarios_frame.winfo_children():
            w.destroy()

        self.escenario_btns = []
        tipo_icons = {
            "principal": "★",
            "alterno":   "◆",
            "acustico":  "♪"
        }

        for esc in self.escenarios_data:
            icon = tipo_icons.get(esc[3], "◈")
            btn = tk.Button(self.escenarios_frame,
                text=f"  {icon}  {esc[1]}\n      {esc[2]:,} personas",
                font=("Segoe UI", 10),
                fg=COLORS["text_secondary"],
                bg=COLORS["bg_panel"],
                activebackground=COLORS["accent"],
                activeforeground=COLORS["text_primary"],
                relief="flat",
                bd=0,
                pady=12,
                cursor="hand2",
                anchor="w",
                justify="left",
                command=lambda e=esc: self.seleccionar_escenario(e)
            )
            btn.pack(fill="x", pady=3)
            self.escenario_btns.append(btn)

    def filtrar_artistas(self, *args):
        query = self.search_var.get().lower()
        self.artistas_filtrados = [
            a for a in self.artistas_data
            if query in a[1].lower()
        ]
        self.lista_artistas.delete(0, tk.END)
        for a in self.artistas_filtrados:
            self.lista_artistas.insert(tk.END, f"  {a[1]}")

    def actualizar_tiempo(self):
        now = datetime.now().strftime("%d %b %Y  %H:%M:%S")
        self.time_label.config(text=now)
        self.root.after(1000, self.actualizar_tiempo)

# MAIN

if __name__ == "__main__":
    root = tk.Tk()
    app = SoundwaveApp(root)
    root.mainloop()
