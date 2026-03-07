package com.together_for_her.paylods;

import com.together_for_her.entities.User;
import com.together_for_her.enums.VolunteerType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDto {
    private int id;
    private String name;
    private String email;
    private String contactNumber;
    private String type;
    private VolunteerType volunteerType;
    private Integer experience;
    private String availability;
    private String reason;
    private Double latitude;
    private Double longitude;
    private String profilePhoto;
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED

    long totalVolunteers;
    long pendingApplications;

}
