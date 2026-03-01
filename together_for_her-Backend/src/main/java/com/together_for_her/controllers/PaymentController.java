package com.together_for_her.controllers;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Integer> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            System.out.println("DEBUG: Creating Razorpay Order for amount: " + request.get("amount"));

            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", request.get("amount")); // amount is already in paise from frontend
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = client.orders.create(orderRequest);

            // Convert Order object to a Map so Spring Boot serializes it as a proper JSON
            // Object
            Map<String, Object> orderMap = new HashMap<>();
            orderMap.put("id", order.get("id"));
            orderMap.put("amount", order.get("amount"));
            orderMap.put("currency", order.get("currency"));
            orderMap.put("status", order.get("status"));

            System.out.println("DEBUG: Razorpay Order created: " + order.get("id"));
            return ResponseEntity.ok(orderMap);
        } catch (Exception e) {
            System.err.println("ERROR: Razorpay Order Creation Failed: " + e.getMessage());
            response.put("error", e.getMessage());
            response.put("success", false);
            return ResponseEntity.status(500).body(response);
        }
    }
}
