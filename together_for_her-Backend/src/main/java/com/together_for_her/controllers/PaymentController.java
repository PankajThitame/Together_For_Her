package com.together_for_her.controllers;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    @PostMapping("/create")
    public String createOrder(@RequestBody Map<String, Integer> request) {
        try {
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", request.get("amount") * 1); // In paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_12345");

            Order order = client.orders.create(orderRequest);
            return order.toString();
        } catch (Exception e) {
            return "{\"error\":\"" + e.getMessage() + "\"}";
        }
    }
}
