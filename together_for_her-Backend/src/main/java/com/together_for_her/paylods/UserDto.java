package com.together_for_her.paylods;

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
public class UserDto {

	private int id;

	@NotNull(message = "Name cannot be null")
	@Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
	private String firstName;

	@NotNull(message = "Name cannot be null")
	private int age;

	@NotBlank(message = "Contact number is required")
	@Pattern(regexp = "[6-9][0-9]{9}", message = "Invalid phone number")
	private String contactNumber;

	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Contact number is required")
	private String location;

	@NotNull(message = "Name cannot be null")
	private String socialStatus;

	@NotNull(message = "Name cannot be null")
	private String preferredLanguage;

	@NotNull(message = "Name cannot be null")
	private String healthConcerns;

	@NotNull(message = "Name cannot be null")
	private String modeOfReachability;

	@NotNull(message = "Name cannot be null")
	private String verificationStatus;

	@NotNull(message = "Name cannot be null")
	private String latitude;

	@NotNull(message = "Name cannot be null")
	private String longitude;

	private String status = "PENDING"; // PENDING, APPROVED, REJECTED

	private String profilePhoto;

	private long totalUsers;
	private long activeUsers;
	private long pendingApprovals;

}
//
// insert into beneficiaries
// (age,id,contact_number,user_name,email,health_concerns,location,mode_of_reachability,preferred_language,social_status,verification_status)
// values(22,1,"7821828016","pankaj","pankaj@gmail.com","no","pune","offline","marathi","avg",true)
