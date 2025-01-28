package com.example.authenticationservice.service.user;

import com.example.authenticationservice.model.UserResponse;

public interface UserService {
    UserResponse getUserByEmail(String email);
    UserResponse getUserByUsername(String username);
}
