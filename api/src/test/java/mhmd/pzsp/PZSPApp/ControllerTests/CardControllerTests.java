package mhmd.pzsp.PZSPApp.ControllerTests;

import mhmd.pzsp.PZSPApp.controller.CardController;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.json.JSONArray;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CardControllerTests {
    @Autowired
    private CardController cardController;
    @Autowired
    private TestRestTemplate restTemplate;
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
    public void testGetFirst() {
        var result = restTemplate.getForEntity(url + port + "/cards/first", String.class);
        assertTrue(result.hasBody());
        assertEquals(result.getStatusCode(), HttpStatus.OK);
        assertTrue(Objects.requireNonNull(result.getBody()).contains("id"));
        assertTrue(result.getBody().contains("question"));
    }

    private Long addUserAndCard() {
        var user = new User(username, "hasło", "email@gmail.com", "salt");
        var card = new Card(question, "odpowiedź", "źródło", user, true);
        userRepository.save(user);
        cardRepository.save(card);
        return user.getId();
    }

    @Test
    public void testGetForUser() {
        var id = addUserAndCard();

        var result = restTemplate.getForEntity(url + port + "/cards/forUser/" + id, String.class);
        assertTrue(result.hasBody());
        assertThat(result.getBody()).isNotBlank();

        var json = new JSONArray(result.getBody());
        assertEquals(1, json.length());
        assertEquals(json.getJSONObject(0).get("question"), question);
    }
}
