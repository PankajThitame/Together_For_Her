package com.together_for_her.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.together_for_her.entities.Feedback;
import com.together_for_her.entities.User;
import com.together_for_her.entities.Donor;
import com.together_for_her.exceptions.ResourceNotFoundException;
import com.together_for_her.paylods.FeedbackDto;
import com.together_for_her.repos.DonorRepo;
import com.together_for_her.repos.FeedbackRepo;
import com.together_for_her.repos.UserRepo;
import com.together_for_her.services.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private DonorRepo donorRepo;

	@Autowired
	private FeedbackRepo fRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public FeedbackDto createFeedbackFromUser(FeedbackDto fDto, Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "User Id", userId));

		Feedback fb = this.modelMapper.map(fDto, Feedback.class);

		fb.setCreatedAt(LocalDateTime.now().toString());
		fb.setUser(user);
		fb.setCFrom(user.getClass().getSimpleName());

		Feedback nF = this.fRepo.save(fb);

		return this.modelMapper.map(nF, FeedbackDto.class);
	}

	@Override
	public FeedbackDto createFeedbackFromDonor(FeedbackDto fDto, Integer userId) {
		Donor user = this.donorRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Donor", "Donor Id", userId));

		Feedback fb = this.modelMapper.map(fDto, Feedback.class);

		fb.setCreatedAt(LocalDateTime.now().toString());
		fb.setDonor(user);
		fb.setCFrom(user.getClass().getSimpleName());

		Feedback nF = this.fRepo.save(fb);

		return this.modelMapper.map(nF, FeedbackDto.class);
	}

	public FeedbackDto countFeedback(FeedbackDto feedbackDto) {
		long feedbackCount = fRepo.count();
		long pendingtoreply = fRepo.countByStatus("PENDING");
		long replied = fRepo.countByStatus("RESPONDED");
		feedbackDto.setFeedbackCount(feedbackCount);
		feedbackDto.setPendingtoreply(pendingtoreply);
		feedbackDto.setReplied(replied);
		return feedbackDto;
	}

	@Override
	public Feedback updateFeedback(FeedbackDto fDto, Integer fId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteFeedback(Integer fId) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<FeedbackDto> getAllFeedback() {
		List<Feedback> feedbacks = this.fRepo.findAll();

		return feedbacks.stream()
				.map(feedback -> this.modelMapper.map(feedback, FeedbackDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public FeedbackDto updateResponse(FeedbackDto userDto, Integer userId) {

		Feedback user = this.fRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Feedback", "Id", userId));

		user.setResponse(userDto.getResponse());
		user.setStatus(userDto.getStatus());

		Feedback updatedUser = this.fRepo.save(user);

		return this.modelMapper.map(updatedUser, FeedbackDto.class);
	}

	@org.springframework.beans.factory.annotation.Value("${file.upload-dir}")
	private String uploadDir;

	// ✅ Save Feedback Content (Photo, Video, etc.) to Filesystem
	@Override
	public Feedback saveFeedbackContent(MultipartFile file, Integer userId,
			String message) throws java.io.IOException {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

		java.nio.file.Path path = java.nio.file.Paths.get(uploadDir);
		if (!java.nio.file.Files.exists(path)) {
			java.nio.file.Files.createDirectories(path);
		}

		String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
		java.nio.file.Path filePath = path.resolve(fileName);
		java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

		Feedback feedback = new Feedback();
		feedback.setText(message);
		feedback.setType(file.getContentType());
		feedback.setFileName(fileName);
		feedback.setFilePath(fileName); // Store filename as path for simplicity in retrieval
		feedback.setCreatedAt(LocalDateTime.now().toString());
		feedback.setUser(user);
		feedback.setCFrom("User");
		feedback.setStatus("PENDING");

		return fRepo.save(feedback);
	}

	@Override
	public List<Feedback> getAllMediaFiles() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FeedbackDto> getFeedbackById(Integer fId) {
		Optional<Feedback> feedbacks = this.fRepo.findById(Long.valueOf(fId));

		if (feedbacks.isEmpty()) {
			throw new ResourceNotFoundException("Feedback", "User ID", fId);
		}

		return feedbacks.stream()
				.map(feedback -> this.modelMapper.map(feedback, FeedbackDto.class))
				.collect(Collectors.toList());
	}

}
