package com.example.productservice.model.Pricing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PricingResponse {
    private String skuCode;
    private double unitPrice;
}
