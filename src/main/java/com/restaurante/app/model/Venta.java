package com.restaurante.app.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventas")
@Data
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_pedido", unique = true, nullable = false)
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_cajero", nullable = false)
    private Usuario cajero;

    @Column(nullable = false)
    private BigDecimal total;

    @Column(name = "metodo_pago", nullable = false)
    private String metodoPago; // EFECTIVO, YAPE, PLIN, TRANSFERENCIA, TARJETA

    @Column(name = "monto_recibido")
    private BigDecimal montoRecibido;

    private BigDecimal vuelto;

    private String comprobante; // BOLETA, FACTURA, NINGUNO
    private String serie;
    private String correlativo;

    @Column(name = "fecha_venta")
    private LocalDateTime fechaVenta;

    @PrePersist
    protected void onCreate() {
        fechaVenta = LocalDateTime.now();
        if (vuelto == null) vuelto = BigDecimal.ZERO;
        if (comprobante == null) comprobante = "NINGUNO";
    }
}
