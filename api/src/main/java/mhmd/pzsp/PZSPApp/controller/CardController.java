package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.CardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cards")
public class CardController {
    private final ICardService cardService;
    private final IAccountService accountService;

    @Autowired
    public CardController(ICardService cardService, IAccountService accountService) {
        this.cardService = cardService;
        this.accountService = accountService;
    }

    @GetMapping("/first")
    public CardResponse first() throws BackendException {
        var cards = cardService.findAllCards();
        if (cards.isEmpty())
            throw new BackendException("Brak kart w bazie danych");
        return new CardResponse(cards.get(0));
    }

    @GetMapping("/all")
    // zwraca karty publiczne lub prywatne zalogowanego użytkownika
    public List<CardResponse> all() throws BackendException {
        var simpleCards = new ArrayList<CardResponse>();
        var user = accountService.defaultAdmin();
        var cards = cardService.findPublicOrUsers(user.getId());
        // pzsp2 zhardocowane pobieranie kart pierwszego admina, bo dodawanie też jest zhardocowane dla niego
        cards.forEach(card -> simpleCards.add(new CardResponse(card)));
        return simpleCards;
    }

    @GetMapping("/forUser/{id}")
    // zwraca karty danego użytkownika
    public List<CardResponse> forUser(@PathVariable Long id){
        // pzsp2 tu powinno być sprawdzenie czy id się zgadza z zalogowanym userem
        var simpleCards = new ArrayList<CardResponse>();
        var cards = cardService.findCardsByUser(id);
        cards.forEach(card -> simpleCards.add(new CardResponse(card)));
        return simpleCards;
    }

    @PostMapping("/create")
    public CardResponse create(@RequestBody NewCardRequest request) throws BackendException {
        // pzsp2 tu się powinno brać obecnie zalogowanego usera z security contextu, a nie pierwszego admina
        var user = accountService.defaultAdmin();
        return new CardResponse(cardService.create(request, user));
    }

    @GetMapping("{id}")
    public CardResponse cardById(@PathVariable Long id) throws BackendException {
        var card = cardService.findCardById(id);
        if (card == null)
            throw new BackendException("Brak karty o danym id w bazie danych");
        return new CardResponse(card);
    }

    @GetMapping("group/{id}")
    public List<CardResponse> cardsByGroupId(@PathVariable Long id) {
        // pzsp2 dodać sprawdzenie czy grupa publiczna. Jeśli nie, to sprawdzanie czy user zgadza się z zalogowanym
        var groupCards = new ArrayList<CardResponse>();
        var cards = cardService.findCardsByGroupsId(id);
        cards.forEach(card -> groupCards.add(new CardResponse(card)));
        return groupCards;
    }

    @GetMapping("delete/{id}")
    public boolean delete(@PathVariable Long id) throws BackendException {
        return cardService.delete(id);
    }
}
