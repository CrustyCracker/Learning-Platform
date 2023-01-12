package mhmd.pzsp.PZSPApp.models.api.requests;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public class NewCardRequest {
    @NotNull
    public String question;

    @NotNull
    public String answer;

    @NotNull
    public boolean isPublic;

    public String source;

    public List<Long> groupIds;

    public List<String> tags;

    public NewCardRequest(String question, String answer, boolean isPublic, String source, List<Long> groupIds, List<String> tags) {
        this.question = question;
        this.answer = answer;
        this.isPublic = isPublic;
        this.source = source;
        this.groupIds = groupIds;
        this.tags = tags;
    }
}
