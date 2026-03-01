package com.together_for_her.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.together_for_her.entities.CommunityMess;
import com.together_for_her.repos.CommunityMessRepo;

import java.util.Optional;

@Service
public class CommunityMessService {

    @Autowired
    private CommunityMessRepo communityMessRepository;

    public boolean incrementLikes(Long id) {
        Optional<CommunityMess> optionalMessage = communityMessRepository.findById(id);

        if (optionalMessage.isPresent()) {
            CommunityMess message = optionalMessage.get();
            message.setLikes(message.getLikes() + 1);
            communityMessRepository.save(message);
            return true;
        }
        return false;
    }
}
