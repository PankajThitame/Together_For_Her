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
import com.together_for_her.entities.Volunteer;
import com.together_for_her.paylods.VolunteerDto;
import com.together_for_her.services.VolunteerService;
import com.together_for_her.repos.VolunteerRepository;
import org.modelmapper.ModelMapper;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    @Autowired
    private com.together_for_her.repos.VolunteerRepository volunteerRepository;

    @Autowired
    private org.modelmapper.ModelMapper modelMapper;

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
    public ResponseEntity<VolunteerDto> getVolunteerById(@PathVariable Integer id) {
        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found with id: " + id));
        return ResponseEntity.ok(this.modelMapper.map(volunteer, VolunteerDto.class));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VolunteerDto> updateVolunteer(@PathVariable Integer id,
            @RequestBody VolunteerDto volunteerDto) {
        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setName(volunteerDto.getName());
        volunteer.setContactNumber(volunteerDto.getContactNumber());
        volunteer.setProfilePhoto(volunteerDto.getProfilePhoto());
        // Map other fields as necessary

        Volunteer saved = volunteerRepository.save(volunteer);
        return ResponseEntity.ok(this.modelMapper.map(saved, VolunteerDto.class));
    }

    @PostMapping("/profile-photo/{userId}")
    public ResponseEntity<VolunteerDto> uploadProfilePhoto(@PathVariable Integer userId,
            @org.springframework.web.bind.annotation.RequestParam("file") org.springframework.web.multipart.MultipartFile file)
            throws java.io.IOException {
        Volunteer volunteer = this.volunteerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Volunteer not found with id: " + userId));

        // Use a default path or get from properties if injected
        String uploadDir = "uploads";
        java.nio.file.Path path = java.nio.file.Paths.get(uploadDir);
        if (!java.nio.file.Files.exists(path)) {
            java.nio.file.Files.createDirectories(path);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        java.nio.file.Path filePath = path.resolve(fileName);
        java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

        volunteer.setProfilePhoto(fileName);
        Volunteer updatedVolunteer = this.volunteerRepository.save(volunteer);

        return ResponseEntity.ok(this.modelMapper.map(updatedVolunteer, VolunteerDto.class));
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
