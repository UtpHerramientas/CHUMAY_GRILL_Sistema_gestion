package com.restaurante.app.repository;

import com.restaurante.app.model.EstadoMesa;
import com.restaurante.app.model.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MesaRepository extends JpaRepository<Mesa, Integer> {
    List<Mesa> findByEstado(EstadoMesa estado);
}