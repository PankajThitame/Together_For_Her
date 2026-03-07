package com.together_for_her.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.together_for_her.enums.VolunteerType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "volunteers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;
    private String contactNumber;
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED

    @Enumerated(EnumType.STRING)
    private VolunteerType volunteerType; // 🔹 Removed duplicate "type" field

    private Integer experience;
    private String availability;
    private String reason;
    private Double latitude;
    private Double longitude;

    // ✅ Ensuring correct mapping
    @OneToOne(mappedBy = "volunteer", cascade = CascadeType.ALL)
    private UserCredentials userCredentials;
}
