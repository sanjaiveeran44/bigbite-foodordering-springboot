package com.company.food_ordering_backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {

    public String charge(double amount) {
        if (amount > 5000) {
            throw new RuntimeException("Payment failed: limit exceeded");
        }
        return "PAY_" + UUID.randomUUID();
    }
}
