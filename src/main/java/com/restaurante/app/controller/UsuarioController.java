package com.restaurante.app.controller;

import com.restaurante.app.model.Usuario;
import com.restaurante.app.model.Perfil;
import com.restaurante.app.repository.UsuarioRepository;
import com.restaurante.app.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping("/perfiles")
    public ResponseEntity<List<Perfil>> listarPerfiles() {
        return ResponseEntity.ok(perfilRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Usuario> guardar(@RequestBody Map<String, Object> datos) {
        Usuario u = new Usuario();
        u.setNombre((String) datos.get("nombre"));
        u.setUsername((String) datos.get("username"));
        u.setCorreo((String) datos.get("correo"));
        u.setTelefono((String) datos.get("telefono"));
        u.setEstado(datos.get("estado") == null || (Boolean) datos.get("estado"));

        // Si envían un ID, es edición
        if (datos.get("id") != null) {
            Long id = Long.valueOf(datos.get("id").toString());
            Usuario existente = usuarioRepository.findById(id).orElse(null);
            if (existente != null) {
                existente.setNombre(u.getNombre());
                existente.setUsername(u.getUsername());
                existente.setCorreo(u.getCorreo());
                existente.setTelefono(u.getTelefono());
                existente.setEstado(u.getEstado());
                // Solo cambiar contraseña si se envía una nueva
                String password = (String) datos.get("password");
                if (password != null && !password.isBlank()) {
                    existente.setPassword(passwordEncoder.encode(password));
                }
                // Asignar perfil
                if (datos.get("perfilId") != null) {
                    Long perfilId = Long.valueOf(datos.get("perfilId").toString());
                    perfilRepository.findById(perfilId).ifPresent(existente::setPerfil);
                }
                return ResponseEntity.ok(usuarioRepository.save(existente));
            }
        }

        // Nuevo usuario
        String password = (String) datos.get("password");
        if (password != null && !password.isBlank()) {
            u.setPassword(passwordEncoder.encode(password));
        } else {
            u.setPassword(passwordEncoder.encode("123456")); // password por defecto
        }
        if (datos.get("perfilId") != null) {
            Long perfilId = Long.valueOf(datos.get("perfilId").toString());
            perfilRepository.findById(perfilId).ifPresent(u::setPerfil);
        }
        return ResponseEntity.ok(usuarioRepository.save(u));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deshabilitar(@PathVariable Long id) {
        usuarioRepository.findById(id).ifPresent(u -> {
            u.setEstado(false);
            usuarioRepository.save(u);
        });
        return ResponseEntity.ok().build();
    }
}
