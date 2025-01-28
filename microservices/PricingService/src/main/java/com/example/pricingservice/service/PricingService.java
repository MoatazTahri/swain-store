package com.example.pricingservice.service;

import com.example.pricingservice.enumeration.Currency;
import com.example.pricingservice.model.PricingRequest;
import com.example.pricingservice.model.PricingResponse;
import com.example.pricingservice.model.ProductRequest;

import java.util.List;

public interface PricingService {
    void createPricing(PricingRequest pricingRequest);
    PricingResponse getPricingBySkuCode(String skuCode);
    List<PricingResponse> getPricingBySkuCodes(List<String> skuCodes);
    List<PricingResponse> getAllPricing();
    double convertCurrency(Currency baseCurrency, Currency targetCurrency);
    double totalPricing(List<ProductRequest> products);
}
