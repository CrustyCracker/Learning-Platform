package mhmd.pzsp.PZSPApp.models.api.requests;

import java.util.List;

public class EditGroupRequest extends NewGroupRequest {
    public Long id;
    public EditGroupRequest(Long id, String name, Integer difficulty, boolean isPublic, String description, List<Long> cardIds) {
        super(name, difficulty, isPublic, description, cardIds);
        this.id = id;
    }
}
