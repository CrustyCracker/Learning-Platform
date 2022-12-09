package mhmd.pzsp.PZSPApp.models.api.responses;

public class LoginResponse {
    public boolean success;
    public String token;

    public LoginResponse(boolean success, String token){
        this.success = success;
        this.token = token;
    }
}
