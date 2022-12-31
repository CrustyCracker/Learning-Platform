package mhmd.pzsp.PZSPApp.DBTests;

import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.apache.commons.codec.binary.Hex;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.util.AssertionErrors.fail;

@SpringBootTest
public class AccountServiceTests {
    // testy, które sięgają do DB
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IUserRepository userRepository;

    private static final String username = "NowyUser";
    private static final String password = "NowyUser123!%";
    private static final String mail = "test@gmail.com";

    @AfterEach
    @BeforeEach
    public void cleanData(){
        if (userRepository.findByUsername(username).isPresent()){
            userRepository.deleteById(userRepository.findByUsername(username).get().getId());
        }
    }

    @Test
    public void testRegistration_Simple(){
        var registration = new RegisterRequest(username, password, password, mail);

        try {
            var res = accountService.register(registration);
            assertTrue(res);

            if (userRepository.findByUsername(username).isEmpty())
                throw new Exception("No user with this username");
            var DBUser = userRepository.findByUsername(username).get();

            var salt = Hex.decodeHex(DBUser.getSalt());
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
    public void testRegistration_WithLogin(){
        var registration = new RegisterRequest(username, password, password, mail);
        var login = new LoginRequest(username, password);

        try {
            var res = accountService.register(registration);
            assertTrue(res);

            var user = accountService.login(login);
            assertNotNull(user);
            assertEquals(registration.username, user.getUsername());
            assertEquals(registration.email, user.getEmail());
        }
        catch (Exception ex){
            fail(ex.getMessage());
        }
    }
}
