package com.restaurante.app.service;

import com.restaurante.app.model.*;
import com.restaurante.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Venta registrarVenta(Long pedidoId, String usernameCajero, Venta ventaData) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        Usuario cajero = usuarioRepository.findByUsername(usernameCajero)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Marcar el pedido como pagado y entregado/atendido
        pedido.setEstado(EstadoPedido.ENTREGADO);
        pedidoRepository.save(pedido);

        // Liberar mesa si aplica
        if (pedido.getMesa() != null) {
            Mesa mesa = pedido.getMesa();
            mesa.setEstado(EstadoMesa.LIBRE);
            mesaRepository.save(mesa);
        }

        // Generar Venta
        Venta venta = new Venta();
        venta.setPedido(pedido);
        venta.setCajero(cajero);
        venta.setTotal(pedido.getTotal());
        venta.setMetodoPago(ventaData.getMetodoPago());
        venta.setMontoRecibido(ventaData.getMontoRecibido());
        venta.setVuelto(ventaData.getVuelto());
        venta.setComprobante(ventaData.getComprobante());
        venta.setSerie(ventaData.getSerie());
        venta.setCorrelativo(ventaData.getCorrelativo());

        return ventaRepository.save(venta);
    }

    public List<Venta> obtenerVentasRecientes() {
        return ventaRepository.findAllOrderByFechaDesc();
    }
}
