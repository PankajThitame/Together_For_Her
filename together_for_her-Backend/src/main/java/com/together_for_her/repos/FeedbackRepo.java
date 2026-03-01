package com.together_for_her.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.together_for_her.entities.Donor;
import com.together_for_her.entities.Feedback;
import com.together_for_her.entities.User;

public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

	
	List<Feedback> getByUser(User user);
	List<Feedback> getByDonor(Donor user);
	Optional<Feedback> findById(int userId);
	long countByStatus(String status);

	
}
