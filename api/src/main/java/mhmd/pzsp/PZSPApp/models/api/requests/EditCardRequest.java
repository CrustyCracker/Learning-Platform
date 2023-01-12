package mhmd.pzsp.PZSPApp.models.api.requests;

import java.util.List;

public class EditCardRequest extends NewCardRequest {
    public Long id;
    public EditCardRequest(Long id, String question, String answer, boolean isPublic, String source, List<Long> groupIds, List<String> tags) {
        super(question, answer, isPublic, source, groupIds, tags);
        this.id = id;
    }
}
