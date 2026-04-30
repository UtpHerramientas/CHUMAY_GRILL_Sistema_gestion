package com.restaurante.app.model;

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
    private Mesa mesa;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_mesero")
    private Usuario mesero;

    @ManyToOne
    @JoinColumn(name = "id_cocinero")
    private Usuario cocinero;

    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado; // PENDIENTE, EN_PREPARACION, LISTO, ENTREGADO, CANCELADO

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Relación con el detalle de los platos pedidos
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<DetallePedido> detalles;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}