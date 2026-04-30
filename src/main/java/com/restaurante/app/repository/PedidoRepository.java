package com.restaurante.app.repository;

import com.restaurante.app.model.Pedido;
import com.restaurante.app.model.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByEstado(EstadoPedido estado);
    List<Pedido> findByMesaId(Integer idMesa);
}