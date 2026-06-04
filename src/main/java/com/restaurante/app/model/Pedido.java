package com.restaurante.app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_mesa")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Mesa mesa;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_mesero")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario mesero;

    @ManyToOne
    @JoinColumn(name = "id_cocinero")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario cocinero;

    // Datos del cliente para pedidos sin cuenta (delivery / recojo)
    @Column(name = "nombre_cliente")
    private String nombreCliente;

    @Column(name = "telefono_cliente")
    private String telefonoCliente;

    @Column(name = "direccion_entrega")
    private String direccionEntrega;

    private String observaciones;

    // Tipo de pedido: MESA, DELIVERY, RECOJO
    private String tipo;

    private BigDecimal total;

    private BigDecimal subtotal;

    @Column(name = "costo_envio")
    private BigDecimal costoEnvio;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado;

    @Column(name = "fecha_pedido")
    private LocalDateTime fechaPedido;

    // Relación con el detalle de los platos pedidos
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("pedido")
    private List<DetallePedido> detalles;

    @PrePersist
    protected void onCreate() {
        fechaPedido = LocalDateTime.now();
        if (estado == null) estado = EstadoPedido.PENDIENTE;
        if (total == null) total = BigDecimal.ZERO;
        if (subtotal == null) subtotal = BigDecimal.ZERO;
        if (costoEnvio == null) costoEnvio = BigDecimal.ZERO;
    }
}