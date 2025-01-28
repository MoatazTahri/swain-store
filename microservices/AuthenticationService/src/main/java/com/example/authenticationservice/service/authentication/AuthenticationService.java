package com.example.authenticationservice.service.authentication;

import io.jsonwebtoken.Claims;
import com.example.authenticationservice.entity.UserCredential;
import com.example.authenticationservice.model.UserCredentialRequest;

import java.util.Map;

public interface AuthenticationService {
    void register(UserCredential credential);
    boolean authenticate(UserCredentialRequest credential);
    String generateToken(Map<String, Object> userInfo, long expirationTime);
    boolean validateToken(String token);
    Claims getClaimsFromToken(String token);
}
