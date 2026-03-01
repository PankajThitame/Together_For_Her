package com.together_for_her.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.together_for_her.enums.Role;
import com.together_for_her.enums.VolunteerType;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "beneficiaries")
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_name", nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false)
    private int age;

    @Column(name = "contact_number", nullable = false, length = 15)
    private String contactNumber;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String socialStatus;
    private String role;

    private String preferredLanguage;
    private String healthConcerns;
    private String modeOfReachability;
    private String verificationStatus;
    private String latitude;
    private String longitude;
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED

    private String profilePhoto;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Feedback> feedback = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Request> request = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserCredentials credentials;

    // @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch =
    // FetchType.LAZY, optional = false)
    // private Volunteer volunteer;
}
