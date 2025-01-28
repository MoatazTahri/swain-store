package com.example.orderservice.consumer;

import com.example.orderservice.model.Inventory.InventoryItemRequest;
import com.example.orderservice.model.Inventory.InventoryItemResponse;
import com.example.orderservice.model.Order.OrderLineItemDto;
import com.example.orderservice.model.Order.OrderRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class InventoryApiConsumer {

    @Value("${INVENTORY_API_URL}")
    private String INVENTORY_API_URL;
    private static final String STOCK_CHECK_ENDPOINT = "/check-stock";
    private static final String UPDATE_ITEMS_QUANTITY_ENDPOINT = "/decrease-items-quantity";
    private final WebClient webClient;

    public InventoryApiConsumer(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<InventoryItemResponse> getProductsQuantitiesInStock(List<String> skuCodes) {
        return webClient.get()
                .uri(INVENTORY_API_URL + STOCK_CHECK_ENDPOINT,
                        uriBuilder -> uriBuilder
                                .queryParam("skuCode", skuCodes)
                                .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<InventoryItemResponse>>() {
                })
                .block();
    }

    public List<String> getProductsOutOfStock(OrderRequest orderRequest) {
        List<String> skuCodes = orderRequest.getOrderLineItemsDto().stream()
                .map(OrderLineItemDto::getSkuCode)
                .toList();
        return getProductsQuantitiesInStock(skuCodes)
                .stream()
                .filter(inventoryItemResponse -> inventoryItemResponse.getQuantity() == 0)
                .map(InventoryItemResponse::getSkuCode)
                .toList();
    }

    // Consuming the Inventory API to decrease sold items quantity.
    public void decreaseQuantity(List<InventoryItemRequest> inventoryItemRequests) {
        webClient.post()
                .uri(INVENTORY_API_URL + UPDATE_ITEMS_QUANTITY_ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(inventoryItemRequests), new ParameterizedTypeReference<>() {})
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }
}
