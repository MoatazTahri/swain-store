package com.example.inventoryservice.controller;

import com.example.inventoryservice.model.InventoryItemRequest;
import com.example.inventoryservice.model.InventoryItemResponse;
import com.example.inventoryservice.service.InventoryService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/inventory")
@Log4j2
public class InventoryController {

    private InventoryService inventoryService;

    @GetMapping("/check-stock")
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryItemResponse> getProductQuantitiesInStock(@RequestParam List<String> skuCode) {
        return inventoryService.getQuantitiesOf(skuCode);
    }

    @PostMapping("/decrease-items-quantity")
    @ResponseStatus(HttpStatus.OK)
    public void updateStockQuantity(@RequestBody List<InventoryItemRequest> inventoryItems) {
        inventoryService.decreaseItemQuantity(inventoryItems);
    }

    @PostMapping("/add-into-inventory")
    @ResponseStatus(HttpStatus.CREATED)
    public void addInventoryItem(@RequestBody InventoryItemRequest inventoryItemRequest) {
        inventoryService.addItem(inventoryItemRequest);
    }
}
