package mhmd.pzsp.PZSPApp.models.api.responses;

import com.fasterxml.jackson.annotation.JsonIgnore;
import mhmd.pzsp.PZSPApp.models.Group;

public class GroupResponse {
    public Long id;

    public String name;

    public Integer difficulty;

    public String description;

    public String username;

    public boolean isPublic;

    @JsonIgnore
    public GroupResponse(Group group){
        id = group.getId();
        name = group.getName();
        difficulty = group.getDifficulty();
        description = group.getDescription();
        username = group.getUser().getUsername();
        isPublic = group.IsPublic();
    }
}
