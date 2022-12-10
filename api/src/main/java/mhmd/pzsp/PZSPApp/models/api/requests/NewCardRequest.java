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
}
