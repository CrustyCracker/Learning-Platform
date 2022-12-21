package mhmd.pzsp.PZSPApp.models.api.requests;

import jakarta.validation.constraints.NotNull;

public class LoginRequest {
    @NotNull
    public String username;
    @NotNull
    public String password;

    public LoginRequest(String username, String password){
        this.username = username;
        this.password = password;
    }
}
