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

    @GetMapping("/forUser/{id}")
    public List<CardResponse> forUser(@PathVariable Long id){
        var simpleCards = new ArrayList<CardResponse>();
        var cards = cardService.findCardsByUser(id);
        cards.forEach(card -> simpleCards.add(new CardResponse(card)));
        return simpleCards;
    }

    @PostMapping("/create")
    public CardResponse create(@RequestBody NewCardRequest request) throws BackendException {
        // tu się powinno brać obecnie zalogowanego usera z security contextu, a nie pierwszego admina
        var user = accountService.defaultAdmin();
        return new CardResponse(cardService.create(request, user));
    }
}
