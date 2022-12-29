package mhmd.pzsp.PZSPApp.security;

import mhmd.pzsp.PZSPApp.services.AccountService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private AccountService accountService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Logger logger = LogManager.getLogger(CustomAuthenticationProvider.class);
        logger.log(Level.ERROR, "próba autentykacji");
        logger.log(Level.ERROR, authentication.isAuthenticated());
        String login = authentication.getName();
        String password = authentication.getCredentials().toString();

        return accountService.loadUserByUsername(login)
                .filter(user -> Objects.equals(user.getPassword(), password))
                .map(user -> new UsernamePasswordAuthenticationToken(user, password, prepareAuthorities(login)))
                .orElse(null);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    private List<GrantedAuthority> prepareAuthorities(String login) {
        Logger logger = LogManager.getLogger(CustomAuthenticationProvider.class);
        logger.log(Level.ERROR, "LOGIN: "+login);
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(Roles.USER.toString()));
        if (Objects.equals(login, Roles.ADMIN.toString())) {
            authorities.add(new SimpleGrantedAuthority(Roles.ADMIN.toString()));
        }
        return authorities;
    }
}
