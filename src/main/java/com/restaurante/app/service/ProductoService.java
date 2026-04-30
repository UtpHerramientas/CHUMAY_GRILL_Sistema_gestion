package com.restaurante.app.service;

import com.restaurante.app.model.Producto;
import com.restaurante.app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Este es el que te daba error: Trae todo de la base de datos
    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Producto findById(Integer id) {
        return productoRepository.findById(id).orElse(null);
    }

    // Trae solo los productos con estado = 1 (disponibles)
    public List<Producto> listarCatalogo() {
        return productoRepository.findByEstadoTrue();
    }

    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    // Borrado lógico
    public void eliminarProducto(Integer id) {
        Producto producto = productoRepository.findById(id).orElse(null);
        if (producto != null) {
            producto.setEstado(false);
            productoRepository.save(producto);
        }
    }
}