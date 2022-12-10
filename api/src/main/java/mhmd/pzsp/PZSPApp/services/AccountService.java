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
import java.util.regex.Pattern;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public boolean login(LoginRequest login) throws BackendException {
        if (login.password == null || login.password.isBlank())
            throw new BackendException("Hasło nie jest podane lub jest puste");
        if (login.username == null || login.username.isBlank())
            throw new BackendException("Login nie jest podany lub jest pusty");
        var user =  userRepository.findByUsername(login.username);
        if (user.isEmpty())
            throw new BackendException("Brak użytkownika o tej nazwie");

        try {
            var DBHash = user.get().getPassword();
            var DBSalt = Hex.decodeHex(user.get().getSalt());
            var newHash = Hex.encodeHexString(hashPassword(login.password, DBSalt));

            return newHash.equals(DBHash);
        }
        catch (DecoderException e){
            throw new BackendException("Błąd podczas kodowania/dekodowania hasła");
        }
    }

    @Override
    public boolean register(RegisterRequest register) throws BackendException {
        if (register.password == null || register.password.isBlank())
            throw new BackendException("Hasło nie jest podane lub jest puste");
        if (register.email == null || register.email.isBlank())
            throw new BackendException("Email nie jest podane lub jest puste");
        if (register.username == null || register.username.isBlank())
            throw new BackendException("Username is not given or empty");
        if (!Objects.equals(register.confirmPassword, register.password))
            throw new BackendException("Passwords do not match");
        validateMail(register.email);
        validatePassword(register.password);
        if (userRepository.findByUsername(register.username).isPresent())
            throw new BackendException("There is already a user in database with this username");

        var random = new SecureRandom();
        var salt = new byte[16];
        random.nextBytes(salt);

        var hash = hashPassword(register.password, salt);
        var newUser = new User(register.username, hash, register.email, salt);

        userRepository.save(newUser);
        return true;
    }

    @Override
    public void validatePassword(String password) throws BackendException {
        if (password == null)
            throw new BackendException("Password is empty");
        if (password.length() >= 64)
            throw new BackendException("Password is too long");
        if (password.length() < 4)
            throw new BackendException("Password is too short");
        if (password.isBlank())
            throw new BackendException("Password does not contain any non-white characters");
    }

    @Override
    public void validateMail(String mail) throws BackendException{
        var regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

        if (mail == null)
            throw new BackendException("Email address is empty");
        if (mail.length() >= 64)
            throw new BackendException("Password is too long");
        if (mail.length() < 4)
            throw new BackendException("Password is too short");
        if (mail.isBlank())
            throw new BackendException("Password does not contain any non-white characters");
        if (!Pattern.compile(regexPattern).matcher(mail).matches())
            throw new BackendException("Niewłaściwy adres email");
    }

    @Override
    public byte[] hashPassword(String password, byte[] salt) throws BackendException {
        try {
            var spec = new PBEKeySpec(password.toCharArray(), salt, 16384, 128);
            var factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

            return factory.generateSecret(spec).getEncoded();
        }
        catch (Exception e){
            throw new BackendException("Password is invalid for hashing");
        }
    }

    @Override
    public User defaultAdmin() throws BackendException {
        var admin = userRepository.getTopByAdminIsOrderById('1');
        if (admin.isEmpty())
            throw new BackendException("Brak konta administratora w bazie danych");
        return admin.get();
    }
}
