package mhmd.pzsp.PZSPApp.models.api;

import com.sun.istack.NotNull;

public class LoginRequest {
    @NotNull
    public String login;

    @NotNull
    public String password;
}
