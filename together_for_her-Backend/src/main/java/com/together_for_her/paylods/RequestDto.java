package com.together_for_her.paylods;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestDto {
    private Integer request_id;
    private String address;
    private String contact;
    private String reason;
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
	private UserDto user;
	private long totalRequests;
	private long pendingRequests;
	private long completedRequests;
}
