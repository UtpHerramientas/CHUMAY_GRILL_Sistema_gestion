package com.restaurante.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "opciones")
@Data
public class Opcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String ruta;
    private String icono;
}