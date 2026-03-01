package com.together_for_her.services;

import com.together_for_her.paylods.DonorDto;

public interface DonorServices {
	
	DonorDto createDonor(DonorDto donor);
	
	DonorDto updateDonor(DonorDto user,Integer donorId);
	
	DonorDto getDonor(Integer donorId);
	
	//DonorDto getDonorById(Integer donorId);
	
	//List<DonorDto> getAllDoners();
	
	void deleteDonor(Integer donorId);

}
