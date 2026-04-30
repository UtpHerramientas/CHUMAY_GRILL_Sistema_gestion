package com.restaurante.app.service;

import com.restaurante.app.model.Categoria;
import com.restaurante.app.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }
    
    public List<Categoria> listarActivas() {
        return categoriaRepository.findByEstadoTrueOrderByOrdenAsc();
    }

    public Categoria findById(Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public Categoria guardarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Borrado lógico
    public void eliminarCategoria(Integer id) {
        Categoria categoria = categoriaRepository.findById(id).orElse(null);
        if (categoria != null) {
            categoria.setEstado(false);
            categoriaRepository.save(categoria);
        }
    }
}
