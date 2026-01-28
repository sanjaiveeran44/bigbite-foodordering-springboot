package com.company.food_ordering_backend.service;

import com.company.food_ordering_backend.dao.InventoryDAO;
import com.company.food_ordering_backend.dao.MenuItemDAO;
import com.company.food_ordering_backend.model.MenuItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    private final MenuItemDAO menuItemDAO;
    private final InventoryDAO inventoryDAO;

    public MenuService(MenuItemDAO menuItemDAO, InventoryDAO inventoryDAO) {
        this.menuItemDAO = menuItemDAO;
        this.inventoryDAO = inventoryDAO;
    }

    public List<MenuItem> getAvailableMenu() {
        return menuItemDAO.findActiveMenuItems();
    }

    public void addMenuItem(String name, double price, int quantity) {
        Long menuItemId = menuItemDAO.createMenuItem(name, price);
        inventoryDAO.createInventory(menuItemId, quantity);
    }
}
