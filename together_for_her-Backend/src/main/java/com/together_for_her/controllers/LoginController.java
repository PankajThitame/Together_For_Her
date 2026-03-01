package com.together_for_her.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.together_for_her.entities.UserCredentials;
import com.together_for_her.paylods.UserCredentialsDto;
import com.together_for_her.repos.UserCredentialsRepo;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")

public class LoginController {

    @Autowired
    UserCredentialsRepo urepo;

    @PostMapping("/login-user")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentialsDto request) {
        Map<String, Object> response = new HashMap<>();

        System.out.println("DEBUG: Login attempt for username: [" + request.getUsername() + "]");

        // Find user by username
        UserCredentials user = urepo.findByUsername(request.getUsername());

        if (user == null) {
            System.out.println("DEBUG: User not found in database: [" + request.getUsername() + "]");
        } else {
            System.out.println("DEBUG: User found. DB Password: [" + user.getPassword() + "] | Req Password: ["
                    + request.getPassword() + "]");

            if (user.getPassword().equals(request.getPassword())) {
                System.out.println("DEBUG: Password match successful!");
                String token = generateSessionToken(); // Generate a token

                // Send only required user details (excluding password)
                Map<String, Object> userData = new HashMap<>();

                if (user.getUser() != null) {
                    userData.put("id", user.getUser().getId());
                    userData.put("name", user.getUser().getFirstName());
                } else if (user.getVolunteer() != null) {
                    userData.put("id", user.getVolunteer().getId());
                    userData.put("name", user.getVolunteer().getName());
                } else {
                    userData.put("id", user.getId());
                    userData.put("name", user.getUsername());
                }

                userData.put("username", user.getUsername());
                userData.put("role", user.getRole());

                response.put("token", token);
                response.put("success", true);
                response.put("message", "Login successful!");
                response.put("user", userData); // Send safe user details

                return ResponseEntity.ok(response);
            } else {
                System.out.println("DEBUG: Password mismatch for user: [" + request.getUsername() + "]");
            }
        }

        response.put("success", false);
        response.put("message", "Invalid credentials!");
        return ResponseEntity.status(401).body(response);
    }

    private String generateSessionToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[24]; // 24 bytes = 32 characters in Base64
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
