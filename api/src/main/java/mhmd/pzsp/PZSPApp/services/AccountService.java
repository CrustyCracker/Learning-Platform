package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.RegisterRequest;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Objects;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public boolean login(LoginRequest login) throws BackendException {
        var user =  userRepository.findByLogin(login.login);
        if (user.isEmpty())
            throw new BackendException("No user in database with this login.");

        var DBHash = user.get().getPassword().getBytes();
        var DBSalt = user.get().getSalt().getBytes();
        var newHash = hashPassword(login.password, DBSalt);

        return Arrays.equals(DBHash, newHash);
    }

    @Override
    public boolean register(RegisterRequest register) throws BackendException {
        if (!Objects.equals(register.confirmPassword, register.password))
            throw new BackendException("Passwords do not match.");
        if (register.email.isEmpty())
            throw new BackendException("No email is given.");
        if (!validatePassword(register.password))
            throw new BackendException("Password is too weak");
        if (userRepository.findByLogin(register.login).isPresent())
            throw new BackendException("No user in database with this login.");

        var random = new SecureRandom();
        var salt = new byte[16];
        random.nextBytes(salt);

        var hash = hashPassword(register.password, salt);
        var newUser = new User(register.login, Arrays.toString(hash), register.email, Arrays.toString(salt));
        userRepository.save(newUser);
        userRepository.flush();
        return true;
    }

    @Override
    public boolean validatePassword(String password) throws BackendException {
        if (password.length() >= 64)
            throw new BackendException("Password is too long.");
        if (password.length() < 3)
            throw new BackendException("Password is too short.");
        if (password.strip().length() == 0)
            throw new BackendException("Password does not contain any non-white characters.");
        return !password.isBlank();
    }

    private byte[] hashPassword(String password, byte[] salt) throws BackendException {
        try {
            var spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 64);
            var factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

            return factory.generateSecret(spec).getEncoded();
        }
        catch (Exception e){
            throw new BackendException("Password is invalid.");
        }
    }
}
