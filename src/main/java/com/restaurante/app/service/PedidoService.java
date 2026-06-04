package com.restaurante.app.service;

import com.restaurante.app.model.*;
import com.restaurante.app.repository.MesaRepository;
import com.restaurante.app.repository.PedidoRepository;
import com.restaurante.app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    /**
     * Crea un pedido público (desde el carrito del cliente, sin autenticación).
     * No requiere mesa — puede ser DELIVERY, RECOJO o MESA sin asignar.
     */
    @Transactional
    public Pedido crearPedidoPublico(Pedido pedido) {
        BigDecimal total = BigDecimal.ZERO;

        // Si se envía una mesa, actualizar su estado
        if (pedido.getMesa() != null && pedido.getMesa().getId() != null) {
            Mesa mesa = mesaRepository.findById(pedido.getMesa().getId()).orElse(null);
            if (mesa != null) {
                mesa.setEstado(EstadoMesa.OCUPADA);
                mesaRepository.save(mesa);
                pedido.setMesa(mesa);
            }
        } else {
            pedido.setMesa(null);
        }

        // Procesar los detalles y calcular el total
        if (pedido.getDetalles() != null) {
            for (DetallePedido detalle : pedido.getDetalles()) {
                if (detalle.getProducto() == null || detalle.getProducto().getId() == null) continue;

                Producto producto = productoRepository.findById(detalle.getProducto().getId())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

                detalle.setPrecio(producto.getPrecio());
                detalle.setPedido(pedido);

                BigDecimal subtotalItem = producto.getPrecio().multiply(new BigDecimal(detalle.getCantidad()));
                total = total.add(subtotalItem);
            }
        }

        pedido.setTotal(total);
        pedido.setSubtotal(total);
        pedido.setEstado(EstadoPedido.PENDIENTE);

        return pedidoRepository.save(pedido);
    }

    /**
     * Crea un pedido interno (desde el panel de admin/mesero, con autenticación).
     */
    @Transactional
    public Pedido crearPedido(Pedido pedido) {
        return crearPedidoPublico(pedido);
    }

    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }

    @Transactional
    public Pedido actualizarEstado(Long id, EstadoPedido estado) {
        Pedido pedido = obtenerPedidoPorId(id);
        pedido.setEstado(estado);
        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido terminarPedido(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        // Liberar la mesa si aplica
        if (pedido.getMesa() != null) {
            Mesa mesa = pedido.getMesa();
            mesa.setEstado(EstadoMesa.LIBRE);
            mesaRepository.save(mesa);
        }

        pedido.setEstado(EstadoPedido.ENTREGADO);
        return pedidoRepository.save(pedido);
    }
}