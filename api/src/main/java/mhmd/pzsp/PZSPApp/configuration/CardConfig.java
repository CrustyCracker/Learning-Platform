package mhmd.pzsp.PZSPApp.configuration;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.services.CardService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
        basePackages = {
                "mhmd.pzsp.PZSPApp.repositories"
        }
)
public class CardConfig {
    @Bean
    public ICardService getCardService(){
        return new CardService();
    }
}
