package mhmd.pzsp.PZSPApp;

import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.services.AccountService;
import mhmd.pzsp.PZSPApp.services.CardService;
import mhmd.pzsp.PZSPApp.services.GroupService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableJpaRepositories(
        basePackages = {
                "mhmd.pzsp.PZSPApp.repositories"
        }
)
@EnableWebSecurity
public class Config {
    @Bean
    public ICardService getCardService(){
        return new CardService();
    }

    @Bean
    public IAccountService getAccountService(){
        return new AccountService();
    }

    @Bean
    public IGroupService getGroupService() {
        return new GroupService();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new AccountService();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.authorizeRequests().antMatchers("**").permitAll().anyRequest().authenticated();
        return http.build();
    }

}
