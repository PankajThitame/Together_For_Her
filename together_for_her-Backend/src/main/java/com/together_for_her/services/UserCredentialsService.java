package com.together_for_her.services;

import com.together_for_her.paylods.UserCredentialsDto;
import com.together_for_her.paylods.VolunteerDto;
import com.together_for_her.entities.UserCredentials;
import com.together_for_her.entities.Volunteer;
import com.together_for_her.enums.Role;
import com.together_for_her.exceptions.ResourceNotFoundException;
import com.together_for_her.repos.UserCredentialsRepo;

import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Configuration
@Service
public class UserCredentialsService {

	@Autowired
	private UserCredentialsRepo userRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	public boolean findById(UserCredentials userDTO) {
		UserCredentials usercred = this.userRepository.findByUsername(userDTO.getUsername());

		if (usercred.getUsername().equals(userDTO.getUsername())) {
			if (usercred.getPassword().equals(userDTO.getPassword())) {

				return true;
			}
		}
			UserCredentials newUser = new UserCredentials();
			newUser.setUsername(userDTO.getUsername());
			newUser.setPassword(userDTO.getPassword()); // Stored as plain text (not recommended)
			newUser.setRole(userDTO.getRole()); // Default role
			userRepository.save(newUser);
			return false;
		
	}
	
	public List<UserCredentialsDto> getUserRoles() {
List<UserCredentials> users=this.userRepository.findAll();
		
		List<UserCredentialsDto> userDto=users.stream().map(user->this.modelMapper.map(user, UserCredentialsDto.class)).collect(Collectors.toList());
		
		return userDto;
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
