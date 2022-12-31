package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public interface IAccountService {
    User login(LoginRequest login) throws BackendException;

    boolean register(RegisterRequest register) throws BackendException;

    void validatePassword(String password) throws BackendException;

    void validateMail(String mail) throws BackendException;

    byte[] hashPassword(String password, byte[] salt) throws BackendException;

    User defaultAdmin() throws BackendException;

    String generateToken(User user);

    Optional<User> loadUserByUsername(String username) throws UsernameNotFoundException;
}
