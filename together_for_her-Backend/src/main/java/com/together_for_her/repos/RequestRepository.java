package com.together_for_her.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.together_for_her.entities.Request;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findByUserId(Integer id);
    long countByStatus(String status);
}
