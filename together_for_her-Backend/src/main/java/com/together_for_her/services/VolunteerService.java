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

        // Convert UserCredentialsDto to UserCredentials Entity
        
        userCred.setVolunteer(volunteer); // Associate credentials with the volunteer
        userCred.setUser(null);
        //userCred.setRole(Role.VOLUNTEER); // Ensure role is set

        // Save UserCredentials
        userCredentialsRepository.save(userCred);

        return userReq;
    }
    
	public VolunteerDto countVolunteers(VolunteerDto volunteerDto)
    {
        long totalVolunteers = volunteerRepository.count();
        long pendingApplications = volunteerRepository.countByStatus("PENDING");
        volunteerDto.setTotalVolunteers(totalVolunteers);
        volunteerDto.setPendingApplications(pendingApplications);
    	return volunteerDto;
    }

    
	public List<VolunteerDto> getAllVolunteers() {
		
		List<Volunteer> users=this.volunteerRepository.findAll();
		
		List<VolunteerDto> userDto=users.stream().map(user->this.modelMapper.map(user, VolunteerDto.class)).collect(Collectors.toList());
		
		return userDto;
	}
	
	public Volunteer updateVolunteerStatus(Integer requestId, String status) {
		Volunteer request = volunteerRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return volunteerRepository.save(request);
    }

////    public void updateRole(String email, String newRole) {
////    	UserCredentials optionalUser = userCredentialsRepository.findById(email);
////        if (optionalUser.isPresent()) {
////            UserCredentials user = optionalUser.get();
////            user.setRole(newRole); // Update role to VOLUNTEER
////            volunteerRepository.save(user);
////        }
//    }
}
