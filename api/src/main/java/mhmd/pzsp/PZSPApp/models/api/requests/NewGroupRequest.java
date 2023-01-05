package mhmd.pzsp.PZSPApp.models.api.requests;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public class NewGroupRequest {
    @NotNull
    public String name;
    @NotNull
    public Integer difficulty;
    @NotNull
    public boolean isPublic;

    public String description;

    public List<Long> cardIds;

    public NewGroupRequest(String name, Integer difficulty, boolean isPublic, String description, List<Long> cardIds) {
        this.name = name;
        this.difficulty = difficulty;
        this.isPublic = isPublic;
        this.description = description;
        this.cardIds = cardIds;
    }
}
