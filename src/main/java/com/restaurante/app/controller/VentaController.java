package com.restaurante.app.controller;

import com.restaurante.app.model.Venta;
import com.restaurante.app.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping("/cobrar/{pedidoId}")
    public ResponseEntity<Venta> cobrar(@PathVariable Long pedidoId, @RequestBody Venta ventaData, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(ventaService.registrarVenta(pedidoId, username, ventaData));
    }

    @GetMapping
    public ResponseEntity<List<Venta>> listarVentas() {
        return ResponseEntity.ok(ventaService.obtenerVentasRecientes());
    }
}
