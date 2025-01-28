package com.example.productservice.consumer;

import com.example.productservice.model.Pricing.PricingResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Slf4j
@Component
public class PricingApiConsumer {

    @Value("${PRICING_API_URL}")
    private String PRICING_API_URL;
    private final WebClient webClient;

    public PricingApiConsumer(WebClient webClient) {
        this.webClient = webClient;
    }


    // Circuit breaker will return products prices as 0 when the pricing service is down.
    @CircuitBreaker(name="product_pricing_list", fallbackMethod = "defaultPricingListResponse")
    public List<PricingResponse> getPricingOfProducts(List<String> skuCodes) {
        return webClient.get()
                .uri(PRICING_API_URL, uriBuilder ->
                        uriBuilder.queryParam("skuCodes", skuCodes)
                                .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<PricingResponse>>() {})
                .block();
    }

    @CircuitBreaker(name="product_pricing", fallbackMethod = "defaultPricingResponse")
    public PricingResponse getPricingOfProduct(String skuCode) {
        return webClient.get()
                .uri(PRICING_API_URL + "/{skuCode}", skuCode)
                .retrieve()
                .bodyToMono(PricingResponse.class)
                .block();
    }

    private List<PricingResponse> defaultPricingListResponse(List<String> skuCodes, Exception exception) {
        log.error("Pricing service is unavailable, exception: {}", exception.getMessage());
        return skuCodes.stream().map(skuCode -> new PricingResponse(skuCode, 0)).toList();
    }

    private PricingResponse defaultPricingResponse(String skuCode, Exception exception) {
        log.error("Pricing service is unavailable, exception: {}", exception.getMessage());
        return new PricingResponse(skuCode, 0);
    }
}
