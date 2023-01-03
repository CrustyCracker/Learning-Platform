package mhmd.pzsp.PZSPApp.security;

import mhmd.pzsp.PZSPApp.models.User;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SecurityHelper {
    public static User getCurrentUser() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal.getClass() == Optional.of(User.class).getClass()))
            return null;

        var user = (Optional<?>) principal;

        return (User) user.orElse(null);
    }
}
