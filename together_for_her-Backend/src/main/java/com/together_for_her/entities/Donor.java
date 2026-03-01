package com.together_for_her.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "donors")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Donor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;
    private String address;

    private String donationType;  // Money, Sanitary Products, etc.
    private Double donationAmount;
    
//    @Column(nullable = false)
//    private LocalDate donationDate;

    private String paymentMethod;
    private String donationFrequency; // One-time, Monthly

    private Boolean interestedInVolunteering;
    private String messageFromDonor;
    private String socialMediaHandle;
    
    private String recognitionBadge;
    private Boolean thankYouLetterSent;

    @OneToMany(mappedBy = "donor", cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Feedback> feedback=new ArrayList<>();
}
