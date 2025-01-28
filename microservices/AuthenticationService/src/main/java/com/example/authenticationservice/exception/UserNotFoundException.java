package com.example.authenticationservice.exception;

public class UserNotFoundException extends IllegalStateException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
