package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.CardSimple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cards")
public class CardController {
    private final ICardService cardService;

    @Autowired
    public CardController(ICardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/first")
    public CardSimple first() {
        var cards = cardService.findAllCards();
        return new CardSimple(cards.get(0));
    }

    @GetMapping("/forUser/{id}")
    public List<CardSimple> forUser(@PathVariable Long id){
        var simpleCards = new ArrayList<CardSimple>();
        var cards = cardService.findCardsByUser(id);
        cards.forEach(card -> simpleCards.add(new CardSimple(card)));
        return simpleCards;
    }
}
