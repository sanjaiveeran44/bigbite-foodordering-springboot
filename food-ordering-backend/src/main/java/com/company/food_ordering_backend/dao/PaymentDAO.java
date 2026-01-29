package com.company.food_ordering_backend.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PaymentDAO {

    private final JdbcTemplate jdbcTemplate;

    public PaymentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void savePayment(Long orderId, String paymentId, double amount) {
        String sql = """
            INSERT INTO payments (order_id, payment_id, amount, status)
            VALUES (?, ?, ?, 'COMPLETED')
        """;
        jdbcTemplate.update(sql, orderId, paymentId, amount);
    }
}