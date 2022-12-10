package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;

public interface IAccountService {
    boolean login(LoginRequest login) throws BackendException;

    boolean register(RegisterRequest register) throws BackendException;

    void validatePassword(String password) throws BackendException;

    void validateMail(String mail) throws BackendException;

    byte[] hashPassword(String password, byte[] salt) throws BackendException;

    User defaultAdmin() throws BackendException;
}
