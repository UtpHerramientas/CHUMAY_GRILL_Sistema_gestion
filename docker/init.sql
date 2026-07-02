--
-- PostgreSQL database dump
--

\restrict eatnkAQSOZHYNyOYmyrRrvhoNMhMe4kTNVn0v4uatQ2bmHYOIktzu2N3yMc3O5U

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.2

-- Started on 2026-06-03 23:27:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
-- SET transaction_timeout = 0; (No soportado en PG 16)
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 25091)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255) DEFAULT NULL::character varying,
    icono character varying(100) DEFAULT NULL::character varying,
    orden integer DEFAULT 0,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25090)
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO postgres;

--
-- TOC entry 5228 (class 0 OID 0)
-- Dependencies: 219
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- TOC entry 222 (class 1259 OID 25105)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id bigint NOT NULL,
    nombre character varying(150) NOT NULL,
    telefono character varying(20) DEFAULT NULL::character varying,
    email character varying(100) DEFAULT NULL::character varying,
    direccion text,
    referencia character varying(255) DEFAULT NULL::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25104)
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_id_seq OWNER TO postgres;

--
-- TOC entry 5229 (class 0 OID 0)
-- Dependencies: 221
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- TOC entry 241 (class 1259 OID 25325)
-- Name: detalle_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_pedido (
    id bigint NOT NULL,
    id_pedido bigint NOT NULL,
    id_producto integer NOT NULL,
    nombre_producto character varying(150) NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    cantidad integer DEFAULT 1 NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    observacion character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public.detalle_pedido OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 25324)
-- Name: detalle_pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_pedido_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_pedido_id_seq OWNER TO postgres;

--
-- TOC entry 5230 (class 0 OID 0)
-- Dependencies: 240
-- Name: detalle_pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_pedido_id_seq OWNED BY public.detalle_pedido.id;


--
-- TOC entry 226 (class 1259 OID 25138)
-- Name: ingredientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredientes (
    id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion character varying(255) DEFAULT NULL::character varying,
    unidad character varying(30) NOT NULL,
    stock_actual numeric(10,3) DEFAULT 0.000 NOT NULL,
    stock_minimo numeric(10,3) DEFAULT 0.000 NOT NULL,
    costo_unitario numeric(10,2) DEFAULT 0.00,
    id_proveedor integer,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.ingredientes OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 25137)
-- Name: ingredientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingredientes_id_seq OWNER TO postgres;

--
-- TOC entry 5231 (class 0 OID 0)
-- Dependencies: 225
-- Name: ingredientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredientes_id_seq OWNED BY public.ingredientes.id;


--
-- TOC entry 228 (class 1259 OID 25161)
-- Name: mesas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mesas (
    id integer NOT NULL,
    numero integer NOT NULL,
    capacidad integer DEFAULT 4 NOT NULL,
    ubicacion character varying(100) DEFAULT NULL::character varying,
    estado character varying(50) DEFAULT 'LIBRE'::character varying,
    CONSTRAINT mesas_estado_check CHECK (((estado)::text = ANY ((ARRAY['LIBRE'::character varying, 'OCUPADA'::character varying, 'RESERVADA'::character varying])::text[])))
);


ALTER TABLE public.mesas OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 25160)
-- Name: mesas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mesas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesas_id_seq OWNER TO postgres;

--
-- TOC entry 5232 (class 0 OID 0)
-- Dependencies: 227
-- Name: mesas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mesas_id_seq OWNED BY public.mesas.id;


--
-- TOC entry 230 (class 1259 OID 25177)
-- Name: opciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opciones (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    ruta character varying(100) NOT NULL,
    icono character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.opciones OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 25176)
-- Name: opciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opciones_id_seq OWNER TO postgres;

--
-- TOC entry 5233 (class 0 OID 0)
-- Dependencies: 229
-- Name: opciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opciones_id_seq OWNED BY public.opciones.id;


--
-- TOC entry 243 (class 1259 OID 25351)
-- Name: pedido_estados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido_estados (
    id bigint NOT NULL,
    id_pedido bigint NOT NULL,
    estado character varying(50) NOT NULL,
    id_usuario bigint,
    observacion character varying(255) DEFAULT NULL::character varying,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.pedido_estados OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 25350)
-- Name: pedido_estados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_estados_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedido_estados_id_seq OWNER TO postgres;

