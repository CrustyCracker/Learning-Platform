package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.Objects;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public boolean login(LoginRequest login) throws BackendException {
        var user =  userRepository.findByUsername(login.username);
        if (user.isEmpty())
            throw new BackendException("No user in database with this username.");

        //return Objects.equals(user.get().getUsername(), login.username); // pzsp2 odkomentować do testowania z pominięciem loginu

        try {
            var DBHash = user.get().getPassword();
            var DBSalt = Hex.decodeHex(user.get().getSalt());
            var newHash = Hex.encodeHexString(hashPassword(login.password, DBSalt));

            return newHash.equals(DBHash);
        }
        catch (DecoderException e){
            throw new BackendException(e.getMessage());
        }
    }

    @Override
    public boolean register(RegisterRequest register) throws BackendException {
        if (!Objects.equals(register.confirmPassword, register.password))
            throw new BackendException("Passwords do not match.");
        if (!validateMail(register.email))
            throw new BackendException("");
        if (!validatePassword(register.password))
            throw new BackendException("Password is too weak");
        if (userRepository.findByUsername(register.username).isPresent())
            throw new BackendException("There is already a user in database with this username.");

        var random = new SecureRandom();
        var salt = new byte[16];
        random.nextBytes(salt);

        var hash = hashPassword(register.password, salt);
        var newUser = new User(register.username, hash, register.email, salt);

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
        // pzsp2 więcej walidacji i na fronta też ją dodać, nawet skróconą
        return !password.isBlank();
    }

    @Override
    public boolean validateMail(String mail) throws BackendException{
        if (mail.length() >= 64)
            throw new BackendException("Password is too long.");
        if (mail.length() < 3)
            throw new BackendException("Password is too short.");
        if (mail.strip().length() == 0)
            throw new BackendException("Password does not contain any non-white characters.");
        // pzsp2 więcej walidacji i na fronta też ją dodać, nawet skróconą
        return !mail.isBlank();
    }

    @Override
    public byte[] hashPassword(String password, byte[] salt) throws BackendException {
        try {
            var spec = new PBEKeySpec(password.toCharArray(), salt, 16384, 128);
            var factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

            return factory.generateSecret(spec).getEncoded();
        }
        catch (Exception e){
            throw new BackendException("Password is invalid.");
        }
    }
}
