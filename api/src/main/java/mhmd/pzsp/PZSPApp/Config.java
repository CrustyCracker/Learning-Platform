package mhmd.pzsp.PZSPApp;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.services.CardService;
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
    public DataSource dataSource(){
        var ds = new DriverManagerDataSource();
        ds.setUrl("jdbc:oracle:thin:@ora2.ia.pw.edu.pl:1521:iais");
        ds.setDriverClassName("oracle.jdbc.driver.OracleDriver");
        ds.setUsername(""); // pzsp2 tutaj wpisać credentiale
        ds.setPassword("");
        return ds;
    }
}
