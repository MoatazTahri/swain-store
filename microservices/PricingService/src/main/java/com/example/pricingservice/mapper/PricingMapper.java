package com.example.pricingservice.mapper;

import com.example.pricingservice.entity.Pricing;
import com.example.pricingservice.model.PricingRequest;

public class PricingMapper {

    public static Pricing toPricing(PricingRequest pricingRequest) {
        return Pricing.builder()
                .unitPrice(pricingRequest.getUnitPrice())
                .skuCode(pricingRequest.getSkuCode())
                .build();
    }
}
