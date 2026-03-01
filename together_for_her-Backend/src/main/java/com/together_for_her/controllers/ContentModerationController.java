package com.together_for_her.controllers;

import com.together_for_her.entities.UserContent;
import com.together_for_her.repos.UserContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/content")

public class ContentModerationController {

    @Autowired
    private UserContentRepository contentRepository;

    @GetMapping("/pending")
    public ResponseEntity<List<UserContent>> getPendingContent() {
        return ResponseEntity.ok(contentRepository.findByStatus("PENDING"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserContent>> getAllContent() {
        return ResponseEntity.ok(contentRepository.findAll());
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<String> approveContent(@PathVariable Long id) {
        UserContent content = contentRepository.findById(id).orElse(null);
        if (content != null) {
            content.setStatus("APPROVED");
            contentRepository.save(content);
            return ResponseEntity.ok("Content approved");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<String> rejectContent(@PathVariable Long id) {
        UserContent content = contentRepository.findById(id).orElse(null);
        if (content != null) {
            content.setStatus("REJECTED");
            contentRepository.save(content);
            return ResponseEntity.ok("Content rejected");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/approved")
    public ResponseEntity<List<UserContent>> getApprovedContent() {
        return ResponseEntity.ok(contentRepository.findByStatus("APPROVED"));
    }

    @GetMapping("/user/{username:.+}")
    public ResponseEntity<List<UserContent>> getByUser(@PathVariable String username) {
        return ResponseEntity.ok(contentRepository.findByUploadedBy(username));
    }

    @org.springframework.beans.factory.annotation.Value("${file.upload-dir}")
    private String uploadDir;

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContent(@PathVariable Long id) {
        UserContent content = contentRepository.findById(id).orElse(null);
        if (content != null) {
            try {
                Path filePath = Paths.get(uploadDir).resolve(content.getFilePath()).normalize();
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
            contentRepository.delete(content);
            return ResponseEntity.ok("Content deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        long pending = contentRepository.findByStatus("PENDING").size();
        long approved = contentRepository.findByStatus("APPROVED").size();
        return ResponseEntity.ok(Map.of("pendingPosts", pending, "approvedPosts", approved));
    }
}
