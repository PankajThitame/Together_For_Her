package com.together_for_her.controllers;

import com.together_for_her.services.TwilioOTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
public class OTPController {

    @Autowired
    private TwilioOTPService otpService;

    @PostMapping("/send")
    public String sendOtp(@RequestParam String phoneNumber) {
        otpService.sendOtp(phoneNumber);
        return "OTP sent successfully to " + phoneNumber;
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String otp) {
        boolean isValid = otpService.verifyOtp(otp);
        return isValid ? "OTP Verified Successfully!" : "Invalid OTP. Please try again.";
    }
}
