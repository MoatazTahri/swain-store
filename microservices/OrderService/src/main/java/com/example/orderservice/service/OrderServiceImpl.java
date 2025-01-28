package com.example.orderservice.service;

import com.example.orderservice.consumer.InventoryApiConsumer;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderLineItem;
import com.example.orderservice.enumeration.OrderStatus;
import com.example.orderservice.exception.OrderNotFoundException;
import com.example.orderservice.mapper.OrderLineItemMapper;
import com.example.orderservice.model.Inventory.InventoryItemRequest;
import com.example.orderservice.model.Order.OrderRequest;
import com.example.orderservice.repository.OrderRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Log4j2
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final InventoryApiConsumer inventoryApiConsumer;

    @Transactional
    @Override
    public void placeOrder(OrderRequest orderRequest) {
        // Retrieving the items demanded to place an order.
        List<OrderLineItem> orderLineItems = orderRequest.getOrderLineItemsDto()
                .stream()
                .map(OrderLineItemMapper::toOrderLineItem)
                .toList();
        // Creating the order.
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setCustomerId(orderRequest.getCustomerId());
        order.setOrderItems(orderLineItems);
        order.setStatus(OrderStatus.PENDING);
        order.setDate(new Date());
        // Mapping the ordered items to match the Inventory API requests
        // for the goal of checking their availability.
        List<InventoryItemRequest> orderedItems = orderRequest.getOrderLineItemsDto()
                .stream()
                .map(OrderLineItemMapper::toInventoryItemRequest)
                .toList();
        // Handling the products' existence.
        List<String> productsOutOfStock = inventoryApiConsumer.getProductsOutOfStock(orderRequest);
        if (productsOutOfStock.isEmpty()) {
            inventoryApiConsumer.decreaseQuantity(orderedItems);
            orderRepository.save(order);
            log.info("Order Created Successfully");
        } else {
            log.error("Products are out of stock {}", productsOutOfStock);
            throw new IllegalStateException("One or many products are out of stock");
        }
    }

    @Transactional
    @Override
    public void changeOrderStatus(String orderNumber, OrderStatus orderStatus) {
        Order order = orderRepository.findByOrderNumber(orderNumber);
        if (order == null) {
            throw new OrderNotFoundException("Order not found: " + orderNumber);
        }
        order.setStatus(orderStatus);
        orderRepository.save(order);
    }


}
