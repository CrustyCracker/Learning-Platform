package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.Login;
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
    public void login(@RequestBody Login login) {
        var isSuccess = accountService.login(login);
        // pzsp2 no to jest nieskończone trochę
    }
}
