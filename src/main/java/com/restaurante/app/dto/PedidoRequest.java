package com.restaurante.app.dto;

import lombok.Data;
import java.util.List;

@Data
public class PedidoRequest {
    // Datos del cliente (Para Delivery / Llevar)
    private String nombreCliente;
    private String telefonoCliente;
    private String direccionCliente;
    private String referenciaCliente;
    
    // Datos del pedido
    private String tipoPedido; // "DELIVERY", "LOCAL", "LLEVAR"
    private Long idMesa; // Si es local
    
    private List<DetalleRequest> detalles;
}
