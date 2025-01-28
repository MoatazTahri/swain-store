package com.example.inventoryservice.service;

import com.example.inventoryservice.model.InventoryItemRequest;
import com.example.inventoryservice.model.InventoryItemResponse;

import java.util.List;

public interface InventoryService {
    List<InventoryItemResponse> getQuantitiesOf(List<String> skuCodes);
    void addItem(InventoryItemRequest inventoryItemRequest);

    /**
     * A service method to update quantity of items in stock after selling.
     * @param items a list of {@link InventoryItemRequest}, each item contains skuCode and the quantity sold.
     */
    void decreaseItemQuantity(List<InventoryItemRequest> items);
}
