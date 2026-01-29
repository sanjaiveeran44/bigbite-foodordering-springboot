package com.company.food_ordering_backend.controller;

import com.company.food_ordering_backend.dao.CartDAO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartDAO cartDAO;

    public CartController(CartDAO cartDAO) {
        this.cartDAO = cartDAO;
    }

    @PostMapping("/add")
    public void addToCart(@RequestBody AddToCartRequest request) {
        System.out.println("Add to cart request:");
        System.out.println("UserId: " + request.getUserId());
        System.out.println("MenuItemId: " + request.getMenuItemId());
        System.out.println("Quantity: " + request.getQuantity());
        
        cartDAO.addToCart(
                request.getUserId(),
                request.getMenuItemId(),
                request.getQuantity()
        );
    }
}
