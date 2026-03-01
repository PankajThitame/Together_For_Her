package com.together_for_her.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.together_for_her.entities.Donor;

public interface DonorRepo extends JpaRepository<Donor, Integer>{

}
