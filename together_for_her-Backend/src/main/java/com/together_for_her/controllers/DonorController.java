package com.together_for_her.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.together_for_her.paylods.ApiResponse;
import com.together_for_her.paylods.DonorDto;
import com.together_for_her.services.DonorServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

	@Autowired
	DonorServices donorServices;
	@PostMapping("/")
	public ResponseEntity<DonorDto> createDonor(@Valid @RequestBody DonorDto donorDto)
	{
		DonorDto createUserDto=this.donorServices.createDonor(donorDto);
		return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
	}
	
	@PutMapping("/{donorId}")
	public ResponseEntity<DonorDto> updateDonor(@Valid @RequestBody DonorDto donorDto, @PathVariable("donorId") Integer did)
	{
		DonorDto updateDonor=this.donorServices.updateDonor(donorDto, did);
		return ResponseEntity.ok(updateDonor);
	}
	
	@GetMapping("/{donorId}")
	public ResponseEntity<DonorDto> getDonor(@PathVariable Integer donorId)
	{
		return ResponseEntity.ok(this.donorServices.getDonor(donorId));
	}
	
	@DeleteMapping("/{donorId}")
	public ResponseEntity<ApiResponse> deleteDonor(@PathVariable("donorId") Integer did)
	{
		this.donorServices.deleteDonor(did);
		return new ResponseEntity(new ApiResponse("Donor Deleated Successfully",true), HttpStatus.OK);
	}

}
