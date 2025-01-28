package com.example.authenticationservice.model;

import com.example.authenticationservice.enumeration.UserRole;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserResponse {
    private String username;
    private String email;
    private UserRole role;
}
