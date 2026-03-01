package com.together_for_her.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.together_for_her.entities.Donor;
import com.together_for_her.exceptions.ResourceNotFoundException;
import com.together_for_her.paylods.DonorDto;
import com.together_for_her.repos.DonorRepo;
import com.together_for_her.services.DonorServices;

@Service
public class DonorServiceImpl implements DonorServices {

	@Autowired
	private DonorRepo donorRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public DonorDto createDonor(DonorDto donorDto) {
		Donor donor = this.modelMapper.map(donorDto, Donor.class);

		Donor saveDonor = this.donorRepo.save(donor);

		return this.modelMapper.map(saveDonor, DonorDto.class);
	}

	@Override
	public DonorDto updateDonor(DonorDto donorDto, Integer donorId) {
		Donor donor = this.donorRepo.findById(donorId)
				.orElseThrow(() -> new ResourceNotFoundException("Donor", "Id", donorId));

		donor.setName(donorDto.getName());
		donor.setPhone(donorDto.getPhone());
		donor.setEmail(donorDto.getEmail());
		donor.setDonationType(donorDto.getDonationType());
		donor.setDonationAmount(donorDto.getDonationAmount());
		donor.setAddress(donorDto.getAddress());
		//donor.setDonationDate(donorDto.getDonationDate());
		donor.setPaymentMethod(donorDto.getPaymentMethod());
		donor.setDonationFrequency(donorDto.getDonationFrequency());
		donor.setInterestedInVolunteering(donorDto.getInterestedInVolunteering());
		donor.setMessageFromDonor(donorDto.getMessageFromDonor());
		donor.setSocialMediaHandle(donorDto.getSocialMediaHandle());
		donor.setRecognitionBadge(donorDto.getRecognitionBadge());
		donor.setThankYouLetterSent(donorDto.getThankYouLetterSent());

		Donor updatedDonor = this.donorRepo.save(donor);

		return this.modelMapper.map(updatedDonor, DonorDto.class);
	}

	@Override
	public DonorDto getDonor(Integer donorId) {
		Donor donor = this.donorRepo.findById(donorId)
				.orElseThrow(() -> new ResourceNotFoundException("Donor", "Id", donorId));
		return this.modelMapper.map(donor, DonorDto.class);
	}

	@Override
	public void deleteDonor(Integer donorId) {
		Donor donor = this.donorRepo.findById(donorId)
				.orElseThrow(() -> new ResourceNotFoundException("Donor", "Id", donorId));

		this.donorRepo.delete(donor);
	}

}
