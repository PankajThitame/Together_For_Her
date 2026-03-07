package com.together_for_her.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.together_for_her.entities.RegisterUserRequest;
import com.together_for_her.paylods.RoleUpdateDto;
import com.together_for_her.paylods.UserDto;
import com.together_for_her.paylods.VolunteerDto;
import com.together_for_her.services.VolunteerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerVolunteer(@Valid @RequestBody RegisterUserRequest vol) {
        // if (volunteerService.userExists(vol.getVolunteer().getEmail())) {
        // return ResponseEntity.status(HttpStatus.CONFLICT).body("User already
        // exists");
        // }
        RegisterUserRequest createUserDto = volunteerService.registerNewVolunteer(vol);
        return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<VolunteerDto>> getAllUsers() {
        return ResponseEntity.ok(this.volunteerService.getAllVolunteers());
    }

    @GetMapping("/count")
    public ResponseEntity<VolunteerDto> getVolunteersCounts() {
        VolunteerDto counts = volunteerService.countVolunteers(new VolunteerDto());
        return ResponseEntity.ok(counts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VolunteerDto> getSingleVolunteer(@PathVariable Integer id) {
        return ResponseEntity.ok(volunteerService.getVolunteerById(id));
    }

    @PostMapping("/profile-photo/{volunteerId}")
    public ResponseEntity<VolunteerDto> uploadProfilePhoto(@PathVariable Integer volunteerId,
            @org.springframework.web.bind.annotation.RequestParam("file") org.springframework.web.multipart.MultipartFile file)
            throws java.io.IOException {
        VolunteerDto updatedVolunteer = volunteerService.uploadProfilePhoto(volunteerId, file);
        return ResponseEntity.ok(updatedVolunteer);
    }
}
