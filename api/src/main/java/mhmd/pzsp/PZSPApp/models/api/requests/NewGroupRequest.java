package mhmd.pzsp.PZSPApp.models.api.requests;

import com.sun.istack.NotNull;

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
