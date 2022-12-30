package mhmd.pzsp.PZSPApp;

import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.security.CustomAuthenticationProvider;
import mhmd.pzsp.PZSPApp.security.Roles;
import mhmd.pzsp.PZSPApp.services.AccountService;
import mhmd.pzsp.PZSPApp.services.CardService;
import mhmd.pzsp.PZSPApp.services.GroupService;
import mhmd.pzsp.PZSPApp.security.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable()
            .cors().and()
            .authorizeHttpRequests(authorize -> {
                authorize.requestMatchers("/login", "/login/", "/register", "/register/")
                        .permitAll();
                authorize.requestMatchers(
                        HttpMethod.POST,
                        "/account/login",
                        "/account/login/",
                        "/account/register",
                        "/account/register/"
                ).permitAll();
                authorize.requestMatchers(
                        "/cards/all",
                        "/cards/all/"
                ).hasAuthority(Roles.USER.toString());
                authorize.requestMatchers(
                        HttpMethod.POST,
                        "/cards/create",
                        "/cards/create/",
                        "/groups/create",
                        "/groups/create/"
                ).hasAuthority(Roles.ADMIN.toString());
                authorize.anyRequest().authenticated();
            })
            .httpBasic(Customizer.withDefaults())
            .addFilterBefore(new JwtTokenFilter(getAccountService()), UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
