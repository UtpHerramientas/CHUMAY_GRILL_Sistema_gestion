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

    @Transactional
    public Pedido crearPedido(Pedido pedido) {
        BigDecimal total = BigDecimal.ZERO;

        // 1. Validar y actualizar el estado de la mesa
        Mesa mesa = mesaRepository.findById(pedido.getMesa().getId())
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));
        mesa.setEstado(EstadoMesa.OCUPADA);
        mesaRepository.save(mesa);

        // 2. Procesar los detalles y calcular el total
        for (DetallePedido detalle : pedido.getDetalles()) {
            Producto producto = productoRepository.findById(detalle.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // Asignamos el precio actual del producto al detalle
            detalle.setPrecio(producto.getPrecio());
            detalle.setPedido(pedido);

            BigDecimal subtotal = producto.getPrecio().multiply(new BigDecimal(detalle.getCantidad()));
            total = total.add(subtotal);
        }

        pedido.setTotal(total);
        pedido.setEstado(EstadoPedido.PENDIENTE);

        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido terminarPedido(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        // Liberar la mesa
        Mesa mesa = pedido.getMesa();
        mesa.setEstado(EstadoMesa.LIBRE);
        mesaRepository.save(mesa);

        pedido.setEstado(EstadoPedido.ENTREGADO);
        return pedidoRepository.save(pedido);
    }
}