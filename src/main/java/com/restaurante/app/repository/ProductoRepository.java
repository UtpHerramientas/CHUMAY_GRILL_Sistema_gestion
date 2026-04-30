package com.restaurante.app.repository;

import com.restaurante.app.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    // Para la web principal (solo activos)
    List<Producto> findByEstadoTrue();
}