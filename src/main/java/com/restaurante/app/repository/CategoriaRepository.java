package com.restaurante.app.repository;

import com.restaurante.app.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    List<Categoria> findByEstadoTrueOrderByOrdenAsc();
}
