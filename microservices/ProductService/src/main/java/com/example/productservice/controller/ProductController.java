package com.example.productservice.controller;

import com.example.productservice.enumeration.Category;
import com.example.productservice.model.ProductRequest;
import com.example.productservice.model.ProductResponse;
import com.example.productservice.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {

    private ProductService productService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createProduct(@RequestBody ProductRequest productRequest) {
        productService.createProduct(productRequest);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts(@RequestParam(name = "category", required = false) List<String> categoriesNames) {
        if (categoriesNames != null) {
            List<Category> categories = categoriesNames.stream().map(Category::valueOfIgnoreCase).toList();
            return productService.getProductsByCategory(categories);
        }
        return productService.getAllProducts();
    }

    @GetMapping("/categories")
    @ResponseStatus(HttpStatus.OK)
    public Map<Category, Integer> getCategoriesProductCount() {
        return productService.getProductsCountInCategories();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductById(@PathVariable("id") int id) {
        return productService.getProductById(id);
    }

    @PutMapping("/edit/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateProduct(@PathVariable("id") int id, @RequestBody ProductRequest productRequest) {
        productService.updateProduct(id, productRequest);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProduct(@PathVariable("id") int id) {
        productService.deleteProduct(id);
    }
}
