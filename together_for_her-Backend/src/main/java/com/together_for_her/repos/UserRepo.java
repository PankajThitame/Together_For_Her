package com.together_for_her.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.together_for_her.entities.User;

public interface UserRepo extends JpaRepository<User, Integer>{
	
	Optional<User> findByEmail(String email);
	long countByStatus(String status);
}
