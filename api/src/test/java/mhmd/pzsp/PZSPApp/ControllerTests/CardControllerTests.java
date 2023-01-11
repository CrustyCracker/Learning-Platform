package mhmd.pzsp.PZSPApp.ControllerTests;

import mhmd.pzsp.PZSPApp.controller.CardController;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CardControllerTests {
    @Autowired
    private CardController cardController;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ICardRepository cardRepository;

    @LocalServerPort
    private int port;

    private final String url = "http://localhost:";
    private static final String username = "NowyUser";
    private static final String question = "pytanietestowe";

    @BeforeEach
    @AfterEach
    public void cleanUpData() {
        if (!cardRepository.findByQuestion(question).isEmpty())
            cardRepository.deleteAll(cardRepository.findByQuestion(question));
        if (userRepository.findByUsername(username).isPresent()){
            userRepository.deleteById(userRepository.findByUsername(username).get().getId());
        }
    }

    @Test
    public void testExists() {
        assertThat(cardController).isNotNull();
    }

    @Test
    public void testGetFirst_NoToken() {
        var result = restTemplate.getForEntity(url + port + "/cards/first", String.class);
        assertTrue(result.hasBody());
        assertEquals(result.getStatusCode(), HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void testCreateCard_NoToken() {
        var result = restTemplate.postForEntity(url + port + "/cards/create", new NewCardRequest(
                "1", "2", true, "3", List.of(), List.of()
        ) ,String.class);
        assertTrue(result.hasBody());
        assertEquals(result.getStatusCode(), HttpStatus.UNAUTHORIZED);
    }
}
