package mhmd.pzsp.PZSPApp.BackendTests;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
            accountService.validatePassword(password);
            accountService.validateMail(mail);
        } catch (Exception ex) {
            fail(ex.getMessage());
        }
    }

    @Test
    public void testValidation_Password_Failed(){
        var longString = new StringBuilder();
        longString.append("123abc".repeat(1000));

        try {
            accountService.validatePassword("12");
        }
        catch (BackendException e1){
            try {
                accountService.validatePassword("");
            } catch (BackendException e2) {
                try {
                    accountService.validatePassword(longString.toString());
                } catch (BackendException e3) {
                    try {
                        accountService.validatePassword("    ");
                    } catch (BackendException ignored) {

                    }
                }
            }
        }
        catch (Exception ex){
            fail(ex.getMessage());
        }
    }

    @Test
    public void testValidation_Mail_Failed(){
        var longString = new StringBuilder();
        longString.append("123abc".repeat(1000));

        try {
            accountService.validateMail("12");
        }
        catch (BackendException e1){
            try {
                accountService.validateMail("");
            } catch (BackendException e2) {
                try {
                    accountService.validateMail(longString.toString());
                } catch (BackendException e3) {
                    try {
                        accountService.validateMail("    ");
                    } catch (BackendException e4) {
                        try {
                            accountService.validateMail("123$5574$*(&^@gmail.com");
                        } catch (BackendException ignored) {

                        }
                    }
                }
            }
        }
        catch (Exception ex){
            fail(ex.getMessage());
        }
    }
}
