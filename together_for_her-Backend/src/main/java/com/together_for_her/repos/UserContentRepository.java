package com.together_for_her.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.together_for_her.entities.UserContent;

public interface UserContentRepository extends JpaRepository<UserContent, Long> {
    List<UserContent> findByStatus(String status);

    List<UserContent> findByUploadedBy(String uploadedBy);
}
