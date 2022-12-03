package mhmd.pzsp.PZSPApp.models.api;

public class LoginResponse {
    public boolean success;
    // tutaj miejsce na jakiś token

    public LoginResponse(boolean success){
        this.success = success;
    }
}
