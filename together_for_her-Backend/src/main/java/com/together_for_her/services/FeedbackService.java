package com.together_for_her.services;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.together_for_her.entities.Feedback;
import com.together_for_her.paylods.FeedbackDto;

public interface FeedbackService {

	FeedbackDto createFeedbackFromUser(FeedbackDto fDto, Integer userId);

	FeedbackDto createFeedbackFromDonor(FeedbackDto fDto, Integer userId);

	Feedback updateFeedback(FeedbackDto fDto, Integer fId);

	void deleteFeedback(Integer fId);

	List<FeedbackDto> getAllFeedback();

	FeedbackDto updateResponse(FeedbackDto userDto, Integer userId);

	List<FeedbackDto> getFeedbackById(Integer uId);

	// ✅ Save Feedback Content (Photo, Video, etc.) to Filesystem
	Feedback saveFeedbackContent(org.springframework.web.multipart.MultipartFile file, Integer userId, String message)
			throws java.io.IOException;

	FeedbackDto countFeedback(FeedbackDto FeedbackDto);

	// ✅ Fetch All Media Files
	List<Feedback> getAllMediaFiles();

}
