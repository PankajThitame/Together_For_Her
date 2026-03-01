package com.together_for_her.entities;

import com.together_for_her.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_credentials")
@Getter
@Setter
public class UserCredentials {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String username;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role;  

    // ✅ Relationship with User (Only if registering as a User)
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = true)
    private User user;

    // ✅ Relationship with Volunteer (Only if registering as a Volunteer)
    @OneToOne
    @JoinColumn(name = "volunteer_id", referencedColumnName = "id", unique = true, nullable = true)
    private Volunteer volunteer;
}
