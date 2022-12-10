package mhmd.pzsp.PZSPApp.models.api.responses;

public class RegisterResponse extends LoginResponse {
    public RegisterResponse(boolean success, String token, String message) {
        super(success, token, message);
    }
}
