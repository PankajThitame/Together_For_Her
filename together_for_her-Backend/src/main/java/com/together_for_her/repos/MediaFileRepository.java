package com.together_for_her.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.together_for_her.entities.Feedback;

public interface MediaFileRepository extends JpaRepository<Feedback, Long> {

}
