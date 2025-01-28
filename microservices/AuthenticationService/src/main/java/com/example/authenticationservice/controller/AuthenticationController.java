package com.example.authenticationservice.controller;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.example.authenticationservice.entity.UserCredential;
import com.example.authenticationservice.mapper.UserCredentialMapper;
import com.example.authenticationservice.model.UserCredentialRequest;
import com.example.authenticationservice.model.UserResponse;
import com.example.authenticationservice.service.authentication.AuthenticationService;
import com.example.authenticationservice.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth/")
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authService;
    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@RequestBody UserCredentialRequest userCredentialRequest) {
        log.info(userCredentialRequest.toString());
        UserCredential userCredential = UserCredentialMapper.mapToUserCredential(userCredentialRequest);
        authService.register(userCredential);
    }

    @PostMapping("/login")
    public ResponseEntity<String> generateToken(@RequestBody UserCredentialRequest userCredentialRequest) {
        long expiration_time = 1000 * 60 * 60 * 24; // Token expires in 24 hours.
        boolean isAuthenticated = authService.authenticate(userCredentialRequest);
        if (isAuthenticated) {
            Map<String, Object> userInfo = new HashMap<>();
            UserResponse user = userService.getUserByEmail(userCredentialRequest.getEmail());
            userInfo.put("email", user.getEmail());
            userInfo.put("username", user.getUsername());
            userInfo.put("role", user.getRole().name());
            String token = authService.generateToken(userInfo, expiration_time);
            return ResponseEntity.ok("{\"token\":\"" + token + "\"}");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    @GetMapping("/validate")
    @ResponseStatus(HttpStatus.OK)
    public String validateToken(@RequestParam String token) {
        return authService.validateToken(token) ? "Token is valid" : "Token is invalid";
    }

    @GetMapping("/claims")
    @ResponseStatus(HttpStatus.OK)
    public Claims getClaims(@RequestParam String token) {
        return authService.getClaimsFromToken(token);
    }
}
