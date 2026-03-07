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

    @PutMapping("/{id}")
    public ResponseEntity<String> updateRequestStatus(@PathVariable Integer id,
            @RequestBody Map<String, String> payload) {
        volunteerService.updateVolunteerStatus(id, payload.get("status"));
        return ResponseEntity.ok("Request status updated successfully");
    }

    // @PutMapping("/update-role")
    // public ResponseEntity<?> updateVolunteerRole(@RequestBody RoleUpdateDto
    // roleUpdateDTO) {
    // if (!volunteerService.userExists(roleUpdateDTO.getEmail())) {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    // }
    // volunteerService.updateRole(roleUpdateDTO.getEmail(),
    // roleUpdateDTO.getRole());
    // return ResponseEntity.ok("User role updated successfully");
    // }
}
