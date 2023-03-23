package mhmd.pzsp.PZSPApp.BackendTests;

import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.EditCardRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.services.CardService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CardServiceTest {
    @InjectMocks
    CardService cardService;

    @Mock
    ICardRepository cardRepository;

    @Test
    public void testCreate() throws Exception {
        NewCardRequest newCardRequest = new NewCardRequest("pytanie",
                "odp", true, "sors", null, null);
        User user = new User("user", "pass", "mail", "pepper");
        Card card = new Card(newCardRequest, user, null, null);
        when(cardRepository.save(any())).thenReturn(card);
        Card response = cardService.create(newCardRequest, user);
        assertThat(response.getAnswer()).isEqualTo(card.getAnswer());
        assertThat(response.getQuestion()).isEqualTo(card.getQuestion());
    }

    @Test
    public void testFindAll() throws Exception {
        User user = new User("user", "pass", "mail", "pepper");
        List<Card> cards = new ArrayList<>();
        for (int i = 0; i < 5; i++)
            cards.add(new Card("pytanie", "odp", "sos", user, true));
        when(cardRepository.findAll()).thenReturn(cards);
        assertThat(cardService.findAllCards()).isEqualTo(cards);
    }

    @Test
    public void testEditCard() throws Exception {
        User user = new User(20, "user", "pass", "mail", "pepper");
        EditCardRequest editCardRequest = new EditCardRequest(1L, "pytanie", "odpowiedz",
                true, "sors", new ArrayList<>(), new ArrayList<>());
        Card card = new Card(1, "p", "o", "s", user, true);
        when(cardRepository.findCardById(1L)).thenReturn(card);
        when(cardRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        Card result = cardService.edit(editCardRequest, user);
        assertThat(result.getQuestion()).isEqualTo(editCardRequest.question);
    }
}
