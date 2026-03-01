package com.together_for_her.paylods;

import com.together_for_her.entities.User;
import com.together_for_her.enums.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentialsDto {
		
    private String username;
    private String password;
    
    private Role role;
    
    public String getAuthority() {
        return "ROLE_" + role.name();  // ✅ Ensure ROLE_ prefix
    }
    
    private int userId; // ✅ Store only the ID, not the User entity
}
