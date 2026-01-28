package com.company.food_ordering_backend.controller;

import com.company.food_ordering_backend.model.MenuItem;
import com.company.food_ordering_backend.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<MenuItem> getMenu() {
        return menuService.getAvailableMenu();
    }

    @PostMapping
    public void addMenuItem(@RequestBody AddMenuRequest request) {
        menuService.addMenuItem(
                request.getName(),
                request.getPrice(),
                request.getQuantity()
        );
    }
}
