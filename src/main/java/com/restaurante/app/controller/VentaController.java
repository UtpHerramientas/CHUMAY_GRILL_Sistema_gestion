package com.restaurante.app.controller;

import com.restaurante.app.model.Venta;
import com.restaurante.app.service.BoletaPdfService;
import com.restaurante.app.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @Autowired
    private BoletaPdfService boletaPdfService;

    @PostMapping("/cobrar/{pedidoId}")
    public ResponseEntity<Venta> cobrar(@PathVariable Long pedidoId, @RequestBody Venta ventaData, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(ventaService.registrarVenta(pedidoId, username, ventaData));
    }

    @GetMapping
    public ResponseEntity<List<Venta>> listarVentas() {
        return ResponseEntity.ok(ventaService.obtenerVentasRecientes());
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<InputStreamResource> descargarPdf(@PathVariable Long id) {
        Venta venta = ventaService.obtenerVentaPorId(id);
        ByteArrayInputStream bis = boletaPdfService.generarBoletaPdf(venta);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=boleta_" + id + ".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
