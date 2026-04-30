package com.restaurante.app.controller;

import com.restaurante.app.model.Categoria;
import com.restaurante.app.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    // Obtener TODAS las categorías (para el panel administrativo)
    @GetMapping
    public ResponseEntity<List<Categoria>> obtenerTodas() {
        return ResponseEntity.ok(categoriaService.listarTodas());
    }

    // Obtener solo activas (este ya existía en ProductoController pero lo ponemos aquí también por buena práctica)
    @GetMapping("/activas")
    public ResponseEntity<List<Categoria>> obtenerActivas() {
        return ResponseEntity.ok(categoriaService.listarActivas());
    }

    // Guardar / Actualizar
    @PostMapping
    public ResponseEntity<Categoria> guardar(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.guardarCategoria(categoria));
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}
