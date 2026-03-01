package com.together_for_her.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.together_for_her.entities.CommunityMess;
import com.together_for_her.paylods.CommunityMessDto;
import com.together_for_her.repos.CommunityMessRepo;
import com.together_for_her.services.CommunityMessService;

@RestController
@RequestMapping("/api/community")

public class CommunityMessController {

    @Autowired
    private CommunityMessRepo repository;

    @Autowired
    private CommunityMessService communityMessService;

    @PostMapping("/post")
    public ResponseEntity<?> saveMessage(@RequestBody CommunityMessDto dto) {
        CommunityMess post = new CommunityMess();
        post.setMessage(dto.message);
        post.setCategory(dto.category);
        post.setTimestamp(dto.timestamp);
        post.setSenderName(dto.senderName);
        post.setLikes(dto.likes);
        repository.save(post);
        return ResponseEntity.ok("Message posted!");
    }

    @PutMapping("/like/{id}")
    public String likeMessage(@PathVariable Long id) {
        boolean updated = communityMessService.incrementLikes(id);
        return updated ? "Like updated successfully" : "Message not found";
    }

    @GetMapping("/all")
    public List<CommunityMess> getAllMessages() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
    }

}
