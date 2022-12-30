package mhmd.pzsp.PZSPApp.security;

import mhmd.pzsp.PZSPApp.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private AccountService accountService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String login = authentication.getName();
        String password = authentication.getCredentials().toString();

        return accountService.loadUserByUsername(login)
                .filter(user -> Objects.equals(user.getPassword(), password))
                .map(user -> new UsernamePasswordAuthenticationToken(user, password, prepareAuthorities(user.isAdmin())))
                .orElse(null);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    private List<GrantedAuthority> prepareAuthorities(boolean isAdmin) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(Roles.USER.toString()));
        if (isAdmin)
            authorities.add(new SimpleGrantedAuthority(Roles.ADMIN.toString()));
        return authorities;
    }
}
