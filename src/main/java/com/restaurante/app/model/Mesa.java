package com.restaurante.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "mesas")
@Data
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer numero;
    private Integer capacidad;
    private String ubicacion;

    @Enumerated(EnumType.STRING)
    private EstadoMesa estado; // LIBRE, OCUPADA, RESERVADA
}