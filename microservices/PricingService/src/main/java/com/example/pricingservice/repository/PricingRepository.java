package com.example.pricingservice.repository;

import com.example.pricingservice.entity.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PricingRepository extends JpaRepository<Pricing, Long> {
    Pricing findBySkuCode(String skuCode);
    List<Pricing> findBySkuCodeIn(List<String> skuCodes);
}