--
-- TOC entry 5234 (class 0 OID 0)
-- Dependencies: 242
-- Name: pedido_estados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_estados_id_seq OWNED BY public.pedido_estados.id;


--
-- TOC entry 239 (class 1259 OID 25271)
-- Name: pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos (
    id bigint NOT NULL,
    numero_pedido character varying(20) NOT NULL,
    tipo character varying(50) NOT NULL,
    estado character varying(50) DEFAULT 'PENDIENTE'::character varying NOT NULL,
    id_cliente bigint,
    id_mesa integer,
    id_mesero bigint,
    id_cocinero bigint,
    nombre_cliente character varying(150) DEFAULT NULL::character varying,
    telefono_cliente character varying(20) DEFAULT NULL::character varying,
    direccion_entrega text,
    referencia character varying(255) DEFAULT NULL::character varying,
    observaciones text,
    subtotal numeric(10,2) DEFAULT 0.00 NOT NULL,
    costo_envio numeric(10,2) DEFAULT 0.00 NOT NULL,
    total numeric(10,2) DEFAULT 0.00 NOT NULL,
    metodo_pago character varying(50) DEFAULT 'EFECTIVO'::character varying,
    pagado boolean DEFAULT false NOT NULL,
    whatsapp_enviado boolean DEFAULT false NOT NULL,
    fecha_pedido timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega timestamp without time zone,
    CONSTRAINT pedidos_estado_check CHECK (((estado)::text = ANY ((ARRAY['PENDIENTE'::character varying, 'TOMADO'::character varying, 'PREPARANDO'::character varying, 'LISTO'::character varying, 'DESPACHADO'::character varying, 'ENTREGADO'::character varying, 'CANCELADO'::character varying])::text[]))),
    CONSTRAINT pedidos_metodo_pago_check CHECK (((metodo_pago)::text = ANY ((ARRAY['EFECTIVO'::character varying, 'YAPE'::character varying, 'PLIN'::character varying, 'TRANSFERENCIA'::character varying, 'TARJETA'::character varying])::text[]))),
    CONSTRAINT pedidos_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['DELIVERY'::character varying, 'RECOJO'::character varying, 'MESA'::character varying])::text[])))
);


ALTER TABLE public.pedidos OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 25270)
-- Name: pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedidos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_id_seq OWNER TO postgres;

--
-- TOC entry 5235 (class 0 OID 0)
-- Dependencies: 238
-- Name: pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


--
-- TOC entry 233 (class 1259 OID 25200)
-- Name: perfil_opcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil_opcion (
    id_perfil bigint NOT NULL,
    id_opcion bigint NOT NULL
);


ALTER TABLE public.perfil_opcion OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 25188)
-- Name: perfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfiles (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(255) DEFAULT NULL::character varying,
    estado boolean DEFAULT true
);


ALTER TABLE public.perfiles OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 25187)
-- Name: perfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfiles_id_seq OWNER TO postgres;

--
-- TOC entry 5236 (class 0 OID 0)
-- Dependencies: 231
-- Name: perfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfiles_id_seq OWNED BY public.perfiles.id;


--
-- TOC entry 237 (class 1259 OID 25243)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    foto character varying(255) DEFAULT NULL::character varying,
    id_categoria integer NOT NULL,
    disponible boolean DEFAULT true NOT NULL,
    destacado boolean DEFAULT false NOT NULL,
    tipo character varying(50) DEFAULT 'PLATO'::character varying,
    estado boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT productos_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['PLATO'::character varying, 'BEBIDA'::character varying, 'POSTRE'::character varying, 'ENTRADA'::character varying, 'OTRO'::character varying])::text[])))
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 25242)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 5237 (class 0 OID 0)
-- Dependencies: 236
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 224 (class 1259 OID 25120)
-- Name: proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedores (
    id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    contacto character varying(100) DEFAULT NULL::character varying,
    telefono character varying(20) DEFAULT NULL::character varying,
    email character varying(100) DEFAULT NULL::character varying,
    direccion text,
    ruc character varying(20) DEFAULT NULL::character varying,
    estado boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.proveedores OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25119)
-- Name: proveedores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedores_id_seq OWNER TO postgres;

--
-- TOC entry 5238 (class 0 OID 0)
-- Dependencies: 223
-- Name: proveedores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedores_id_seq OWNED BY public.proveedores.id;


