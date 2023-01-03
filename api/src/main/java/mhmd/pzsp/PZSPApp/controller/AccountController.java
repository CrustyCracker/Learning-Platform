package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.LoginResponse;
import mhmd.pzsp.PZSPApp.models.api.responses.RegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public LoginResponse login(@RequestBody LoginRequest login) throws BackendException {
        var user = accountService.login(login);
        return new LoginResponse(true, accountService.generateToken(user), "Zalogowano");
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest register) throws BackendException {
        if (accountService.register(register))
            return new RegisterResponse(true, "Utworzono konto");
        return new RegisterResponse(false, "Nieudana rejestracja");
    }
}
