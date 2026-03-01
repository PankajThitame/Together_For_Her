package com.together_for_her.services.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.together_for_her.entities.RegisterUserRequest;
import com.together_for_her.entities.User;
import com.together_for_her.entities.UserCredentials;
import com.together_for_her.paylods.UserDto;
import com.together_for_her.repos.UserCredentialsRepo;
import com.together_for_her.repos.UserRepo;
import com.together_for_her.exceptions.*;
import com.together_for_her.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserCredentialsRepo userCredentialsRepository;

	@Override
	public RegisterUserRequest createUser(RegisterUserRequest userReq) {

		User user = this.dtoToUser(userReq.getUser());
		UserCredentials userCred = this.modelMapper.map(userReq.getCredentials(), UserCredentials.class);

		User saveUser = this.userRepo.save(user);
		userCred.setUser(user);
		userCred.setVolunteer(null);
		UserCredentials saveUserCred = this.userCredentialsRepository.save(userCred);

		return userReq;
	}

	public UserDto countUsers(UserDto userDto) {
		long totalUsers = userRepo.count();
		long pendingApprovals = userRepo.countByStatus("PENDING");
		long activeUsers = userRepo.countByStatus("APPROVED");
		userDto.setTotalUsers(totalUsers);
		userDto.setPendingApprovals(pendingApprovals);
		userDto.setActiveUsers(activeUsers);
		return userDto;
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

		user.setFirstName(userDto.getFirstName());
		user.setAge(userDto.getAge());
		user.setContactNumber(userDto.getContactNumber());
		user.setEmail(userDto.getEmail());
		user.setLocation(userDto.getLocation());
		user.setSocialStatus(userDto.getSocialStatus());
		user.setPreferredLanguage(userDto.getPreferredLanguage());
		user.setHealthConcerns(userDto.getHealthConcerns());
		user.setModeOfReachability(userDto.getModeOfReachability());
		user.setVerificationStatus(userDto.getVerificationStatus());

		User updatedUser = this.userRepo.save(user);

		return this.userToUserDto(updatedUser);
	}

	@Override
	public UserDto getUser(Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

		return this.userToUserDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {

		List<User> users = this.userRepo.findAll();

		List<UserDto> userDto = users.stream().map(user -> this.userToUserDto(user)).collect(Collectors.toList());

		return userDto;
	}

	@Override
	public void deleteUser(Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

		this.userRepo.delete(user);

	}

	private User dtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
		// user.setId(userDto.getId());
		// user.setFirstName(userDto.getFirstName());
		// user.setAge(userDto.getAge());
		// user.setContactNumber(userDto.getContactNumber());
		// user.setEmail(userDto.getEmail());
		// user.setLocation(userDto.getLocation());
		// user.setSocialStatus(userDto.getSocialStatus());
		// user.setPreferredLanguage(userDto.getPreferredLanguage());
		// user.setHealthConcerns(userDto.getHealthConcerns());
		// user.setModeOfReachability(userDto.getModeOfReachability());
		// user.setVerificationStatus(userDto.getVerificationStatus());

		return user;
	}

	private UserDto userToUserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setFirstName(user.getFirstName());
		userDto.setAge(user.getAge());
		userDto.setContactNumber(user.getContactNumber());
		userDto.setEmail(user.getEmail());
		userDto.setLocation(user.getLocation());
		userDto.setSocialStatus(user.getSocialStatus());
		userDto.setPreferredLanguage(user.getPreferredLanguage());
		userDto.setHealthConcerns(user.getHealthConcerns());
		userDto.setModeOfReachability(user.getModeOfReachability());
		userDto.setVerificationStatus(user.getVerificationStatus());
		userDto.setLatitude(user.getLatitude());
		userDto.setLongitude(user.getLongitude());
		userDto.setStatus(user.getStatus());
		userDto.setProfilePhoto(user.getProfilePhoto());

		return userDto;
	}

	@Override
	public UserDto getUserById(Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

		return this.userToUserDto(user);
	}

	@Override
	public Map<String, Long> getUserStatistics() {
		long totalUsers = userRepo.count(); // Get total number of users
		long activeUsers = userRepo.countByStatus("ACTIVE"); // Count active users
		long pendingUsers = userRepo.countByStatus("PENDING"); // Count pending users

		// Store counts in a Map
		Map<String, Long> userStats = new HashMap<>();
		userStats.put("totalUsers", totalUsers);
		userStats.put("activeUsers", activeUsers);
		userStats.put("pendingUsers", pendingUsers);

		return userStats;
	}

	@Override
	public UserDto uploadProfilePhoto(Integer userId, org.springframework.web.multipart.MultipartFile file)
			throws java.io.IOException {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

		String uploadDir = "D:/uploads/profiles/";
		java.nio.file.Path path = java.nio.file.Paths.get(uploadDir);
		if (!java.nio.file.Files.exists(path)) {
			java.nio.file.Files.createDirectories(path);
		}

		String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
		java.nio.file.Path filePath = path.resolve(fileName);
		java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

		user.setProfilePhoto(fileName);
		User updatedUser = this.userRepo.save(user);

		return this.userToUserDto(updatedUser);
	}

}
