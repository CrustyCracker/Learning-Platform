package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.LoginResponse;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.RegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/account")
public class AccountController {
    private final IAccountService accountService;

    // pzsp2 przy endpointach jakieś sensowniejsze sprawdzenia danych/error handling
    // pzsp2 nie ma testów na kontrolery

    @Autowired
    public AccountController(IAccountService accountService){
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest login) throws BackendException {
        return new LoginResponse(accountService.login(login), "udane logowanie");
        // pzsp2 te tokeny będą z jwt czy podobnego, to jest od bezpieczeństwa, narazie są testowe
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest register) throws BackendException {
        return new RegisterResponse(accountService.register(register), "udana rejestracja");
    }
}
