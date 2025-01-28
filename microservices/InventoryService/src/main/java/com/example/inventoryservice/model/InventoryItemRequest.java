package com.example.inventoryservice.model;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryItemRequest {
    private String skuCode;
    private Integer quantity;
}
