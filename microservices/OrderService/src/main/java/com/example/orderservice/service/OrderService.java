package com.example.orderservice.service;

import com.example.orderservice.enumeration.OrderStatus;
import com.example.orderservice.model.Order.OrderRequest;

public interface OrderService {
    void placeOrder(OrderRequest orderRequest);
    void changeOrderStatus(String orderNumber, OrderStatus orderStatus);
}
