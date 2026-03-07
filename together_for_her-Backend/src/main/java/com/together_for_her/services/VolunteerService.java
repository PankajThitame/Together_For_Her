package com.together_for_her.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.together_for_her.entities.RegisterUserRequest;
import com.together_for_her.entities.Request;
import com.together_for_her.entities.User;
import com.together_for_her.entities.UserCredentials;
import com.together_for_her.entities.Volunteer;
import com.together_for_her.enums.Role;
import com.together_for_her.paylods.UserDto;
import com.together_for_her.paylods.VolunteerDto;
import com.together_for_her.repos.UserCredentialsRepo;
import com.together_for_her.repos.UserRepo;
import com.together_for_her.repos.VolunteerRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    @Autowired
    private UserCredentialsRepo userCredentialsRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Optional<Volunteer> userExists(Integer id) {
        return volunteerRepository.findById(id);
    }

    public RegisterUserRequest registerNewVolunteer(RegisterUserRequest userReq) {
        // Convert VolunteerDto to Volunteer Entity
        Volunteer volunteer = modelMapper.map(userReq.getVolunteer(), Volunteer.class);
        UserCredentials userCred = modelMapper.map(userReq.getCredentials(), UserCredentials.class);
        // Save Volunteer first
        Volunteer savedVolunteer = volunteerRepository.save(volunteer);

        userCred.setVolunteer(savedVolunteer); // Associate credentials with the volunteer
        userCred.setUser(null);

        // Save UserCredentials
        userCredentialsRepository.save(userCred);

        // Populate the ID back into the response DTO
        userReq.getVolunteer().setId(savedVolunteer.getId());
        return userReq;
    }

    public VolunteerDto getVolunteerById(Integer id) {
        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));
        return modelMapper.map(volunteer, VolunteerDto.class);
    }

    @org.springframework.beans.factory.annotation.Value("${file.upload-dir}")
    private String uploadDir;

    public VolunteerDto uploadProfilePhoto(Integer volunteerId, org.springframework.web.multipart.MultipartFile file)
            throws java.io.IOException {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        java.nio.file.Path path = java.nio.file.Paths.get(uploadDir);
        if (!java.nio.file.Files.exists(path)) {
            java.nio.file.Files.createDirectories(path);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        java.nio.file.Path filePath = path.resolve(fileName);
        java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

        volunteer.setProfilePhoto(fileName);
        Volunteer updatedVolunteer = volunteerRepository.save(volunteer);

        return modelMapper.map(updatedVolunteer, VolunteerDto.class);
    }

    public VolunteerDto countVolunteers(VolunteerDto volunteerDto) {
        long totalVolunteers = volunteerRepository.count();
        long pendingApplications = volunteerRepository.countByStatus("PENDING");
        volunteerDto.setTotalVolunteers(totalVolunteers);
        volunteerDto.setPendingApplications(pendingApplications);
        return volunteerDto;
    }

    public List<VolunteerDto> getAllVolunteers() {

        List<Volunteer> users = this.volunteerRepository.findAll();

        List<VolunteerDto> userDto = users.stream().map(user -> this.modelMapper.map(user, VolunteerDto.class))
                .collect(Collectors.toList());

        return userDto;
    }

    public Volunteer updateVolunteerStatus(Integer requestId, String status) {
        Volunteer request = volunteerRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return volunteerRepository.save(request);
    }

    //// public void updateRole(String email, String newRole) {
    //// UserCredentials optionalUser = userCredentialsRepository.findById(email);
    //// if (optionalUser.isPresent()) {
    //// UserCredentials user = optionalUser.get();
    //// user.setRole(newRole); // Update role to VOLUNTEER
    //// volunteerRepository.save(user);
    //// }
    // }
}
