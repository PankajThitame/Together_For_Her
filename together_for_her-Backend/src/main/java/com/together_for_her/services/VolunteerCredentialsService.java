package com.together_for_her.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import com.together_for_her.entities.UserCredentials;
import com.together_for_her.repos.UserCredentialsRepo;

import jakarta.servlet.http.HttpSession;

public class VolunteerCredentialsService {

		@Autowired
		private UserCredentialsRepo userRepository;

		public boolean findById(UserCredentials VolunteerDto) {
			UserCredentials usercred = this.userRepository.findByUsername(VolunteerDto.getUsername());

			if (usercred.getUsername().equals(VolunteerDto.getUsername())) {
				if (usercred.getPassword().equals(VolunteerDto.getPassword())) {

					return true;
				}
			}
				UserCredentials newUser = new UserCredentials();
				newUser.setUsername(VolunteerDto.getUsername());
				newUser.setPassword(VolunteerDto.getPassword()); // Stored as plain text (not recommended)
				newUser.setRole(VolunteerDto.getRole()); // Default role
				userRepository.save(newUser);
				return false;
			
		}

		public String authenticateUser(String username, String password, HttpSession session) {
	        // Example: Validate user from DB (replace with actual authentication logic)
	        if ("admin".equals(username) && "password".equals(password)) {
	            String token = UUID.randomUUID().toString(); // Generate a random token
	            session.setAttribute("authToken", token);   // Store in session
	            return token; // Return token to frontend
	        }
	        return null;
		}

	}

