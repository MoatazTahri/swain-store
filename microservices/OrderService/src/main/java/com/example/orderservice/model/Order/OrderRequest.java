package com.example.orderservice.model.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderRequest {
    private Long customerId;
    private List<OrderLineItemDto> orderLineItemsDto;
}
