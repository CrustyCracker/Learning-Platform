package mhmd.pzsp.PZSPApp.models.api.responses;

public class RegisterResponse {
    public boolean success;
    public String message;

    public RegisterResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
