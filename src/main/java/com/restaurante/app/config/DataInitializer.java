package com.restaurante.app.config;

import com.restaurante.app.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Inicializador de datos: al arrancar la aplicación verifica que el usuario
 * admin tenga una contraseña BCrypt válida. Si el hash almacenado no coincide
 * con "admin123" lo reemplaza por uno generado en tiempo de ejecución.
 *
 * CONTRASEÑA POR DEFECTO: admin123
 * Cambia DEFAULT_PASSWORD por la que desees antes de desplegar en producción.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    /** Contraseña que deseas usar para el usuario admin */
    private static final String ADMIN_USERNAME = "admin";
    private static final String DEFAULT_PASSWORD = "123456";

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        usuarioRepository.findByUsername(ADMIN_USERNAME).ifPresentOrElse(admin -> {
            // Verifica si el hash actual ya corresponde a DEFAULT_PASSWORD
            boolean hashValido = passwordEncoder.matches(DEFAULT_PASSWORD, admin.getPassword());
            if (!hashValido) {
                String nuevoHash = passwordEncoder.encode(DEFAULT_PASSWORD);
                admin.setPassword(nuevoHash);
                usuarioRepository.save(admin);
                log.info("✅ Contraseña del administrador actualizada correctamente.");
                log.info("   Usuario: {}", ADMIN_USERNAME);
                log.info("   Contraseña: {}", DEFAULT_PASSWORD);
            } else {
                log.info("✅ Hash del administrador ya es válido. No se requiere cambio.");
            }
        }, () -> log.warn("⚠️  Usuario '{}' no encontrado en la base de datos.", ADMIN_USERNAME));
    }
}
