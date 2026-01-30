package com.company.food_ordering_backend.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class OrderDAO {

    private final JdbcTemplate jdbcTemplate;

    public OrderDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Long createOrder(Long userId, double totalAmount) {
        String sql = """
            INSERT INTO orders (user_id, total_amount, status)
            VALUES (?, ?, 'PROCESSING')
        """;
        jdbcTemplate.update(sql, userId, totalAmount);

        return jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);
    }

    public void addOrderItem(Long orderId, Long menuItemId, int quantity, double price) {
        String sql = """
            INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_purchase)
            VALUES (?, ?, ?, ?)
        """;
        jdbcTemplate.update(sql, orderId, menuItemId, quantity, price);
    }

    public void updateOrderStatus(Long orderId, String status) {
        String sql = """
            UPDATE orders
            SET status = ?
            WHERE id = ?
        """;
        jdbcTemplate.update(sql, status, orderId);
    }
    public List<Map<String, Object>> findOrdersByUser(Long userId) {
        String sql = """
            SELECT id, total_amount, status, created_at
            FROM orders
            WHERE user_id = ?
            ORDER BY created_at DESC
        """;
        return jdbcTemplate.queryForList(sql, userId);
    }

    public String getOrderStatus(Long orderId) {
        String sql = """
            SELECT status
            FROM orders
            WHERE id = ?
        """;
        return jdbcTemplate.queryForObject(sql, String.class, orderId);
    }

}
