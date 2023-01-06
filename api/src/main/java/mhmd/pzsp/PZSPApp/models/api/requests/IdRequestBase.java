package mhmd.pzsp.PZSPApp.models.api.requests;

import jakarta.validation.constraints.NotNull;

public class IdRequestBase {
    @NotNull
    public Long id;
}
