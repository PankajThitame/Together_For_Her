package com.together_for_her.services;

import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class PaymentService {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    public String createOrder(int amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);  // Amount in paise (INR 1 = 100 paise)
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_123456");

        Order order = client.orders.create(orderRequest);
        return order.toString(); // Return the order details (ID, amount, etc.)
    }

    public boolean validateSignature(String orderId, String paymentId, String razorpaySignature) {
        try {
            String payload = orderId + "|" + paymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256"));
            byte[] calculatedSignature = mac.doFinal(payload.getBytes());
            String expectedSignature = Base64.getEncoder().encodeToString(calculatedSignature);
            return expectedSignature.equals(razorpaySignature);
        } catch (Exception e) {
            return false;
        }
    }

}
