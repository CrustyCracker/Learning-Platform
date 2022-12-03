package mhmd.pzsp.PZSPApp.services;

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
    public boolean login(LoginRequest login) {
        var user =  userRepository.findByLogin(login.login);
        if (user.isEmpty())
            return false;

        var DBHash = user.get().getPassword().getBytes();
        var DBSalt = user.get().getSalt().getBytes();
        var newHash = hashPassword(login.password, DBSalt);

        return Arrays.equals(DBHash, newHash);
    }

    @Override
    public boolean register(RegisterRequest register) {
        if (Objects.equals(register.confirmPassword, register.password))
            return false;
        if (register.email.isEmpty())
            return false;
        if (!validatePassword(register.password))
            return false;
        if (userRepository.findByLogin(register.login).isPresent())
            return false;

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
    public boolean validatePassword(String password) {
        if (password.length() >= 64 || password.length() < 3)
            return false;
        if (password.strip().length() == 0)
            return false;
        return !password.isBlank();
    }

    private byte[] hashPassword(String password, byte[] salt){
        try {
            var spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 64);
            var factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

            return factory.generateSecret(spec).getEncoded();
        }
        catch (Exception e){
            return new byte[]{};
        }
    }
}
