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
}
