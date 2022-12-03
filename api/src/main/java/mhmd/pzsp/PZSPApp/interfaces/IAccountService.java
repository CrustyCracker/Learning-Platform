package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.models.api.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.RegisterRequest;

public interface IAccountService {
    boolean login(LoginRequest login);

    boolean register(RegisterRequest register);

    boolean validatePassword(String password);
}