--
-- TOC entry 235 (class 1259 OID 25218)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    id_perfil bigint,
    correo character varying(100) DEFAULT NULL::character varying,
    telefono character varying(20) DEFAULT NULL::character varying,
    estado boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 25217)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5239 (class 0 OID 0)
-- Dependencies: 234
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 245 (class 1259 OID 25373)
-- Name: ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas (
    id bigint NOT NULL,
    id_pedido bigint NOT NULL,
    id_cajero bigint NOT NULL,
    total numeric(10,2) NOT NULL,
    metodo_pago character varying(50) NOT NULL,
    monto_recibido numeric(10,2) DEFAULT NULL::numeric,
    vuelto numeric(10,2) DEFAULT 0.00,
    comprobante character varying(50) DEFAULT 'NINGUNO'::character varying,
    serie character varying(10) DEFAULT NULL::character varying,
    correlativo character varying(10) DEFAULT NULL::character varying,
    fecha_venta timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ventas_comprobante_check CHECK (((comprobante)::text = ANY ((ARRAY['BOLETA'::character varying, 'FACTURA'::character varying, 'NINGUNO'::character varying])::text[]))),
    CONSTRAINT ventas_metodo_pago_check CHECK (((metodo_pago)::text = ANY ((ARRAY['EFECTIVO'::character varying, 'YAPE'::character varying, 'PLIN'::character varying, 'TRANSFERENCIA'::character varying, 'TARJETA'::character varying])::text[])))
);


ALTER TABLE public.ventas OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 25372)
-- Name: ventas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_id_seq OWNER TO postgres;

--
-- TOC entry 5240 (class 0 OID 0)
-- Dependencies: 244
-- Name: ventas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_id_seq OWNED BY public.ventas.id;


--
-- TOC entry 4920 (class 2604 OID 25094)
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- TOC entry 4925 (class 2604 OID 25108)
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- TOC entry 4976 (class 2604 OID 25328)
-- Name: detalle_pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido ALTER COLUMN id SET DEFAULT nextval('public.detalle_pedido_id_seq'::regclass);


--
-- TOC entry 4937 (class 2604 OID 25141)
-- Name: ingredientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes ALTER COLUMN id SET DEFAULT nextval('public.ingredientes_id_seq'::regclass);


--
-- TOC entry 4943 (class 2604 OID 25164)
-- Name: mesas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas ALTER COLUMN id SET DEFAULT nextval('public.mesas_id_seq'::regclass);


--
-- TOC entry 4947 (class 2604 OID 25180)
-- Name: opciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opciones ALTER COLUMN id SET DEFAULT nextval('public.opciones_id_seq'::regclass);


--
-- TOC entry 4979 (class 2604 OID 25354)
-- Name: pedido_estados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_estados ALTER COLUMN id SET DEFAULT nextval('public.pedido_estados_id_seq'::regclass);


--
-- TOC entry 4964 (class 2604 OID 25274)
-- Name: pedidos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


--
-- TOC entry 4949 (class 2604 OID 25191)
-- Name: perfiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles ALTER COLUMN id SET DEFAULT nextval('public.perfiles_id_seq'::regclass);


--
-- TOC entry 4957 (class 2604 OID 25246)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 4930 (class 2604 OID 25123)
-- Name: proveedores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores ALTER COLUMN id SET DEFAULT nextval('public.proveedores_id_seq'::regclass);


--
-- TOC entry 4952 (class 2604 OID 25221)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4982 (class 2604 OID 25376)
-- Name: ventas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas ALTER COLUMN id SET DEFAULT nextval('public.ventas_id_seq'::regclass);


--
-- TOC entry 5197 (class 0 OID 25091)
-- Dependencies: 220
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id, nombre, descripcion, icono, orden, estado) FROM stdin;
1	Entradas	Wantanes, sopas y aperitivos deliciosos	fas fa-soup	1	t
2	Chifa y Saltados	Arroz chaufa, tallarines y saltados al wok	fas fa-fire	2	t
3	Parrillas y Carnes	Cortes seleccionados a la parrilla con sazón especial	fas fa-drumstick-bite	3	t
4	Bebidas	Jugos frescos, gaseosas y tradicionales	fas fa-glass-cheers	4	t
5	Postres	Dulces y delicias para cerrar con broche de oro	fas fa-ice-cream	5	t
\.


