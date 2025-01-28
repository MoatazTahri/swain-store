package com.example.orderservice.mapper;

import com.example.orderservice.entity.OrderLineItem;
import com.example.orderservice.model.Inventory.InventoryItemRequest;
import com.example.orderservice.model.Order.OrderLineItemDto;

public class OrderLineItemMapper {

    public static OrderLineItem toOrderLineItem(OrderLineItemDto orderLineItemDto) {
        return OrderLineItem.builder()
                .skuCode(orderLineItemDto.getSkuCode())
                .quantity(orderLineItemDto.getQuantity())
                .build();
    }

    public static OrderLineItemDto toOrderLineItemDto(OrderLineItem orderLineItem) {
        return OrderLineItemDto.builder()
                .skuCode(orderLineItem.getSkuCode())
                .quantity(orderLineItem.getQuantity())
                .build();
    }

    public static InventoryItemRequest toInventoryItemRequest(OrderLineItemDto orderLineItemDto) {
        return InventoryItemRequest.builder()
                .skuCode(orderLineItemDto.getSkuCode())
                .quantity(orderLineItemDto.getQuantity())
                .build();
    }
}
