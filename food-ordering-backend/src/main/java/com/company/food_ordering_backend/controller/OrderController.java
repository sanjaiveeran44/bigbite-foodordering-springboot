package com.company.food_ordering_backend.controller;

import com.company.food_ordering_backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout/{userId}")
    public void checkout(@PathVariable Long userId) {
        orderService.checkout(userId);
    }
}
