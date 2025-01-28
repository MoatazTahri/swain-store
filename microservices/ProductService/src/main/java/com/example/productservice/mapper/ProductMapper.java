package com.example.productservice.mapper;

import com.example.productservice.entity.Product;
import com.example.productservice.model.ProductRequest;
import com.example.productservice.model.ProductResponse;

public class ProductMapper {

    public static ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .skuCode(product.getSkuCode())
                .category(product.getCategory())
                .description(product.getDescription())
                .imageName(product.getImageName())
                .build();
    }

    public static Product mapToProduct(ProductRequest productRequest) {
        return Product.builder()
                .name(productRequest.getName())
                .skuCode(productRequest.getSkuCode())
                .category(productRequest.getCategory())
                .description(productRequest.getDescription())
                .imageName(productRequest.getImageName())
                .build();
    }
}
