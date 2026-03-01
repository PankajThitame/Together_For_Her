package com.together_for_her.paylods;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter

public class DonorDto {


	    private Long id;
	    
	    @NotNull(message = "Name cannot be null")
	    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
	    private String name;
	    
	    @Email(message = "Invalid email format")
	    private String email;
	    
	    @NotBlank(message = "Contact number is required")
	    @Pattern(regexp = "[6-9][0-9]{9}", message = "Invalid phone number")
	    private String phone;
	    
	    @NotBlank(message = "Contact number is required")
	    private String address;
	    
	    private String donationType;  // Money, Sanitary Products, etc.
	    
	    private Double donationAmount;
	    
	    
	   // private LocalDate donationDate;
	    private String paymentMethod;
	    private String donationFrequency; // One-time, Monthly
	    private Boolean interestedInVolunteering;
	    private String messageFromDonor;
	    private String socialMediaHandle;
	    private String recognitionBadge;
	    private Boolean thankYouLetterSent;


}
