package com.company.food_ordering_backend.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDAO {

    private final JdbcTemplate jdbcTemplate;

    public OrderDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Long createOrder(Long userId, double totalAmount) {
        String sql = """
            INSERT INTO orders (user_id, total_amount, status)
            VALUES (?, ?, 'PLACED')
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
}
