package com.together_for_her.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.together_for_her.entities.Request;
import com.together_for_her.paylods.RequestDto;
import com.together_for_her.services.RequestService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")

public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // ✅ Create Request (User)
    @PostMapping("/{userId}")
    public ResponseEntity<String> createRequest(
            @PathVariable Integer userId,
            @RequestBody RequestDto requestDto) {

        try {
            requestService.createRequest(userId, requestDto);
            return ResponseEntity.ok("Kit request submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<RequestDto> getRequestCounts() {
        RequestDto counts = requestService.countRequests(new RequestDto());
        return ResponseEntity.ok(counts);
    }

    // ✅ Get Requests by User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request>> getUserRequests(@PathVariable Integer userId) {
        return ResponseEntity.ok(requestService.getUserRequests(userId));
    }

    // ✅ Get All Requests (Admin)
    @GetMapping
    public ResponseEntity<List<RequestDto>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    // ✅ Approve/Reject Request (Admin)
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateRequestStatus(@PathVariable Integer id, @RequestBody Map<String, String> payload) {
        requestService.updateStatus(id, payload.get("status"));
        return ResponseEntity.ok("Request status updated successfully");
    }
}

