package mhmd.pzsp.PZSPApp;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.security.CustomAuthenticationProvider;
import mhmd.pzsp.PZSPApp.security.Roles;
import mhmd.pzsp.PZSPApp.services.AccountService;
import mhmd.pzsp.PZSPApp.services.CardService;
import mhmd.pzsp.PZSPApp.services.GroupService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableJpaRepositories(
        basePackages = {
                "mhmd.pzsp.PZSPApp.repositories"
        }
)
@EnableWebSecurity
public class Config {
    @Value("${jwt.public.key}")
    RSAPublicKey key;

    @Value("${jwt.private.key}")
    RSAPrivateKey priv;

    public Config(CustomAuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

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

    private CustomAuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable()
                .cors().and()
                .authorizeHttpRequests(authorize -> {
                            authorize.requestMatchers("/login", "/login/", "/register", "/register/")
                                    .permitAll();
                            authorize.requestMatchers(
                                    HttpMethod.POST,
                                    "/cards/create",
                                    "/cards/create/",
                                    "/groups/create",
                                    "/groups/create/"
                            ).hasAuthority(Roles.ADMIN.toString());
                            authorize.anyRequest().authenticated();
                        }
                )
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authenticationProvider);
        return authenticationManagerBuilder.build();
    }

//    @Bean
//    UserDetailsService users() {
//        return new InMemoryUserDetailsManager(
//                User.withUsername("user")
//                        .password("{noop}password")
//                        .authorities("app")
//                        .build()
//        );
//    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(this.key).build();
    }

    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(this.key).privateKey(this.priv).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }
}
