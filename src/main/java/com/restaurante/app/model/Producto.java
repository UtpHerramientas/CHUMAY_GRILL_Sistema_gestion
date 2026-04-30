package com.restaurante.app.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String foto;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    private Boolean disponible;
    private Boolean destacado;

    @Enumerated(EnumType.STRING)
    private TipoProducto tipo;

    private Boolean estado;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}