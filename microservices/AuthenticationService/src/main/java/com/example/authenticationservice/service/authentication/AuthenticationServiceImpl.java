package com.example.authenticationservice.service.authentication;

import com.example.authenticationservice.entity.UserCredential;
import com.example.authenticationservice.enumeration.UserRole;
import com.example.authenticationservice.model.UserCredentialRequest;
import com.example.authenticationservice.repository.UserCredentialRepository;
import com.example.authenticationservice.service.jwt.JwtService;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserCredentialRepository userCredentialRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public void register(UserCredential credential) {
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        credential.setLocked(false);
        credential.setRole(UserRole.CLIENT);
        credential.setExpired(false);
        credential.setEnabled(true);
        userCredentialRepository.save(credential);
    }

    @Override
    public boolean authenticate(UserCredentialRequest credential) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credential.getEmail(), credential.getPassword()));
            return auth.isAuthenticated();
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public String generateToken(Map<String, Object> userInfo, long expirationTime) {
        return jwtService.generateToken(userInfo, expirationTime);
    }

    @Override
    public boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }

    @Override
    public Claims getClaimsFromToken(String token) {
        return jwtService.getClaims(token);
    }
}
