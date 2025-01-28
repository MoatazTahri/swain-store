package com.example.orderservice.controller;

import com.example.orderservice.enumeration.OrderStatus;
import com.example.orderservice.model.Order.OrderRequest;
import com.example.orderservice.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public void placeOrder(@RequestBody OrderRequest orderRequest) {
        orderService.placeOrder(orderRequest);
    }

    @PostMapping("/pending-order")
    @ResponseStatus(HttpStatus.OK)
    public void pendingOrder(@RequestParam("order_number") String orderNumber) {
        orderService.changeOrderStatus(orderNumber, OrderStatus.PENDING);
    }

    @PostMapping("/processing-order")
    @ResponseStatus(HttpStatus.OK)
    public void processingOrder(@RequestParam("order_number") String orderNumber) {
        orderService.changeOrderStatus(orderNumber, OrderStatus.PROCESSING);
    }

    @PostMapping("/cancel-order")
    @ResponseStatus(HttpStatus.OK)
    public void cancelOrder(@RequestParam("order_number") String orderNumber) {
        orderService.changeOrderStatus(orderNumber, OrderStatus.CANCELLED);
    }

    @PostMapping("/order-shipped")
    @ResponseStatus(HttpStatus.OK)
    public void shippingOrder(@RequestParam("order_number") String orderNumber) {
        orderService.changeOrderStatus(orderNumber, OrderStatus.SHIPPED);
    }

    @PostMapping("/order-delivered")
    @ResponseStatus(HttpStatus.OK)
    public void deliveringOrder(@RequestParam("order_number") String orderNumber) {
        orderService.changeOrderStatus(orderNumber, OrderStatus.DELIVERED);
    }
}
