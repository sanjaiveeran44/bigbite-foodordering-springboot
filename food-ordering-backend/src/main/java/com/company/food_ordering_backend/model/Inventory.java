package com.company.foodorder.model;

public class Inventory {

    private Long menuItemId;
    private int quantity;

    public Inventory(Long menuItemId, int quantity) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
    }

    public Long getMenuItemId() {
        return menuItemId;
    }

    public int getQuantity() {
        return quantity;
    }
}
