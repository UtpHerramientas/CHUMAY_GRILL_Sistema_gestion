package com.restaurante.app.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "perfiles")
@Data
public class Perfil {

    @Id // Ahora sí se usará jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "perfil_opcion",
            joinColumns = @JoinColumn(name = "id_perfil"),
            inverseJoinColumns = @JoinColumn(name = "id_opcion")
    )
    private List<Opcion> opciones;
}