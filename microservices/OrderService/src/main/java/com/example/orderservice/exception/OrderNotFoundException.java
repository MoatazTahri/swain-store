package com.example.orderservice.exception;

public class OrderNotFoundException extends IllegalStateException {
    public OrderNotFoundException(String message) {
        super(message);
    }
}
