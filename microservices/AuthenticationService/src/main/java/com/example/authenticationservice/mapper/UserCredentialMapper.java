package com.example.authenticationservice.mapper;

import com.example.authenticationservice.model.UserResponse;
import com.example.authenticationservice.entity.UserCredential;
import com.example.authenticationservice.model.UserCredentialRequest;

public class UserCredentialMapper {

    public static UserCredential mapToUserCredential(final UserCredentialRequest userCredentialRequest) {
        return UserCredential.builder()
                .username(userCredentialRequest.getUsername())
                .email(userCredentialRequest.getEmail())
                .password(userCredentialRequest.getPassword())
                .build();
    }

    public static UserResponse mapToUserResponse(final UserCredential userCredential) {
        return UserResponse.builder()
                .username(userCredential.getUsername())
                .email(userCredential.getEmail())
                .role(userCredential.getRole())
                .build();
    }

}
