package com.together_for_her.entities;

import com.together_for_her.paylods.UserCredentialsDto;
import com.together_for_her.paylods.UserDto;
import com.together_for_her.paylods.VolunteerDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RegisterUserRequest {
    private UserDto user;
    private UserCredentialsDto credentials;
    private VolunteerDto volunteer;

    // Getters and Setters
}
