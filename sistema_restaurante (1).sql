-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2026 a las 21:25:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `icono` varchar(100) DEFAULT NULL,
  `orden` int(11) DEFAULT 0,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `icono`, `orden`, `estado`) VALUES
(1, 'Entradas', 'Sopas, ensaladas y aperitivos', 'fas fa-soup', 1, 1),
(2, 'Platos fuertes', 'Platos principales de la carta', 'fas fa-utensils', 2, 1),
(3, 'Bebidas', 'Jugos, gaseosas y bebidas calientes', 'fas fa-glass-cheers', 3, 1),
(4, 'Postres', 'Tortas, helados y dulces', 'fas fa-birthday-cake', 4, 1),
(5, 'Menú del día', 'Menú económico del día', 'fas fa-calendar-day', 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `referencia` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id` bigint(20) NOT NULL,
  `id_pedido` bigint(20) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(150) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `subtotal` decimal(10,2) NOT NULL,
  `observacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `unidad` varchar(30) NOT NULL,
  `stock_actual` decimal(10,3) NOT NULL DEFAULT 0.000,
  `stock_minimo` decimal(10,3) NOT NULL DEFAULT 0.000,
  `costo_unitario` decimal(10,2) DEFAULT 0.00,
  `id_proveedor` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `capacidad` int(11) NOT NULL DEFAULT 4,
  `ubicacion` varchar(100) DEFAULT NULL,
  `estado` enum('LIBRE','OCUPADA','RESERVADA') DEFAULT 'LIBRE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`id`, `numero`, `capacidad`, `ubicacion`, `estado`) VALUES
(1, 1, 2, 'Terraza', 'LIBRE'),
(2, 2, 4, 'Terraza', 'LIBRE'),
(3, 3, 4, 'Salón principal', 'LIBRE'),
(4, 4, 4, 'Salón principal', 'LIBRE'),
(5, 5, 6, 'Salón principal', 'LIBRE'),
(6, 6, 8, 'Salón VIP', 'LIBRE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE `opciones` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ruta` varchar(100) NOT NULL,
  `icono` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `opciones`
--

INSERT INTO `opciones` (`id`, `nombre`, `ruta`, `icono`) VALUES
(1, 'Panel de Control', '/admin/dashboard', 'chart-line'),
(2, 'Menú Digital', '/admin/productos', 'utensils'),
(3, 'Categorías de Platos', '/admin/categorias', 'tags'),
(4, 'Usuarios y Perfiles', '/admin/usuarios', 'users-cog');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` bigint(20) NOT NULL,
  `numero_pedido` varchar(20) NOT NULL,
  `tipo` enum('DELIVERY','RECOJO','MESA') NOT NULL,
  `estado` enum('PENDIENTE','TOMADO','PREPARANDO','LISTO','DESPACHADO','ENTREGADO','CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
  `id_cliente` bigint(20) DEFAULT NULL,
  `id_mesa` int(11) DEFAULT NULL,
  `id_mesero` bigint(20) DEFAULT NULL,
  `id_cocinero` bigint(20) DEFAULT NULL,
  `nombre_cliente` varchar(150) DEFAULT NULL,
  `telefono_cliente` varchar(20) DEFAULT NULL,
  `direccion_entrega` text DEFAULT NULL,
  `referencia` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `costo_envio` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `metodo_pago` enum('EFECTIVO','YAPE','PLIN','TRANSFERENCIA','TARJETA') DEFAULT 'EFECTIVO',
  `pagado` tinyint(1) NOT NULL DEFAULT 0,
  `whatsapp_enviado` tinyint(1) NOT NULL DEFAULT 0,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `fecha_entrega` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_estados`
--

CREATE TABLE `pedido_estados` (
  `id` bigint(20) NOT NULL,
  `id_pedido` bigint(20) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`id`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'ADMINISTRADOR', 'Acceso total al sistema', 1),
(2, 'MESERO', 'Gestión de pedidos y mesas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_opcion`
--

CREATE TABLE `perfil_opcion` (
  `id_perfil` bigint(20) NOT NULL,
  `id_opcion` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_opcion`
--

INSERT INTO `perfil_opcion` (`id_perfil`, `id_opcion`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `destacado` tinyint(1) NOT NULL DEFAULT 0,
  `tipo` enum('PLATO','BEBIDA','POSTRE','ENTRADA','OTRO') DEFAULT 'PLATO',
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `foto`, `id_categoria`, `disponible`, `destacado`, `tipo`, `estado`, `created_at`) VALUES
(1, 'Ceviche de Pescado', 'Clásico ceviche norteño con zarandaja y camote.', 35.00, NULL, 1, 1, 0, 'ENTRADA', 1, '2026-04-27 16:38:13'),
(2, 'Arroz con Pato', 'Pato tierno con arroz a la chiclayana.', 45.00, NULL, 2, 1, 0, 'PLATO', 1, '2026-04-27 16:38:13'),
(3, 'Chicha Morada', 'Bebida tradicional de maíz morado (1L).', 12.00, NULL, 3, 1, 0, 'BEBIDA', 1, '2026-04-27 16:38:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `ruc` varchar(20) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_perfil` bigint(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `username`, `password`, `id_perfil`, `correo`, `telefono`, `estado`, `created_at`) VALUES
(3, 'Lumon Admin', 'admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpsl7iKt.v3aq', 1, NULL, NULL, 1, '2026-04-29 11:35:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` bigint(20) NOT NULL,
  `id_pedido` bigint(20) NOT NULL,
  `id_cajero` bigint(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` enum('EFECTIVO','YAPE','PLIN','TRANSFERENCIA','TARJETA') NOT NULL,
  `monto_recibido` decimal(10,2) DEFAULT NULL,
  `vuelto` decimal(10,2) DEFAULT 0.00,
  `comprobante` enum('BOLETA','FACTURA','NINGUNO') DEFAULT 'NINGUNO',
  `serie` varchar(10) DEFAULT NULL,
  `correlativo` varchar(10) DEFAULT NULL,
  `fecha_venta` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_detalle_pedido` (`id_pedido`),
  ADD KEY `fk_detalle_producto` (`id_producto`);

--
-- Indices de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingrediente_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero` (`numero`);

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_pedido` (`numero_pedido`),
  ADD KEY `fk_pedido_cliente` (`id_cliente`),
  ADD KEY `fk_pedido_mesa` (`id_mesa`),
  ADD KEY `fk_pedido_mesero` (`id_mesero`),
  ADD KEY `fk_pedido_cocinero` (`id_cocinero`);

--
-- Indices de la tabla `pedido_estados`
--
ALTER TABLE `pedido_estados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_estado_pedido` (`id_pedido`),
  ADD KEY `fk_estado_usuario` (`id_usuario`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `perfil_opcion`
--
ALTER TABLE `perfil_opcion`
  ADD PRIMARY KEY (`id_perfil`,`id_opcion`),
  ADD KEY `id_opcion` (`id_opcion`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_categoria` (`id_categoria`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_usuario_perfil` (`id_perfil`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_pedido` (`id_pedido`),
  ADD KEY `fk_venta_cajero` (`id_cajero`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido_estados`
--
ALTER TABLE `pedido_estados`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD CONSTRAINT `fk_ingrediente_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `fk_pedido_cocinero` FOREIGN KEY (`id_cocinero`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_pedido_mesa` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id`),
  ADD CONSTRAINT `fk_pedido_mesero` FOREIGN KEY (`id_mesero`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `pedido_estados`
--
ALTER TABLE `pedido_estados`
  ADD CONSTRAINT `fk_estado_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `fk_estado_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `perfil_opcion`
--
ALTER TABLE `perfil_opcion`
  ADD CONSTRAINT `perfil_opcion_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `perfil_opcion_ibfk_2` FOREIGN KEY (`id_opcion`) REFERENCES `opciones` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuario_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_venta_cajero` FOREIGN KEY (`id_cajero`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_venta_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
