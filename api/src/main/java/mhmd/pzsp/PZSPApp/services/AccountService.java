package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.models.Login;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public boolean login(Login login) {
        return Objects.equals(userRepository.findByLogin(login.login).getPassword(), login.password);
    }
}
