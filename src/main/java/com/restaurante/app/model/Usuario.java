package com.restaurante.app.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String username;
    private String password;
    private String correo;
    private String telefono;
    private Boolean estado;

    // Cambiamos el nombre del atributo y el JoinColumn para que coincida con tu nueva DB
    @ManyToOne
    @JoinColumn(name = "id_perfil")
    private Perfil perfil;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Método útil para auditoría antes de insertar
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.estado == null) this.estado = true;
    }
}