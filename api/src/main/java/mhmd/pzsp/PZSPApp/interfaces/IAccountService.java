package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.models.api.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.RegisterRequest;

public interface IAccountService {
    boolean login(LoginRequest login) throws BackendException;

    boolean register(RegisterRequest register) throws BackendException;

    boolean validatePassword(String password) throws BackendException;
}
