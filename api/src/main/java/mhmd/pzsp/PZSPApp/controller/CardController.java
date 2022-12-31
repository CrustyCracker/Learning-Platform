package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.CardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static mhmd.pzsp.PZSPApp.security.SecurityHelper.getCurrentUser;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cards")
public class CardController {
    private final ICardService cardService;
    private final IGroupService groupService;

    @Autowired
    public CardController(ICardService cardService, IGroupService groupService) {
        this.cardService = cardService;
        this.groupService = groupService;
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
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");

        var cards = cardService.findPublicOrUsers(user.getId());
        cards.forEach(card -> simpleCards.add(new CardResponse(card)));
        return simpleCards;
    }

    @GetMapping("/owned")
    // zwraca karty danego użytkownika
    public List<CardResponse> owned() throws BackendException {
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");

        var simpleCards = new ArrayList<CardResponse>();
        var cards = cardService.findCardsByUser(user.getId());
        cards.forEach(card -> simpleCards.add(new CardResponse(card)));
        return simpleCards;
    }

    @PostMapping("/create")
    public CardResponse create(@RequestBody NewCardRequest request) throws BackendException {
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");
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
    public List<CardResponse> cardsByGroupId(@PathVariable Long id) throws BackendException {
        var groupCards = new ArrayList<CardResponse>();
        groupService.findGroupById(id);
        var cards = cardService.findCardsByGroupsId(id);
        cards.forEach(card -> groupCards.add(new CardResponse(card)));
        return groupCards;
    }

    @GetMapping("delete/{id}")
    public boolean delete(@PathVariable Long id) throws BackendException {
        return cardService.delete(id);
    }
}
