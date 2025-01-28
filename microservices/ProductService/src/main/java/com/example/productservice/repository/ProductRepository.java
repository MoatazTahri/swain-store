package com.example.productservice.repository;

import com.example.productservice.entity.Product;
import com.example.productservice.enumeration.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategoryIn(List<Category> categories);
    Integer countProductByCategory(Category category);
}