--
-- TOC entry 5199 (class 0 OID 25105)
-- Dependencies: 222
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id, nombre, telefono, email, direccion, referencia, created_at) FROM stdin;
\.


--
-- TOC entry 5218 (class 0 OID 25325)
-- Dependencies: 241
-- Data for Name: detalle_pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_pedido (id, id_pedido, id_producto, nombre_producto, precio_unitario, cantidad, subtotal, observacion) FROM stdin;
\.


--
-- TOC entry 5203 (class 0 OID 25138)
-- Dependencies: 226
-- Data for Name: ingredientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredientes (id, nombre, descripcion, unidad, stock_actual, stock_minimo, costo_unitario, id_proveedor, estado) FROM stdin;
\.


--
-- TOC entry 5205 (class 0 OID 25161)
-- Dependencies: 228
-- Data for Name: mesas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mesas (id, numero, capacidad, ubicacion, estado) FROM stdin;
1	1	2	Terraza Principal	LIBRE
2	2	4	Terraza Principal	LIBRE
3	3	4	Salón Familiar	LIBRE
4	4	4	Salón Familiar	LIBRE
5	5	6	Salón Familiar	LIBRE
6	6	8	Zona VIP	LIBRE
\.


--
-- TOC entry 5207 (class 0 OID 25177)
-- Dependencies: 230
-- Data for Name: opciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opciones (id, nombre, ruta, icono) FROM stdin;
1	Panel de Control	/admin/dashboard	chart-line
2	Menú Digital	/admin/productos	utensils
3	Categorías de Platos	/admin/categorias	tags
4	Usuarios y Perfiles	/admin/usuarios	users-cog
5	Pedidos	/admin/pedidos	shopping-cart
6	Ventas y Caja	/admin/ventas	cash-register
\.


--
-- TOC entry 5220 (class 0 OID 25351)
-- Dependencies: 243
-- Data for Name: pedido_estados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido_estados (id, id_pedido, estado, id_usuario, observacion, fecha) FROM stdin;
\.


--
-- TOC entry 5216 (class 0 OID 25271)
-- Dependencies: 239
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedidos (id, numero_pedido, tipo, estado, id_cliente, id_mesa, id_mesero, id_cocinero, nombre_cliente, telefono_cliente, direccion_entrega, referencia, observaciones, subtotal, costo_envio, total, metodo_pago, pagado, whatsapp_enviado, fecha_pedido, fecha_entrega) FROM stdin;
\.


--
-- TOC entry 5210 (class 0 OID 25200)
-- Dependencies: 233
-- Data for Name: perfil_opcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfil_opcion (id_perfil, id_opcion) FROM stdin;
1	1
1	2
1	3
1	4
2	1
2	2
1	5
1	6
2	5
\.


--
-- TOC entry 5209 (class 0 OID 25188)
-- Dependencies: 232
-- Data for Name: perfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfiles (id, nombre, descripcion, estado) FROM stdin;
1	ADMINISTRADOR	Acceso total al sistema de gestión	t
2	MESERO	Gestión de pedidos de mesas y delivery	t
\.


--
-- TOC entry 5214 (class 0 OID 25243)
-- Dependencies: 237
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, descripcion, precio, foto, id_categoria, disponible, destacado, tipo, estado, created_at) FROM stdin;
1	Sopa Wantán Especial	Clásica sopa chifa con wantanes de pollo, chancho asado, col china y fideos.	18.00	\N	1	t	t	ENTRADA	t	2026-06-03 15:46:51.869696
2	Arroz Chaufa Especial	Gran combinación al wok con trozos de res, pollo, chancho asado, cebollita china y tortilla de huevo.	28.00	\N	2	t	t	PLATO	t	2026-06-03 15:46:51.869696
3	Parrilla Chumay (1/2 Pollo)	Pollo tiernamente marinado y dorado a la parrilla, servido con papas fritas crujientes y ensalada fresca.	32.00	\N	3	t	t	PLATO	t	2026-06-03 15:46:51.869696
4	Chicha Morada Especial (1L)	Tradicional refresco peruano preparado en casa con maíz morado, piña, manzana y canela.	12.00	\N	4	t	f	BEBIDA	t	2026-06-03 15:46:51.869696
5	Lomo Saltado al Wok	Jugosos trozos de lomo de res saltados a fuego vivo con cebolla, tomate, ají amarillo, servido con papas fritas y arroz blanco.	38.00	\N	2	t	t	PLATO	t	2026-06-03 15:46:51.869696
6	Min Pao Dulce	Suave bollo al vapor relleno de una deliciosa crema dulce tradicional oriental.	8.00	\N	5	t	f	POSTRE	t	2026-06-03 15:46:51.869696
\.


