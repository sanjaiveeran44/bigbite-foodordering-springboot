package com.company.food_ordering_backend.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class InventoryDAO{
    private final JdbcTemplate jdbcTemplate;
    
    public InventoryDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createInventory(Long menuItemId, int quantity) {
        String sql = """
                INSERT INTO inventory (menu_item_id, quantity)
                VALUES (?, ?)
                """;
        jdbcTemplate.update(sql, menuItemId, quantity);
    }

    public int getAvailableQuantity(Long menuItemId) {
        String sql = """
                SELECT quantity
                FROM inventory
                WHERE menu_item_id = ?
                """;
        return jdbcTemplate.queryForObject(sql, Integer.class, menuItemId);
    }
    public void updateQuantity(Long menuItemId, int quantity) {
        String sql = """
            UPDATE inventory
            SET quantity = quantity - ?
            WHERE menu_item_id = ?
        """;
        jdbcTemplate.update(sql, quantity, menuItemId);
    }

    public int getQuantityForUpdate(Long menuItemId) {
        String sql = """
            SELECT quantity
            FROM inventory
            WHERE menu_item_id = ?
            FOR UPDATE
        """;
        return jdbcTemplate.queryForObject(sql, Integer.class, menuItemId);
    }

}
