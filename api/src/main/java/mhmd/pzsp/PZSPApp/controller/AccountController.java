package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.api.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.LoginResponse;
import mhmd.pzsp.PZSPApp.models.api.RegisterRequest;
import mhmd.pzsp.PZSPApp.models.api.RegisterResponse;
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
    public LoginResponse login(@RequestBody LoginRequest login) {
        return new LoginResponse(accountService.login(login));
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest register){
        return new RegisterResponse(accountService.register(register));
    }
}
