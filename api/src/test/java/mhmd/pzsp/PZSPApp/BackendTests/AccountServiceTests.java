package mhmd.pzsp.PZSPApp.BackendTests;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.util.AssertionErrors.fail;

@SpringBootTest
public class AccountServiceTests {
    // testy, które nie wymagają sięgania do DB
    @Autowired
    private IAccountService accountService;
    private static final String password = "NowyUser123!%";
    private static final String mail = "test@gmail.com";

    @Test
    public void testValidation_Simple() {
        try {
            assertTrue(accountService.validatePassword(password));
            assertTrue(accountService.validateMail(mail));
        } catch (Exception ex) {
            fail(ex.getMessage());
        }
    }

    @Test
    public void testValidation_Failed(){
        var longString = new StringBuilder();
        longString.append("123abc".repeat(1000));

        try {
            assertFalse(accountService.validatePassword("1"));
            assertFalse(accountService.validatePassword(""));
            assertFalse(accountService.validatePassword(longString.toString()));
        }
        catch (BackendException ignored){

        }
        catch (Exception ex){
            fail(ex.getMessage());
        }
    }
}
