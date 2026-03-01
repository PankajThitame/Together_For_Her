package com.together_for_her.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer request_id;
    private String address;
    private String contact;
    private String reason;
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED

    @ManyToOne
//    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

}
