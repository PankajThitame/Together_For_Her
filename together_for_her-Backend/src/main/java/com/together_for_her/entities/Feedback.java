package com.together_for_her.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private String cFrom;

    private String type; // Video MIME type (e.g., video/mp4)
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED

    private String response;

    @Lob // Store as a Large Object
    private byte[] data;
    private String createdAt;

    private String filePath;
    private String fileName;

    @ManyToOne
    private User user;

    @ManyToOne
    private Donor donor;

}
