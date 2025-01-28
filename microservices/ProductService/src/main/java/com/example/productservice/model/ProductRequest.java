package com.example.productservice.model;

import com.example.productservice.enumeration.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequest {
    private String name;
    private String skuCode;
    private Category category;
    private String description;
    private String imageName;
}
