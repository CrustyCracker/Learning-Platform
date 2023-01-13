package mhmd.pzsp.PZSPApp.BackendTests;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import mhmd.pzsp.PZSPApp.services.AccountService;
import org.apache.commons.codec.binary.Hex;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.AssertionErrors.fail;

@SpringBootTest
public class AccountServiceTests {
    @InjectMocks
    private AccountService accountService;
    @Mock
    private IUserRepository userRepository;
    @Mock
    private IGroupRepository groupRepository;

    private static final String username = "NowyUser";
    private static final String password = "NowyUser123!%";
    private static final String mail = "test@gmail.com";

    @Test
    public void testRegistration_Simple() throws Exception {
        var registration = new RegisterRequest(username, password, password, mail);
        var salt = getSalt();
        var user = new User(username, hashPassword(password, salt), mail, salt);
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());
        try {
            var res = accountService.register(registration);
            when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
            assertTrue(res);

            if (accountService.loadUserByUsername(username).isEmpty())
                throw new Exception("No user with this username");
            var DBUser = accountService.loadUserByUsername(username).get();

            salt = Hex.decodeHex(DBUser.getSalt());
            var hash = Hex.encodeHexString(accountService.hashPassword(registration.password, salt));
            assertEquals(hash, DBUser.getPassword());
            assertEquals(registration.username, DBUser.getUsername());
            assertEquals(registration.email, DBUser.getEmail());
        }
        catch (Exception ex){
            fail(ex.getMessage());
        }
    }

    @Test
    public void testLogin() throws Exception {
        var login = new LoginRequest(username, password);
        var salt = getSalt();
        var user = new User(username, hashPassword(password, salt), mail, salt);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        var userResponse = accountService.login(login);
        assertThat(userResponse.getUsername()).isEqualTo(user.getUsername());
        assertThat(userResponse.getEmail()).isEqualTo(user.getEmail());
        assertThat(userResponse.isAdmin()).isEqualTo(user.isAdmin());
    }

    private byte[] getSalt() {
        var random = new SecureRandom();
        var salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    public byte[] hashPassword(String password, byte[] salt) throws BackendException {
        try {
            var spec = new PBEKeySpec(password.toCharArray(), salt, 16384, 128);
            var factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

            return factory.generateSecret(spec).getEncoded();
        }
        catch (Exception e){
            throw new BackendException("Błąd skracania hasła, użyj innego");
        }
    }
}
