package com.example.productservice.exception;

public class ProductNotFoundException extends IllegalStateException{

    public ProductNotFoundException(String message){
        super(message);
    }
}
