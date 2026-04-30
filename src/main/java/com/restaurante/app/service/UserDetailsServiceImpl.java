package com.restaurante.app.service;

import com.restaurante.app.model.Usuario;
import com.restaurante.app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User; // Importación directa para mayor claridad
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        // Verificar que el perfil no sea null
        if (usuario.getPerfil() == null) {
            throw new UsernameNotFoundException("El usuario no tiene perfil asignado: " + username);
        }

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + usuario.getPerfil().getNombre())
        );

        // Usar el constructor completo pasando el estado del usuario
        return new User(
                usuario.getUsername(),
                usuario.getPassword(),
                usuario.getEstado(),      // enabled
                true,                      // accountNonExpired
                true,                      // credentialsNonExpired
                true,                      // accountNonLocked
                authorities
        );
    }
}