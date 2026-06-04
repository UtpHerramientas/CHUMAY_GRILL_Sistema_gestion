package com.restaurante.app.controller;

import com.restaurante.app.model.Usuario;
import com.restaurante.app.repository.UsuarioRepository;
import com.restaurante.app.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
public class WebController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private UsuarioRepository usuarioRepository; // Lo necesitamos para el Sidebar dinámico

    // Página principal para los clientes (Inicio)
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // Página del Catálogo separada
    @GetMapping("/catalogo")
    public String catalogo() {
        return "catalogo";
    }

    // Página del Carrito de compras
    @GetMapping("/carrito")
    public String carrito() {
        return "carrito";
    }

    // Página de acceso (Mantenlo aquí, borra el AuthController)
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    // Ruta hacia el Panel Administrativo (Sidebar)
    // Agregamos 'Authentication' para saber quién entró
    @GetMapping("/admin/dashboard")
    public String dashboard(Model model, Authentication auth) {
        return adminDashboard(model, auth);
    }

    @GetMapping("/admin/pedidos")
    public String adminPedidos(Model model, Authentication auth) {
        return adminDashboard(model, auth);
    }

    @GetMapping("/admin/ventas")
    public String adminVentas(Model model, Authentication auth) {
        return adminDashboard(model, auth);
    }

    @GetMapping("/admin/usuarios")
    public String adminUsuarios(Model model, Authentication auth) {
        return adminDashboard(model, auth);
    }

    @GetMapping("/admin/categorias")
    public String adminCategorias(Model model, Authentication auth) {
        return adminDashboard(model, auth);
    }

    @GetMapping("/admin/productos")
    public String adminProductos(Model model, Authentication auth) {
        return adminDashboard(model, auth);
    }

    private String adminDashboard(Model model, Authentication auth) {
        Usuario usuario = usuarioRepository.findByUsername(auth.getName()).orElse(null);
        if (usuario != null) {
            model.addAttribute("usuarioNombre", usuario.getNombre());
            model.addAttribute("usuarioPerfil", usuario.getPerfil().getNombre());
            model.addAttribute("opciones", usuario.getPerfil().getOpciones());
        }
        return "admin";
    }
}