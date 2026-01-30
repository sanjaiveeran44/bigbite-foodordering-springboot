package com.company.food_ordering_backend.controller;

import com.company.food_ordering_backend.dao.OrderDAO;
import com.company.food_ordering_backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final OrderDAO orderDAO;

    public OrderController(OrderService orderService, OrderDAO orderDAO) {
        this.orderService = orderService;
        this.orderDAO = orderDAO;
    }

    @PostMapping("/checkout/{userId}")
    public void checkout(@PathVariable Long userId) {
        orderService.checkout(userId);
    }
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getUserOrders(@PathVariable Long userId) {
        return orderDAO.findOrdersByUser(userId);
    }

    @PostMapping("/{orderId}/cancel")
    public void cancelOrder(
            @PathVariable Long orderId,
            @RequestParam Long userId
    ) {
        orderService.cancelOrder(userId, orderId);
    }

}
