package com.restaurante.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Mantener deshabilitado para facilitar el desarrollo inicial
                .authorizeHttpRequests(auth -> auth
                        // 1. Recursos estáticos (IMPORTANTE para que se vea el diseño)
                        .requestMatchers("/css/**", "/js/**", "/img/**", "/vendor/**").permitAll()

                        // 2. Rutas públicas de la Web (Catálogo)
                        .requestMatchers("/", "/login", "/api/productos/catalogo", "/api/productos/top").permitAll()

                        // 3. Rutas protegidas por Rol
                        .requestMatchers("/admin/**", "/api/admin/**").hasRole("ADMINISTRADOR")
                        .requestMatchers("/api/pedidos/**").hasAnyRole("ADMINISTRADOR", "MESERO")

                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login") // Nuestra página personalizada
                        .loginProcessingUrl("/login") // El action del form
                        .defaultSuccessUrl("/admin/dashboard", true) // A donde va tras loguearse
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}