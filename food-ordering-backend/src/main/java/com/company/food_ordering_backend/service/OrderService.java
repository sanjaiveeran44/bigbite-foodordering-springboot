package com.company.food_ordering_backend.service;

import com.company.food_ordering_backend.dao.*;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final CartDAO cartDAO;
    private final InventoryDAO inventoryDAO;
    private final OrderDAO orderDAO;
    private final OrderItemDAO orderItemDAO;
    private final PaymentDAO paymentDAO;
    private final PaymentService paymentService;
    private final TransactionTemplate transactionTemplate;

    public OrderService(
            CartDAO cartDAO,
            InventoryDAO inventoryDAO,
            OrderDAO orderDAO,
            OrderItemDAO orderItemDAO,
            PaymentDAO paymentDAO,
            PaymentService paymentService,
            DataSourceTransactionManager txManager
    ) {
        this.cartDAO = cartDAO;
        this.inventoryDAO = inventoryDAO;
        this.orderDAO = orderDAO;
        this.orderItemDAO = orderItemDAO;
        this.paymentDAO = paymentDAO;
        this.paymentService = paymentService;
        this.transactionTemplate = new TransactionTemplate(txManager);
    }

    public void checkout(Long userId) {
        transactionTemplate.executeWithoutResult(status -> {

            List<Map<String, Object>> cartItems = cartDAO.getCartItems(userId);
            if (cartItems.isEmpty()) {
                throw new RuntimeException("Cart is empty");
            }

            double total = 0;

            for (Map<String, Object> item : cartItems) {
                Long menuItemId = ((Number) item.get("menu_item_id")).longValue();
                int qty = ((Number) item.get("quantity")).intValue();
                double price = ((Number) item.get("price")).doubleValue();

                System.out.println(" ************** Processing item: " + menuItemId + " qty: " + qty + " price: ***********" + price);

                int available = inventoryDAO.getQuantityForUpdate(menuItemId);
                if (available < qty) {
                    throw new RuntimeException("Insufficient stock");
                }

                total += qty * price;
            }

            String paymentId = paymentService.charge(total);
            Long orderId = orderDAO.createOrder(userId, total);

            for (Map<String, Object> item : cartItems) {
                Long menuItemId = ((Number) item.get("menu_item_id")).longValue();
                int qty = ((Number) item.get("quantity")).intValue();
                double price = ((Number) item.get("price")).doubleValue();

                orderDAO.addOrderItem(orderId, menuItemId, qty, price);
                inventoryDAO.updateQuantity(menuItemId, qty);
            }

            paymentDAO.savePayment(orderId, paymentId, total);

            cartDAO.clearCart(userId);
        });
    }
    public void cancelOrder(Long userId, Long orderId) {
        transactionTemplate.executeWithoutResult(status -> {

            String currentStatus = orderDAO.getOrderStatus(orderId);

            if (!"PLACED".equals(currentStatus)) {
                throw new RuntimeException("Order cannot be cancelled at this stage");
            }

            var orderItems = orderItemDAO.findItemsByOrder(orderId);
            for (var item : orderItems) {
                Long menuItemId = ((Number) item.get("menu_item_id")).longValue();
                int qty = ((Number) item.get("quantity")).intValue();
                inventoryDAO.restoreQuantity(menuItemId, qty);
            }

            orderDAO.updateOrderStatus(orderId, "CANCELLED");
        });
    }

}