--
-- TOC entry 5201 (class 0 OID 25120)
-- Dependencies: 224
-- Data for Name: proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedores (id, nombre, contacto, telefono, email, direccion, ruc, estado, created_at) FROM stdin;
\.


--
-- TOC entry 5212 (class 0 OID 25218)
-- Dependencies: 235
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, username, password, id_perfil, correo, telefono, estado, created_at) FROM stdin;
3	Chumay Admin	admin	$2a$10$9Qnmb4ArqAx1nxf7K/vk1uaumfQe4dJZP7jXGCTD3Io/TQj2JVHeq	1	contacto@chumay.pe	974859600	t	2026-06-03 15:46:51.869696
\.


--
-- TOC entry 5222 (class 0 OID 25373)
-- Dependencies: 245
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas (id, id_pedido, id_cajero, total, metodo_pago, monto_recibido, vuelto, comprobante, serie, correlativo, fecha_venta) FROM stdin;
\.


--
-- TOC entry 5241 (class 0 OID 0)
-- Dependencies: 219
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_seq', 5, true);


--
-- TOC entry 5242 (class 0 OID 0)
-- Dependencies: 221
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 1, false);


--
-- TOC entry 5243 (class 0 OID 0)
-- Dependencies: 240
-- Name: detalle_pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_pedido_id_seq', 1, false);


--
-- TOC entry 5244 (class 0 OID 0)
-- Dependencies: 225
-- Name: ingredientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredientes_id_seq', 1, false);


--
-- TOC entry 5245 (class 0 OID 0)
-- Dependencies: 227
-- Name: mesas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mesas_id_seq', 6, true);


--
-- TOC entry 5246 (class 0 OID 0)
-- Dependencies: 229
-- Name: opciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opciones_id_seq', 4, true);


--
-- TOC entry 5247 (class 0 OID 0)
-- Dependencies: 242
-- Name: pedido_estados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_estados_id_seq', 1, false);


--
-- TOC entry 5248 (class 0 OID 0)
-- Dependencies: 238
-- Name: pedidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedidos_id_seq', 1, false);


--
-- TOC entry 5249 (class 0 OID 0)
-- Dependencies: 231
-- Name: perfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfiles_id_seq', 2, true);


--
-- TOC entry 5250 (class 0 OID 0)
-- Dependencies: 236
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 6, true);


--
-- TOC entry 5251 (class 0 OID 0)
-- Dependencies: 223
-- Name: proveedores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedores_id_seq', 1, false);


--
-- TOC entry 5252 (class 0 OID 0)
-- Dependencies: 234
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- TOC entry 5253 (class 0 OID 0)
-- Dependencies: 244
-- Name: ventas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_id_seq', 1, false);


--
-- TOC entry 4997 (class 2606 OID 25103)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- TOC entry 4999 (class 2606 OID 25118)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- TOC entry 5027 (class 2606 OID 25339)
-- Name: detalle_pedido detalle_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_pkey PRIMARY KEY (id);


--
-- TOC entry 5003 (class 2606 OID 25154)
-- Name: ingredientes ingredientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_pkey PRIMARY KEY (id);


--
-- TOC entry 5005 (class 2606 OID 25175)
-- Name: mesas mesas_numero_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_numero_key UNIQUE (numero);


--
-- TOC entry 5007 (class 2606 OID 25173)
-- Name: mesas mesas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_pkey PRIMARY KEY (id);


--
-- TOC entry 5009 (class 2606 OID 25186)
-- Name: opciones opciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opciones
    ADD CONSTRAINT opciones_pkey PRIMARY KEY (id);


--
-- TOC entry 5029 (class 2606 OID 25361)
-- Name: pedido_estados pedido_estados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_estados
    ADD CONSTRAINT pedido_estados_pkey PRIMARY KEY (id);


--
-- TOC entry 5023 (class 2606 OID 25303)
-- Name: pedidos pedidos_numero_pedido_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_numero_pedido_key UNIQUE (numero_pedido);


--
-- TOC entry 5025 (class 2606 OID 25301)
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


