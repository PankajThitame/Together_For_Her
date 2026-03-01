package com.together_for_her.paylods;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommunityMessDto {

    public String message;
    public String category;
    public String timestamp;
    public String senderName;
    public int likes;

}
