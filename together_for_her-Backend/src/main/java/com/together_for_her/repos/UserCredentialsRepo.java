package com.together_for_her.repos;

import com.together_for_her.entities.UserCredentials;
import com.together_for_her.paylods.UserCredentialsDto;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserCredentialsRepo extends JpaRepository<UserCredentials, Integer> {
    UserCredentials findByUsername(String username);

}
