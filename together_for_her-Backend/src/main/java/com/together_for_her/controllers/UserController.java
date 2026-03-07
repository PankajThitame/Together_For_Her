package com.together_for_her.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.together_for_her.entities.RegisterUserRequest;
import com.together_for_her.paylods.ApiResponse;
import com.together_for_her.paylods.RequestDto;
import com.together_for_her.paylods.UserCredentialsDto;
import com.together_for_her.paylods.UserDto;
import com.together_for_her.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")

public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<RegisterUserRequest> createUser(@Valid @RequestBody RegisterUserRequest user) {
		RegisterUserRequest createUserDto = this.userService.createUser(user);
		return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto,
			@PathVariable("userId") Integer uid) {
		UserDto updateUser = this.userService.updateUser(userDto, uid);
		return ResponseEntity.ok(updateUser);
	}

	@PutMapping("/{userId}/status")
	public ResponseEntity<ApiResponse> updateUserStatus(@PathVariable("userId") Integer uid,
			@RequestBody java.util.Map<String, String> payload) {
		this.userService.updateUserStatus(uid, payload.get("status"));
		return new ResponseEntity<>(new ApiResponse("User status updated successfully", true), HttpStatus.OK);
	}

	@GetMapping("/count")
	public ResponseEntity<UserDto> getUserCounts() {
		UserDto counts = userService.countUsers(new UserDto());
		return ResponseEntity.ok(counts);
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable("userId") Integer uid) {
		this.userService.deleteUser(uid);
		return new ResponseEntity(new ApiResponse("User Deleated Successfully", true), HttpStatus.OK);
	}

	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsers() {
		return ResponseEntity.ok(this.userService.getAllUsers());
	}

	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable Integer userId) {
		return ResponseEntity.ok(this.userService.getUserById(userId));
	}

	@GetMapping("/stats")
	public ResponseEntity<Map<String, Long>> getUserStats() {
		return ResponseEntity.ok(this.userService.getUserStatistics());
	}

	@PostMapping("/profile-photo/{userId}")
	public ResponseEntity<UserDto> uploadProfilePhoto(@PathVariable Integer userId,
			@org.springframework.web.bind.annotation.RequestParam("file") org.springframework.web.multipart.MultipartFile file)
			throws java.io.IOException {
		UserDto updatedUser = this.userService.uploadProfilePhoto(userId, file);
		return ResponseEntity.ok(updatedUser);
	}

}
