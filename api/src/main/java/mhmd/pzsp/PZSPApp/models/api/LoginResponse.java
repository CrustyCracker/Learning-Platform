package mhmd.pzsp.PZSPApp.models.api;

public class LoginResponse {
    public boolean success;
    public String token;

    public LoginResponse(boolean success){
        this.success = success;
    }
}
