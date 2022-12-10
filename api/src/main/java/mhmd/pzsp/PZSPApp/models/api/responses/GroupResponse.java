package mhmd.pzsp.PZSPApp.models.api.responses;

import mhmd.pzsp.PZSPApp.models.Group;

public class GroupResponse {
    private final Long id;

    private final String name;

    private final Integer difficulty;

    private final String description;

    private final String username;

    public GroupResponse(Group group){
        id = group.getId();
        name = group.getName();
        difficulty = group.getDifficulty();
        description = group.getDescription();
        username = group.getUser().getUsername();
    }
}
