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
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
        basePackages = {
                "mhmd.pzsp.PZSPApp.repositories"
        }
)
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

}
