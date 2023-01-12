package mhmd.pzsp.PZSPApp.models.api.responses;

public class LoginResponse {
    public boolean success;
    public String token;
    public String message;
    public String username;
    public boolean isAdmin;

    public LoginResponse() {};
    public LoginResponse(boolean success, String token, String message, String username, boolean isAdmin){
        this.success = success;
        this.token = token;
        this.message = message;
        this.username = username;
        this.isAdmin = isAdmin;
    }
}
