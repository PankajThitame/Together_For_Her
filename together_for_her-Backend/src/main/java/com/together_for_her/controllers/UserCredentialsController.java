package com.together_for_her.controllers;

import com.together_for_her.entities.UserCredentials;
import com.together_for_her.exceptions.ResourceNotFoundException;
import com.together_for_her.paylods.UserCredentialsDto;
import com.together_for_her.paylods.UserDto;
import com.together_for_her.repos.UserCredentialsRepo;
import com.together_for_her.services.UserCredentialsService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class UserCredentialsController {

	@Autowired
	private UserCredentialsService userService;

	@Autowired
	private UserCredentialsRepo userCredentialsRepo;

//	@PostMapping("/register")
//	public ResponseEntity<?> registerUser(@RequestBody UserCredentials request, int username) {
//		if (userService.findById(request)) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
//		}
//		userService.findById(request);
//		return ResponseEntity.ok("User registered successfully");
//	}

	@PostMapping("/login/{role}")
	public ResponseEntity<?> login(@Valid @RequestBody UserCredentialsDto loginDTO,@PathVariable("role") String role) {

		UserCredentials obj = userCredentialsRepo.findByUsername(loginDTO.getUsername());
	    System.out.println("Login API called"); // Check if the method is executed

		if (obj!=null) {
			
			if (obj.getPassword().equals(loginDTO.getPassword())) {
				return ResponseEntity.ok("Login Successful  "+obj.getRole()+"  "+role);
			}
			return ResponseEntity.badRequest().body("Password missmatch..!");
		}
		return ResponseEntity.badRequest().body("Username or Password missing..!");
	}
	
	@GetMapping("/get/roles")
	public ResponseEntity<List<UserCredentialsDto>> getAllUserRoles()
	{
		return ResponseEntity.ok(this.userService.getUserRoles());
	}
}
