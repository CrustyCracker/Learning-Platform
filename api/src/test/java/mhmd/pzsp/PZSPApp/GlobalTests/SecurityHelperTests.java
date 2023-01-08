package mhmd.pzsp.PZSPApp.GlobalTests;

import mhmd.pzsp.PZSPApp.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static mhmd.pzsp.PZSPApp.security.SecurityHelper.getCurrentUser;
import static org.junit.jupiter.api.Assertions.*;

public class SecurityHelperTests {
    @Test
    public void test_GetCurrentUser_Null() {
        var optUser = Optional.empty();
        var token = "tokentoken";
        var grantedAuthorityList = List.of(new SimpleGrantedAuthority("user"));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                optUser, token, grantedAuthorityList);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        assertNull(getCurrentUser());
    }

    @Test
    public void test_GetCurrentUser_Ok() {
        String testname = "123arehtrh467564";
        var newUser = new User(testname, "hasłohaso", "test646547@gmail.com", "sólsólsol");
        var optUser = Optional.of(newUser);
        var token = "tokentoken";
        var grantedAuthorityList = List.of(new SimpleGrantedAuthority("user"));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                optUser, token, grantedAuthorityList);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        assertNotNull(getCurrentUser());
        assertEquals(testname, getCurrentUser().getUsername());
        assertEquals(newUser.getSalt(), getCurrentUser().getSalt());
        assertEquals(newUser.getEmail(), getCurrentUser().getEmail());
        assertEquals(newUser.getPassword(), getCurrentUser().getPassword());
    }
}
