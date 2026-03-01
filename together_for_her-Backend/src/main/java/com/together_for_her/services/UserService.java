package com.together_for_her.services;

import java.util.List;
import java.util.Map;

import com.together_for_her.entities.RegisterUserRequest;
import com.together_for_her.paylods.UserDto;

public interface UserService {

	RegisterUserRequest createUser(RegisterUserRequest user);

	UserDto updateUser(UserDto user, Integer userId);

	UserDto getUser(Integer userId);

	UserDto getUserById(Integer userId);

	List<UserDto> getAllUsers();

	UserDto countUsers(UserDto userDto);

	void deleteUser(Integer userId);

	UserDto uploadProfilePhoto(Integer userId, org.springframework.web.multipart.MultipartFile file)
			throws java.io.IOException;

	Map<String, Long> getUserStatistics();

}
