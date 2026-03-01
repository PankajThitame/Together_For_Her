package com.together_for_her.paylods;

import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedbackDto {

	private int id;
	private String text;
	private String cFrom;
	private String type; // Video MIME type (e.g., video/mp4)

	@Lob // Store as a Large Object
	private byte[] data;
	private String createdAt;
	private String fileName;
	private String filePath;
	private String LocalDateTime;
	private String response;
	private String status; // PENDING, APPROVED, REJECTED
	private UserDto user;
	private DonorDto donor;

	long feedbackCount;
	long replied;
	long pendingtoreply;

}
