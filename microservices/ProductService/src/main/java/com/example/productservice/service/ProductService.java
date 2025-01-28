package com.example.productservice.service;

import com.example.productservice.enumeration.Category;
import com.example.productservice.model.ProductRequest;
import com.example.productservice.model.ProductResponse;

import java.util.List;
import java.util.Map;

public interface ProductService {
    void createProduct(ProductRequest productRequest);
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(int id);
    List<ProductResponse> getProductsByCategory(List<Category> category);
    Map<Category, Integer> getProductsCountInCategories();
    void updateProduct(int id, ProductRequest productRequest);
    void deleteProduct(int id);
}
