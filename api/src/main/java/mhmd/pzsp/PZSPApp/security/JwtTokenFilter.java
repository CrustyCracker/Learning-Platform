package mhmd.pzsp.PZSPApp.services;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import mhmd.pzsp.PZSPApp.security.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    IAccountService accountService;

    public JwtTokenFilter(IAccountService accountService) {
        this.accountService = accountService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {

            List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
            if (jwtCookie != null && jwtCookie.getValue().contains("admin")) {
                System.out.println("DOBRZE JEST, DOBRZE ROBIOM");
                grantedAuthorityList.add(new SimpleGrantedAuthority(Roles.USER.toString()));
            } else if (jwtCookie == null) {
                System.out.println("NULL KURQW");
            } else {
                System.out.println("KURWA CO TO JEST");
            }
            User user = accountService.defaultAdmin();
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user, "test1234CREDENTIALS", grantedAuthorityList
            );
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BackendException e) {
            filterChain.doFilter(request, response);
        }
        filterChain.doFilter(request, response);
    }
}
