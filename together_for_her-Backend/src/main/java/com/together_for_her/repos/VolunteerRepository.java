package com.together_for_her.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.together_for_her.entities.Volunteer;

public interface VolunteerRepository extends JpaRepository<Volunteer, Integer> {
	Optional<Volunteer> findByEmail(String email);
    Optional<Volunteer> findById(Integer id);
	long countByStatus(String status);


}
