package com.example.productservice.service;

import com.example.productservice.consumer.PricingApiConsumer;
import com.example.productservice.entity.Product;
import com.example.productservice.enumeration.Category;
import com.example.productservice.exception.ProductNotFoundException;
import com.example.productservice.mapper.ProductMapper;
import com.example.productservice.model.Pricing.PricingResponse;
import com.example.productservice.model.ProductRequest;
import com.example.productservice.model.ProductResponse;
import com.example.productservice.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    private PricingApiConsumer pricingApiConsumer;

    @Override
    public void createProduct(ProductRequest productRequest) {
        Product product = ProductMapper.mapToProduct(productRequest);
        productRepository.save(product);
        log.info("Product created");
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<String> skuCodes = products
                .stream()
                .map(Product::getSkuCode)
                .toList();
        List<PricingResponse> productsPricing = pricingApiConsumer.getPricingOfProducts(skuCodes);
        List<ProductResponse> productResponses = new ArrayList<>();
        for (int i = 0; i < products.size(); i++) {
            ProductResponse productResponse = ProductMapper.mapToProductResponse(products.get(i));
            productResponse.setPrice(productsPricing.get(i).getUnitPrice());
            productResponses.add(productResponse);
        }
        return productResponses;
    }

    @Override
    public ProductResponse getProductById(int id) {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            log.error("Product with id {} not found", id);
            return new ProductNotFoundException(String.format("Product with id %d not found", id));
        });
        double productPrice = pricingApiConsumer.getPricingOfProduct(product.getSkuCode()).getUnitPrice();
        ProductResponse productResponse = ProductMapper.mapToProductResponse(product);
        productResponse.setPrice(productPrice);
        return productResponse;
    }

    @Override
    public List<ProductResponse> getProductsByCategory(List<Category> categories) {
        List<Product> products = productRepository.findByCategoryIn(categories);
        List<String> skuCodes = products
                .stream()
                .map(Product::getSkuCode)
                .toList();
        List<PricingResponse> productsPricing = pricingApiConsumer.getPricingOfProducts(skuCodes);
        List<ProductResponse> productResponses = new ArrayList<>();
        for (int i = 0; i < products.size(); i++) {
            ProductResponse productResponse = ProductMapper.mapToProductResponse(products.get(i));
            productResponse.setPrice(productsPricing.get(i).getUnitPrice());
            productResponses.add(productResponse);
        }
        return productResponses;
    }

    @Override
    public Map<Category, Integer> getProductsCountInCategories() {
        Category[] categories = Category.values();
        Map<Category, Integer> categoryMap = new HashMap<>();
        for (Category category : categories) {
            int productCount = productRepository.countProductByCategory(category);
            categoryMap.put(category, productCount);
        }
        return categoryMap;
    }

    @Override
    public void updateProduct(int id, ProductRequest productRequest) {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            log.error("Product with id {} not found", id);
            return new ProductNotFoundException(String.format("Product with id %d not found", id));
        });
        product.setName(productRequest.getName());
        product.setSkuCode(productRequest.getSkuCode());
        product.setDescription(productRequest.getDescription());
        productRepository.save(product);
        log.info("Product updated");
    }

    @Override
    public void deleteProduct(int id) {
        if (productRepository.findById(id).isEmpty()) {
            log.error("Product with id {} not found", id);
            throw new ProductNotFoundException(String.format("Product with id %d not found", id));
        }
        productRepository.deleteById(id);
        log.info("Product deleted");
    }
}
