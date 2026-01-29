package com.company.food_ordering_backend.controller;

public class AddToCartRequest {

    private Long userId;
    private Long menuItemId;
    private int quantity;

    public Long getUserId() {
        return userId;
    }

    public Long getMenuItemId() {
        return menuItemId;
    }

    public int getQuantity() {
        return quantity;
    }
}
