package com.restaurante.app.controller;

import com.restaurante.app.model.Producto;
import com.restaurante.app.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.restaurante.app.model.Categoria;
import com.restaurante.app.repository.CategoriaRepository;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private CategoriaRepository categoriaRepository;

    // 0. Obtener categorías para el combo
    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> obtenerCategorias() {
        return ResponseEntity.ok(categoriaRepository.findByEstadoTrueOrderByOrdenAsc());
    }

    // 1. Obtener TODO el catálogo (Útil para la parte administrativa)
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        return ResponseEntity.ok(productoService.listarTodos()); // Método que traiga todo
    }

    // 2. Obtener solo productos activos (Para la web principal)
    @GetMapping("/catalogo")
    public ResponseEntity<List<Producto>> obtenerCatalogo() {
        return ResponseEntity.ok(productoService.listarCatalogo());
    }

    // 3. Obtener los 3 más destacados (Para el Top 3 de la web)
    @GetMapping("/top")
    public ResponseEntity<List<Producto>> obtenerTopTres() {
        List<Producto> topTres = productoService.listarCatalogo().stream()
                .filter(p -> p.getDestacado() != null && p.getDestacado())
                .limit(3)
                .toList();
        return ResponseEntity.ok(topTres);
    }

    // 4. Crear o Actualizar Producto (Desde el panel administrativo)
    @PostMapping
    public ResponseEntity<Producto> guardar(
            @RequestParam(value = "fotoFile", required = false) MultipartFile fotoFile,
            Producto producto) {
        
        try {
            if (fotoFile != null && !fotoFile.isEmpty()) {
                // Asegurar que el directorio exista
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                
                String fileName = UUID.randomUUID().toString() + "_" + fotoFile.getOriginalFilename();
                Path path = uploadDir.resolve(fileName);
                Files.copy(fotoFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                producto.setFoto("/uploads/" + fileName);
            } else if (producto.getId() != null) {
                // Mantener foto existente si no se subió una nueva
                Producto existente = productoService.findById(producto.getId());
                if (existente != null) {
                    producto.setFoto(existente.getFoto());
                }
            }
            
            return ResponseEntity.ok(productoService.guardarProducto(producto));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 5. Eliminar (o desactivar) producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}