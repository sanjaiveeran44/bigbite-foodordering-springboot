package com.company.food_ordering_backend.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class OrderItemDAO {

    private final JdbcTemplate jdbcTemplate;

    public OrderItemDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> findItemsByOrder(Long orderId) {
        String sql = """
            SELECT menu_item_id, quantity
            FROM order_items
            WHERE order_id = ?
        """;
        return jdbcTemplate.queryForList(sql, orderId);
    }
}
