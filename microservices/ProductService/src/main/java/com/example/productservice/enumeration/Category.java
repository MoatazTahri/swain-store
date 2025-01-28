package com.example.productservice.enumeration;

import lombok.Getter;

@Getter
public enum Category {
    LAPTOP,
    DESKTOP,
    TABLET,
    HEADPHONE,
    SMARTPHONE,
    CAMERA,
    PRINTER,
    ACCESSORY,
    TV;

    public static Category valueOfIgnoreCase(String name) {
        return Category.valueOf(name.toUpperCase());
    }
}