--
-- TOC entry 5015 (class 2606 OID 25206)
-- Name: perfil_opcion perfil_opcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_opcion
    ADD CONSTRAINT perfil_opcion_pkey PRIMARY KEY (id_perfil, id_opcion);


--
-- TOC entry 5011 (class 2606 OID 25199)
-- Name: perfiles perfiles_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles
    ADD CONSTRAINT perfiles_nombre_key UNIQUE (nombre);


--
-- TOC entry 5013 (class 2606 OID 25197)
-- Name: perfiles perfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles
    ADD CONSTRAINT perfiles_pkey PRIMARY KEY (id);


--
-- TOC entry 5021 (class 2606 OID 25264)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 5001 (class 2606 OID 25136)
-- Name: proveedores proveedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (id);


--
-- TOC entry 5017 (class 2606 OID 25234)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 5019 (class 2606 OID 25236)
-- Name: usuarios usuarios_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);


--
-- TOC entry 5031 (class 2606 OID 25393)
-- Name: ventas ventas_id_pedido_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_id_pedido_key UNIQUE (id_pedido);


--
-- TOC entry 5033 (class 2606 OID 25391)
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (id);


--
-- TOC entry 5043 (class 2606 OID 25340)
-- Name: detalle_pedido fk_detalle_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id);


--
-- TOC entry 5044 (class 2606 OID 25345)
-- Name: detalle_pedido fk_detalle_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES public.productos(id);


--
-- TOC entry 5045 (class 2606 OID 25362)
-- Name: pedido_estados fk_estado_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_estados
    ADD CONSTRAINT fk_estado_pedido FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id);


--
-- TOC entry 5046 (class 2606 OID 25367)
-- Name: pedido_estados fk_estado_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_estados
    ADD CONSTRAINT fk_estado_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 5034 (class 2606 OID 25155)
-- Name: ingredientes fk_ingrediente_proveedor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT fk_ingrediente_proveedor FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id);


--
-- TOC entry 5039 (class 2606 OID 25304)
-- Name: pedidos fk_pedido_cliente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES public.clientes(id);


--
-- TOC entry 5040 (class 2606 OID 25319)
-- Name: pedidos fk_pedido_cocinero; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedido_cocinero FOREIGN KEY (id_cocinero) REFERENCES public.usuarios(id);


--
-- TOC entry 5041 (class 2606 OID 25309)
-- Name: pedidos fk_pedido_mesa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedido_mesa FOREIGN KEY (id_mesa) REFERENCES public.mesas(id);


--
-- TOC entry 5042 (class 2606 OID 25314)
-- Name: pedidos fk_pedido_mesero; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedido_mesero FOREIGN KEY (id_mesero) REFERENCES public.usuarios(id);


--
-- TOC entry 5038 (class 2606 OID 25265)
-- Name: productos fk_producto_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES public.categorias(id);


--
-- TOC entry 5037 (class 2606 OID 25237)
-- Name: usuarios fk_usuario_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuario_perfil FOREIGN KEY (id_perfil) REFERENCES public.perfiles(id);


--
-- TOC entry 5047 (class 2606 OID 25394)
-- Name: ventas fk_venta_cajero; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT fk_venta_cajero FOREIGN KEY (id_cajero) REFERENCES public.usuarios(id);


--
-- TOC entry 5048 (class 2606 OID 25399)
-- Name: ventas fk_venta_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT fk_venta_pedido FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id);


--
-- TOC entry 5035 (class 2606 OID 25207)
-- Name: perfil_opcion perfil_opcion_ibfk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_opcion
    ADD CONSTRAINT perfil_opcion_ibfk_1 FOREIGN KEY (id_perfil) REFERENCES public.perfiles(id) ON DELETE CASCADE;


--
-- TOC entry 5036 (class 2606 OID 25212)
-- Name: perfil_opcion perfil_opcion_ibfk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_opcion
    ADD CONSTRAINT perfil_opcion_ibfk_2 FOREIGN KEY (id_opcion) REFERENCES public.opciones(id) ON DELETE CASCADE;


-- Completed on 2026-06-03 23:27:05

--
-- PostgreSQL database dump complete
--

\unrestrict eatnkAQSOZHYNyOYmyrRrvhoNMhMe4kTNVn0v4uatQ2bmHYOIktzu2N3yMc3O5U

