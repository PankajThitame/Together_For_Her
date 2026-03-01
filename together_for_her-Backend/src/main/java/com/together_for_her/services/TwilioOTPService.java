package com.together_for_her.services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class TwilioOTPService {

    @Value("${twilio.account_sid}")
    private String accountSid;

    @Value("${twilio.auth_token}")
    private String authToken;

    @Value("${twilio.phone_number}")
    private String twilioPhoneNumber;

    // Store OTP (in real-world apps, use Redis or DB)
    private String generatedOtp;

    public void sendOtp(String userPhoneNumber) {
        Twilio.init(accountSid, authToken);
        
        if (!userPhoneNumber.startsWith("+")) {
            userPhoneNumber = "+91" + userPhoneNumber; // Add country code if missing
        }
        
        // Generate a 6-digit OTP
        generatedOtp = String.format("%06d", new Random().nextInt(999999));

        String messageBody = "Your OTP is: " + generatedOtp;

        Message.creator(
                new com.twilio.type.PhoneNumber(userPhoneNumber), // Receiver
                new com.twilio.type.PhoneNumber(twilioPhoneNumber), // Twilio Number
                messageBody
        ).create();

        System.out.println("OTP Sent: " + generatedOtp);
    }

    public boolean verifyOtp(String enteredOtp) {
        return generatedOtp != null && generatedOtp.equals(enteredOtp);
    }
}
