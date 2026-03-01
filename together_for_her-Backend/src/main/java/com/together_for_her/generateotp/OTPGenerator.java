//package com.together_for_her.generateotp;
//import java.util.Random;
//
//import com.together_for_her.services.Fast2SMSService;
//
//public class OTPGenerator {
//    public static String generateOTP(int length) {
//        Random random = new Random();
//        StringBuilder otp = new StringBuilder();
//
//        for (int i = 0; i < length; i++) {
//            otp.append(random.nextInt(10)); // Generate random digits (0-9)
//        }
//        return otp.toString();
//    }
//
//    public static void main(String[] args) {
//        String otp = generateOTP(6);
//        System.out.println("Generated OTP: " + otp);
//        
//        Fast2SMSService.sendSMS("9767560224", "Your OTP is: " + otp);
//    }
//}
