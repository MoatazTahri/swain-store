package com.example.pricingservice.exception;

public class PricingNotFound extends IllegalStateException {
    public PricingNotFound(String message) {
        super(message);
    }
}
