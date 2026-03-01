package com.together_for_her.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.together_for_her.entities.Feedback;
import com.together_for_her.paylods.FeedbackDto;
import com.together_for_her.services.FeedbackService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;

@RestController
@RequestMapping("/api")

public class FeedbackController {

	@Autowired
	private FeedbackService fService;

	@PostMapping("/user/{userId}/review")
	public ResponseEntity<FeedbackDto> createUserFeedback(@RequestBody FeedbackDto fDto, @PathVariable Integer userId) {
		FeedbackDto createFB = this.fService.createFeedbackFromUser(fDto, userId);
		return new ResponseEntity<FeedbackDto>(createFB, HttpStatus.CREATED);
	}

	@PostMapping("/donor/{donorId}/review")
	public ResponseEntity<FeedbackDto> createDonorFeedback(@RequestBody FeedbackDto fDto,
			@PathVariable Integer donorId) {
		FeedbackDto createFB = this.fService.createFeedbackFromDonor(fDto, donorId);
		return new ResponseEntity<FeedbackDto>(createFB, HttpStatus.CREATED);
	}

	@PutMapping("/response/{userId}")
	public ResponseEntity<FeedbackDto> createResponse(@RequestBody FeedbackDto fDto, @PathVariable Integer userId) {
		FeedbackDto updateUser = this.fService.updateResponse(fDto, userId);
		return ResponseEntity.ok(updateUser);
	}

	@PostMapping(value = "/user/{userId}/review/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> saveFeedbackContent(
			@PathVariable Integer userId,
			@RequestParam("file") MultipartFile file,
			@RequestParam(value = "message", required = false) String message) {
		try {
			Feedback savedFeedback = fService.saveFeedbackContent(file, userId,
					message != null ? message : "No message provided");
			return ResponseEntity.ok("Content uploaded successfully. ID: " + savedFeedback.getId());
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Content upload failed: " + e.getMessage());
		}
	}

	// Fetch All Media Files
	@GetMapping("reviews/media")
	public ResponseEntity<List<Feedback>> getAllMediaFiles() {
		return ResponseEntity.ok(fService.getAllMediaFiles());
	}

	@GetMapping("/count")
	public ResponseEntity<FeedbackDto> getUserCounts() {
		FeedbackDto counts = fService.countFeedback(new FeedbackDto());
		return ResponseEntity.ok(counts);
	}

	@GetMapping("/files/{filename}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
		Path file = Paths.get("D:/uploads/").resolve(filename).normalize();
		Resource resource = new UrlResource(file.toUri());

		if (resource.exists()) {
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
					.header("X-Frame-Options", "ALLOWALL") // ✅ allow this to be embedded
					.contentType(MediaType.APPLICATION_PDF)
					.body(resource);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("reviews/get/{donorId}")
	public ResponseEntity<List<FeedbackDto>> findAllByUserId(@PathVariable Integer donorId) {
		List<FeedbackDto> fb = this.fService.getFeedbackById(donorId);
		return new ResponseEntity<List<FeedbackDto>>(fb, HttpStatus.OK);
	}

	@GetMapping("reviews/get/all")
	public ResponseEntity<List<FeedbackDto>> getAllFeedback() {
		List<FeedbackDto> fb = this.fService.getAllFeedback();
		return new ResponseEntity<List<FeedbackDto>>(fb, HttpStatus.OK);
	}
}
