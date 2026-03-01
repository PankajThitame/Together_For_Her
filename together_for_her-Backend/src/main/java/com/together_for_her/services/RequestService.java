package com.together_for_her.services;

import com.together_for_her.entities.Feedback;
import com.together_for_her.entities.Request;
import com.together_for_her.entities.User;
import com.together_for_her.paylods.FeedbackDto;
import com.together_for_her.paylods.RequestDto;
import com.together_for_her.repos.RequestRepository;
import com.together_for_her.repos.UserRepo;

import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserRepo userRepository;
    
    @Autowired
	private ModelMapper modelMapper;


    public RequestService(RequestRepository requestRepository, UserRepo userRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }
    
    @Transactional
    public void updateStatus(Integer id, String status) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));
        
        request.setStatus(status);
        requestRepository.save(request);
    }
    
    // Create Request
    public RequestDto createRequest(Integer userId, RequestDto requestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Request request = new Request();
        request.setAddress(requestDto.getAddress());
        request.setContact(requestDto.getContact());
        request.setReason(requestDto.getReason());
        request.setUser(user);
        
        Request nF = this.requestRepository.save(request);

		return this.modelMapper.map(nF, RequestDto.class);
        
    }
    
    public RequestDto countRequests(RequestDto requestDto)
    {
        long totalRequests = requestRepository.count();
        long pendingRequests = requestRepository.countByStatus("PENDING");
        long completedRequests = requestRepository.countByStatus("APPROVED");
        requestDto.setTotalRequests(totalRequests);
        requestDto.setPendingRequests(pendingRequests);
        requestDto.setCompletedRequests(completedRequests);
        requestDto.setAddress(null);
        requestDto.setContact(null);
        requestDto.setReason(null);
        requestDto.setRequest_id(null);
        requestDto.setStatus(null);
        requestDto.setUser(null);
    	return requestDto;
    }

    // Get Requests by User
    public List<Request> getUserRequests(Integer userId) {
        return requestRepository.findByUserId(userId);
    }

    // Admin: Approve/Reject Request
    public Request updateRequestStatus(Integer requestId, String status) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return requestRepository.save(request);
    }

    // Get All Requests (Admin)
    public List<RequestDto> getAllRequests() {
    	List<Request> feedbacks = this.requestRepository.findAll();

	    return feedbacks.stream()
	        .map(feedback -> this.modelMapper.map(feedback, RequestDto.class))
	        .collect(Collectors.toList());
	}
}
