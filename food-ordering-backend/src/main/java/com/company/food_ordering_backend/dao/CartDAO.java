package com.company.food_ordering_backend.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CartDAO {

    private final JdbcTemplate jdbcTemplate;

    public CartDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addToCart(Long userId, Long menuItemId, int quantity) {        
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (menuItemId == null) {
            throw new IllegalArgumentException("Menu Item ID cannot be null");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }
        
        String sql = """
            INSERT INTO cart (user_id, menu_item_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
        """;
        jdbcTemplate.update(sql, userId, menuItemId, quantity);
    }

    public List<Map<String, Object>> getCartItems(Long userId) {
        String sql = """
            SELECT c.menu_item_id, c.quantity, m.price
            FROM cart c
            JOIN menu_items m ON c.menu_item_id = m.id
            WHERE c.user_id = ?
        """;
        return jdbcTemplate.queryForList(sql, userId);
    }

    public void clearCart(Long userId) {
        jdbcTemplate.update("DELETE FROM cart WHERE user_id = ?", userId);
    }
}
