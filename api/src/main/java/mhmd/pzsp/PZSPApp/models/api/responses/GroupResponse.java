package mhmd.pzsp.PZSPApp.models.api.responses;

import com.fasterxml.jackson.annotation.JsonIgnore;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;

import java.util.List;

public class GroupResponse {
    public Long id;

    public String name;

    public Integer difficulty;

    public String description;

    public String username;

    public boolean isPublic;

    public List<Long> cardIds;

    public GroupResponse() { }

    @JsonIgnore
    public GroupResponse(Group group){
        id = group.getId();
        name = group.getName();
        difficulty = group.getDifficulty();
        description = group.getDescription();
        username = group.getUser().getUsername();
        isPublic = group.isPublic();
        cardIds = group.cards.stream().map(Card::getId).toList();
    }
}
