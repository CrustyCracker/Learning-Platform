package mhmd.pzsp.PZSPApp.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.LoginResponse;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.RegisterResponse;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/account")
public class AccountController {
    private final IAccountService accountService;

    @Autowired
    public AccountController(IAccountService accountService){
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest login, Authentication authentication)
            throws BackendException {
        if (accountService.login(login)) {
            // pzsp2 TODO generowanie JWT
            return new LoginResponse(true, "token_admin", "Zalogowano");
        }

        return new LoginResponse(false, null, "Niepoprawne hasło");
        // pzsp2 narazie tokeny są testowe
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest register, Authentication authentication)
            throws BackendException {
        if (accountService.register(register))
//            return new RegisterResponse(true, accountService.generateToken(authentication), "Utworzono konto");
            return new RegisterResponse(true, null, "Utworzono konto");
        return new RegisterResponse(false, null, "Nieudana rejestracja");
    }
}
