package com.example.authenticationservice.exception;

public class UserCredentialException extends IllegalStateException {
    public UserCredentialException(String message) {
        super(message);
    }
}
