package com.example.authenticationservice.service.user;

import lombok.AllArgsConstructor;
import com.example.authenticationservice.exception.UserNotFoundException;
import com.example.authenticationservice.mapper.UserCredentialMapper;
import com.example.authenticationservice.model.UserResponse;
import com.example.authenticationservice.repository.UserCredentialRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserCredentialRepository userCredentialRepository;

    @Override
    public UserResponse getUserByEmail(String email) {
        return userCredentialRepository.findByEmail(email)
                .map(UserCredentialMapper::mapToUserResponse)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + email));
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        return userCredentialRepository.findByEmail(username)
                .map(UserCredentialMapper::mapToUserResponse)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));
    }

}
