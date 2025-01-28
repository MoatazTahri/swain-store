package com.example.inventoryservice.service;

import com.example.inventoryservice.entity.Inventory;
import com.example.inventoryservice.model.InventoryItemRequest;
import com.example.inventoryservice.model.InventoryItemResponse;
import com.example.inventoryservice.repository.InventoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class InventoryServiceImpl implements InventoryService {

    private InventoryRepository inventoryRepository;

    @Override
    public List<InventoryItemResponse> getQuantitiesOf(List<String> skuCodes) {
        return inventoryRepository.findBySkuCodeIn(skuCodes)
                .stream()
                .map(inventory -> InventoryItemResponse.builder()
                        .skuCode(inventory.getSkuCode())
                        .quantity(inventory.getQuantity())
                        .build())
                .toList();
    }

    @Override
    public void addItem(InventoryItemRequest inventoryItemRequest) {
        Inventory inventory = Inventory.builder()
                .skuCode(inventoryItemRequest.getSkuCode())
                .quantity(inventoryItemRequest.getQuantity())
                .build();
        inventoryRepository.save(inventory);
        log.info("Added inventory item: {}", inventoryItemRequest);
    }

    @Override
    public void decreaseItemQuantity(List<InventoryItemRequest> items) {
        List<String> skuCodes = items.stream().map(InventoryItemRequest::getSkuCode).toList();
        List<Inventory> inventoryItems = inventoryRepository.findBySkuCodeIn(skuCodes);
        for (int i = 0; i < inventoryItems.size(); i++) {
            int currentQuantity = inventoryItems.get(i).getQuantity();
            int requestedQuantity = items.get(i).getQuantity();
            int newQuantity = currentQuantity - requestedQuantity;
            if (newQuantity <= 0) {
                log.error("Item {} quantity in stock is less than requested", items.get(i).getSkuCode());
                throw new IllegalStateException("Not enough quantity in stock");
            }
            inventoryItems.get(i).setQuantity(newQuantity);
        }
        inventoryRepository.saveAll(inventoryItems);
        log.info("Inventory items decreased: {}", items);
    }

}
