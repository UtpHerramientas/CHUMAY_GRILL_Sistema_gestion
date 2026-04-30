package com.restaurante.app.controller;

import com.restaurante.app.model.Pedido;
import com.restaurante.app.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> realizarPedido(@RequestBody Pedido pedido) {
        return ResponseEntity.ok(pedidoService.crearPedido(pedido));
    }

    @PutMapping("/{id}/entregar")
    public ResponseEntity<Pedido> entregarPedido(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.terminarPedido(id));
    }
}