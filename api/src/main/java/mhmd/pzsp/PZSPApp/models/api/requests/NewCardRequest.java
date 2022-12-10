package mhmd.pzsp.PZSPApp.models.api.requests;

import com.sun.istack.NotNull;

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

    public List<Long> tagIds;

    public NewCardRequest(String question, String answer, boolean isPublic, String source, List<Long> groupIds, List<Long> tagIds) {
        this.question = question;
        this.answer = answer;
        this.isPublic = isPublic;
        this.source = source;
        this.groupIds = groupIds;
        this.tagIds = tagIds;
    }
}
