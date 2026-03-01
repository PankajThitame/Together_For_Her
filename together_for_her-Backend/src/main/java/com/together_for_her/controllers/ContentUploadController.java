// ContentUploadController.java
package com.together_for_her.controllers;

import com.together_for_her.entities.UserContent;
import com.together_for_her.repos.UserContentRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/upload")
public class ContentUploadController {

    private final UserContentRepository contentRepository;

    // Ensure the upload directory is defined and created
    private final Path uploadDir = Paths.get("D:/uploads");

    public ContentUploadController(UserContentRepository contentRepository) throws IOException {
        this.contentRepository = contentRepository;
        // Ensure the upload directory exists
        Files.createDirectories(uploadDir);
    }

    // Upload file endpoint
    @PostMapping
    public ResponseEntity<?> uploadFile(
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("file") MultipartFile file,
            @RequestParam("uploadedBy") String uploadedBy) {
        try {
            // Create a unique filename using timestamp
            String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            // Resolve path safely
            Path filePath = uploadDir.resolve(uniqueFileName).normalize();

            // Save the file to the directory
            file.transferTo(filePath.toFile());

            // Save metadata to database
            UserContent content = new UserContent();
            content.setTitle(title);
            content.setDescription(description);
            content.setFilePath(uniqueFileName);
            content.setFileType(file.getContentType());
            content.setUploadTime(LocalDateTime.now());
            content.setUploadedBy(uploadedBy);

            contentRepository.save(content);

            // Return success response
            return ResponseEntity.ok("File uploaded successfully: /api/upload/" + uniqueFileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("File upload failed: " + e.getMessage());
        }
    }

    // Serve uploaded files
    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            // Resolve the file path and prevent path traversal
            Path filePath = uploadDir.resolve(filename).normalize();
            if (!filePath.startsWith(uploadDir)) {
                return ResponseEntity.badRequest().body(null);
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            // Dynamically detect content type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
